import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { Input } from "./ui/input.jsx";
import { Card, CardContent } from "./ui/card.jsx";

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
    const res = await fetch("https://swo.app.n8n.cloud/webhook/generate-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const text = await res.text();
    const blocks = text.split(/Post \d:/).filter(b => b.trim());
    setAntworten(blocks.map(b => b.trim()));
    setStep("result");
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#EBF5DC", color: "#003E2E", fontFamily: "'Manrope', 'Helvetica Neue', sans-serif" }}>
      <h1 className="text-4xl font-bold text-center mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>Elsechs-Posting</h1>

      {step === "form" && (
        <div className="max-w-xl mx-auto grid gap-4">
          <Input
            placeholder="Thema (max. 300 Zeichen)"
            maxLength={300}
            value={form.thema}
            onChange={(e) => setForm({ ...form, thema: e.target.value })}
          />
          <Input
            placeholder="Anlass (max. 300 Zeichen)"
            maxLength={300}
            value={form.anlass}
            onChange={(e) => setForm({ ...form, anlass: e.target.value })}
          />
          <Textarea
            placeholder="Weitere Informationen (max. 3000 Zeichen)"
            maxLength={3000}
            rows={6}
            value={form.weitereInformationen}
            onChange={(e) => setForm({ ...form, weitereInformationen: e.target.value })}
          />
          
<select
  value={form.plattform}
  onChange={(e) => setForm({ ...form, plattform: e.target.value })}
  className="border rounded p-2 w-full"
>
  <option value="">Plattform wählen</option>
  <option value="X">X</option>
  <option value="Threads">Threads</option>
  <option value="Bluesky">Bluesky</option>
  <option value="LinkedIn">LinkedIn</option>
  <option value="Instagram">Instagram</option>
</select>

          <Button className="bg-[#69B63F] hover:bg-[#1F8743] text-white" onClick={handleSubmit}>
            Abschicken
          </Button>
        </div>
      )}

      {step === "loading" && <p className="text-center text-xl">Bitte warten…</p>}

      {step === "result" && (
        <div className="max-w-3xl mx-auto grid gap-6">
          {antworten.map((antwort, i) => (
            <Card key={i} className="bg-white text-[#003E2E]">
              <CardContent className="p-4 space-y-2">
                <p>{antwort}</p>
                <p className="text-right text-sm text-gray-500">({antwort.length} Zeichen)</p>
                <Button variant="outline" className="border-[#69B63F] text-[#003E2E] hover:bg-[#EBF5DC]">
                  Ich bevorzuge diese Version
                </Button>
              </CardContent>
            </Card>
          ))}
          <div className="flex gap-4 justify-between">
            <Button variant="outline" className="text-[#003E2E] border-[#1F8743]" onClick={() => setStep("form")}>Zurück</Button>
            <Button className="bg-[#1F8743] hover:bg-[#69B63F] text-white" onClick={handleSubmit}>Neu generieren</Button>
          </div>
        </div>
      )}
    </div>
  );
}
