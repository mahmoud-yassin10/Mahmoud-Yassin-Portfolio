import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Check, Play, RotateCcw, Send, Terminal, TimerReset } from "lucide-react";

const PYODIDE_VERSION = "0.26.2";
const DEFAULT_CODE = "";

type PythonWorkspaceProps = {
  assignmentTitle?: string;
  initialCode?: string;
  onSubmit?: (code: string, output: string) => Promise<void>;
};

type RunnerResult = { ok: boolean; output?: string; error?: string };

function createRunnerWorker() {
  const source = `
    let pyodide;
    self.onmessage = async (event) => {
      const { code } = event.data;
      try {
        if (!pyodide) {
          const runtime = await import("https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.mjs");
          pyodide = await runtime.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/" });
        }
        const output = [];
        pyodide.setStdout({ batched: (value) => output.push(value) });
        pyodide.setStderr({ batched: (value) => output.push(value) });
        await pyodide.runPythonAsync(code);
        self.postMessage({ ok: true, output: output.join("\\n") });
      } catch (error) {
        self.postMessage({ ok: false, error: String(error?.message || error) });
      }
    };
  `;
  return new Worker(URL.createObjectURL(new Blob([source], { type: "text/javascript" })));
}

const PythonWorkspace = ({ assignmentTitle = "Python practice", initialCode = DEFAULT_CODE, onSubmit }: PythonWorkspaceProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("Run your code to see the output here.");
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => () => {
    workerRef.current?.terminate();
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  const runCode = () => {
    workerRef.current?.terminate();
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    const worker = createRunnerWorker();
    workerRef.current = worker;
    setRunning(true);
    setSubmitted(false);
    setOutput("Starting Python runtime…");
    worker.onmessage = (event: MessageEvent<RunnerResult>) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setRunning(false);
      if (event.data.ok) setOutput(event.data.output?.trim() || "Program finished without printed output.");
      else setOutput(event.data.error || "The program could not run.");
      worker.terminate();
      workerRef.current = null;
    };
    worker.onerror = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setRunning(false);
      setOutput("The Python runtime could not load. Check your connection and try again.");
      worker.terminate();
      workerRef.current = null;
      timeoutRef.current = null;
    };
    worker.postMessage({ code });
    timeoutRef.current = window.setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      setRunning(false);
      setOutput("Execution stopped after 5 seconds. Check for an infinite loop.");
    }, 5000);
  };

  const resetCode = () => {
    setCode("");
    setOutput("Workspace reset. Write your code and run it when you are ready.");
    setSubmitted(false);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!onSubmit) return;
    await onSubmit(code, output);
    setSubmitted(true);
  };

  const handleEditorKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const editor = event.currentTarget;
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = code.slice(start, end);
    const pairs: Record<string, string> = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" };
    if (event.key === "Tab") {
      event.preventDefault();
      const indent = "    ";
      if (event.shiftKey && start === end && code.slice(Math.max(0, start - indent.length), start) === indent) {
        const next = code.slice(0, start - indent.length) + code.slice(start);
        setCode(next); requestAnimationFrame(() => { editor.selectionStart = editor.selectionEnd = start - indent.length; });
      } else if (event.shiftKey) {
        const lineStart = code.lastIndexOf("\n", start - 1) + 1;
        if (code.slice(lineStart, start).startsWith(indent)) { const next = code.slice(0, lineStart) + code.slice(lineStart + indent.length); setCode(next); requestAnimationFrame(() => { editor.selectionStart = editor.selectionEnd = Math.max(lineStart, start - indent.length); }); }
      } else { const next = code.slice(0, start) + indent + code.slice(end); setCode(next); requestAnimationFrame(() => { editor.selectionStart = editor.selectionEnd = start + indent.length; }); }
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const lineStart = code.lastIndexOf("\n", start - 1) + 1;
      const indentation = code.slice(lineStart, start).match(/^\s*/)?.[0] ?? "";
      const extraIndent = /:\s*(#.*)?$/.test(code.slice(lineStart, start)) ? "    " : "";
      const next = code.slice(0, start) + "\n" + indentation + extraIndent + code.slice(end);
      setCode(next); requestAnimationFrame(() => { const cursor = start + 1 + indentation.length + extraIndent.length; editor.selectionStart = editor.selectionEnd = cursor; });
      return;
    }
    if (pairs[event.key]) {
      event.preventDefault();
      const closing = pairs[event.key];
      const next = code.slice(0, start) + event.key + (selected || closing) + code.slice(end);
      setCode(next); requestAnimationFrame(() => { editor.selectionStart = start + 1; editor.selectionEnd = selected ? start + 1 + selected.length : start + 1; });
      return;
    }
    if ((event.key === ")" || event.key === "]" || event.key === "}") && start === end && code[start] === event.key) { event.preventDefault(); requestAnimationFrame(() => { editor.selectionStart = editor.selectionEnd = start + 1; }); }
  };

  return (
    <section className="hub-workspace" aria-label={`${assignmentTitle} Python workspace`}>
      <div className="hub-workspace-head">
        <div><span className="hub-eyebrow">Workspace</span><h2>{assignmentTitle}</h2></div>
        <span className="hub-runtime-badge"><span /> Python {PYODIDE_VERSION}</span>
      </div>
      <div className="hub-ide-grid">
        <div className="hub-editor-panel">
          <div className="hub-editor-toolbar"><span className="hub-file-tab">main.py</span><span className="hub-editor-meta">Standard library</span></div>
          <textarea
            ref={editorRef}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={handleEditorKeyDown}
            placeholder="# Start writing Python here..."
            spellCheck={false}
            aria-label="Python code editor"
            className="hub-code-editor"
          />
        </div>
        <div className="hub-console-panel">
          <div className="hub-console-head"><span><Terminal size={14} /> Console</span><span>{running ? "Running" : "Ready"}</span></div>
          <pre className={running ? "hub-console-output hub-console-running" : "hub-console-output"}>{output}</pre>
        </div>
      </div>
      <div className="hub-workspace-actions">
        <button type="button" className="hub-button hub-button-primary" onClick={runCode} disabled={running}><Play size={15} />{running ? "Running…" : "Run code"}</button>
        <button type="button" className="hub-button hub-button-quiet" onClick={resetCode} disabled={running}><RotateCcw size={15} />Reset</button>
        <button type="button" className="hub-button hub-button-quiet" onClick={() => { setOutput("Ready for another run."); setSubmitted(false); }} disabled={running}><TimerReset size={15} />Clear output</button>
        {onSubmit ? <form onSubmit={submit} className="hub-submit-form"><button type="submit" className="hub-button hub-button-submit" disabled={running || submitted}><Send size={15} />{submitted ? "Submitted" : "Submit homework"}</button>{submitted && <span className="hub-submit-confirm"><Check size={14} /> Saved for review</span>}</form> : null}
      </div>
    </section>
  );
};

export default PythonWorkspace;
