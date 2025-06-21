import { useState } from "react";

export default function BMLEHPostGenerator() {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({
    thema: "",
    plattform: "",
    anlass: "",
    weitereInformationen: ""
  });
  const [antworten, setAntworten] = useState([]);

   async function handleSubmit() {
    setStep("loading");
    try {
      const res = await fetch("https://swo.app.n8n.cloud/webhook/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await res.json();
      let output = result.output || "";
      if (typeof output !== "string") output = JSON.stringify(output);

      // Entferne "Post X:" Prefixe und Zeichenangaben in Klammern am Ende
      const cleaned = output
        .split(/\n?\nPost \d:/) // trennt bei "Post 1:", "Post 2:", etc.
        .map(p => p.trim().replace(/\(?\d+\s*Zeichen\)?\.?$/gi, '').trim()) // entfernt Zeichenangabe in Klammern am Ende
        .filter(p => p);

      setAntworten(cleaned);
      setStep("result");
    } catch (err) {
      console.error("Fehler beim Laden:", err);
      setStep("form");
    }
  }


  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#EBF5DC", color: "#003E2E", fontFamily: "'Manrope', sans-serif" }}>
      <h1 className="text-4xl font-bold text-center mb-8">Elsechs-Posting</h1>

      {step === "form" && (
        <div className="max-w-xl mx-auto grid gap-4">
          <input
            placeholder="Thema (max. 300 Zeichen)"
            maxLength={300}
            value={form.thema}
            onChange={(e) => setForm({ ...form, thema: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Anlass (max. 300 Zeichen)"
            maxLength={300}
            value={form.anlass}
            onChange={(e) => setForm({ ...form, anlass: e.target.value })}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Weitere Informationen (max. 3000 Zeichen)"
            maxLength={3000}
            rows={6}
            value={form.weitereInformationen}
            onChange={(e) => setForm({ ...form, weitereInformationen: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={form.plattform}
            onChange={(e) => setForm({ ...form, plattform: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">Plattform wählen</option>
            {["X", "Threads", "Bluesky", "LinkedIn", "Instagram"].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <button className="bg-[#69B63F] hover:bg-[#1F8743] text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Abschicken
          </button>
        </div>
      )}

      {step === "loading" && <p className="text-center text-xl">Bitte warten…</p>}

      {step === "result" && (
        <div className="max-w-3xl mx-auto grid gap-6">
          {antworten.map((antwort, i) => (
            <div key={i} className="bg-white text-[#003E2E] rounded shadow p-4 space-y-2">
              <p>{antwort}</p>
              <p className="text-right text-sm text-gray-500">({antwort.length} Zeichen)</p>
              <button className="border border-[#69B63F] text-[#003E2E] hover:bg-[#EBF5DC] px-4 py-1 rounded">
                Ich bevorzuge diese Version
              </button>
            </div>
          ))}
          <div className="flex gap-4 justify-between mt-4">
            <button className="border border-[#1F8743] text-[#003E2E] px-4 py-2 rounded" onClick={() => setStep("form")}>
              Zurück
            </button>
            <button className="bg-[#1F8743] hover:bg-[#69B63F] text-white px-4 py-2 rounded" onClick={handleSubmit}>
              Neu generieren
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
