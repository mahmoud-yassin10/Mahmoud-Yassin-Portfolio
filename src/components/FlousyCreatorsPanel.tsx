import { useCallback, useEffect, useState } from "react";
import { Check, Copy, Plus } from "lucide-react";
import {
  campaignLink,
  isCampaignCodeShape,
  loadCampaigns,
  saveCampaign,
  type CampaignCode,
} from "@/lib/flousyAnalytics";

/** Creator and campaign invite codes: add one, copy its link, see who joined through it. */
export default function FlousyCreatorsPanel({ live }: { live: boolean }) {
  const [rows, setRows] = useState<CampaignCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState("");
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState<"creator" | "campaign">("creator");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    if (!live) return;
    setLoading(true);
    try {
      setRows(await loadCampaigns());
    } catch {
      setNotice("Could not load codes. Check that the Firestore rules are deployed.");
    } finally {
      setLoading(false);
    }
  }, [live]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const normalized = code.trim().toUpperCase();
  const valid = isCampaignCodeShape(normalized) && label.trim().length > 0;

  const add = async () => {
    if (!valid || busy) return;
    setBusy(true);
    setNotice("");
    try {
      await saveCampaign({
        code: normalized,
        label,
        kind,
        active: true,
        isNew: !rows.some((row) => row.code === normalized),
      });
      setCode("");
      setLabel("");
      await refresh();
    } catch {
      setNotice("Could not save that code.");
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (row: CampaignCode) => {
    try {
      await saveCampaign({ ...row, active: !row.active, isNew: false });
      await refresh();
    } catch {
      setNotice("Could not update that code.");
    }
  };

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(campaignLink(value));
      setCopied(value);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setNotice("Copy was blocked by the browser.");
    }
  };

  return (
    <section className="dashboard-card">
      <div className="dashboard-card-head">
        <div>
          <div className="dashboard-eyebrow">Invite codes</div>
          <h2>Who joined through whom</h2>
        </div>
      </div>
      {!live && <p>Connect the live project to manage codes. This view is empty in preview.</p>}
      {notice && <div className="dashboard-notice">{notice}</div>}
      <div className="dashboard-feedback-tools" style={{ flexWrap: "wrap", gap: 8 }}>
        <div className="dashboard-search">
          <input
            placeholder="Code, e.g. MARIAM01"
            value={code}
            maxLength={8}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
        </div>
        <div className="dashboard-search">
          <input
            placeholder="Label, e.g. Mariam, hook 03"
            value={label}
            maxLength={60}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <select value={kind} onChange={(e) => setKind(e.target.value as "creator" | "campaign")}>
          <option value="creator">Creator</option>
          <option value="campaign">Campaign</option>
        </select>
        <button className="dashboard-secondary-button" disabled={!valid || busy || !live} onClick={() => void add()}>
          <Plus size={15} />
          Add code
        </button>
      </div>
      {code && !isCampaignCodeShape(normalized) && (
        <p style={{ opacity: 0.75, fontSize: 13 }}>
          A code is 8 letters or digits and must include at least one letter from G to Z.
        </p>
      )}
      <div className="dashboard-feedback-list">
        {rows.map((row) => (
          <article className="dashboard-feedback-item" key={row.code}>
            <div className="dashboard-feedback-item-top">
              <span className={`dashboard-feedback-tag ${row.kind === "creator" ? "idea" : "ux"}`}>
                {row.kind === "creator" ? "Creator" : "Campaign"}
              </span>
              <strong>{row.code}</strong>
            </div>
            <p>
              <strong>{row.label || "(no label)"}</strong> · {row.attached} joined · {row.activated} activated
              {row.attached ? ` (${Math.round((row.activated / row.attached) * 100)}%)` : ""}
            </p>
            <div className="dashboard-feedback-item-bottom">
              <span>{row.active ? "Active" : "Switched off"}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="dashboard-secondary-button" onClick={() => void copy(row.code)}>
                  {copied === row.code ? <Check size={14} /> : <Copy size={14} />}
                  {copied === row.code ? "Copied" : "Copy link"}
                </button>
                <button className="dashboard-secondary-button" onClick={() => void toggle(row)}>
                  {row.active ? "Switch off" : "Switch on"}
                </button>
              </div>
            </div>
          </article>
        ))}
        {!rows.length && !loading && (
          <div className="dashboard-empty">
            <strong>No codes yet.</strong>
            <span>Add one above, then share its link with the creator.</span>
          </div>
        )}
      </div>
    </section>
  );
}
