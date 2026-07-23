import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Play, RotateCcw, Send, Terminal, TimerReset } from "lucide-react";

const PYODIDE_VERSION = "0.26.2";
const DEFAULT_CODE = `def greet(name):
    return f"Hello, {name}!"


print(greet("learner"))`;

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
    setCode(initialCode);
    setOutput("Run your code to see the output here.");
    setSubmitted(false);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!onSubmit) return;
    await onSubmit(code, output);
    setSubmitted(true);
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
            value={code}
            onChange={(event) => setCode(event.target.value)}
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
