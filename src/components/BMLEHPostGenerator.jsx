import { useState } from "react";

function BMLEHPostGenerator() {
  const [posts, setPosts] = useState([]);

  const generatePosts = async () => {
    try {
      const res = await fetch("/api/dein-endpunkt", { method: "POST", /* ... */ });
      // Versuche die Antwort als JSON zu parsen
      let data;
      try {
        data = await res.json();
      } catch (e) {
        // Fallback: falls die Antwort ein reiner Textstring ist
        const text = await res.text();
        data = JSON.parse(text);  // parse String zu Objekt:contentReference[oaicite:0]{index=0}
      }
      // Extrahiere nur den Inhalt des `output`-Feldes
      let outputText = data.output || data;
      if (typeof outputText !== "string") {
        outputText = JSON.stringify(outputText);
      }
      // Entferne eventuelle umschließende Anführungszeichen oder geschweifte Klammern
      outputText = outputText.trim().replace(/^\"|\"$/g, "").replace(/^\\{.+output\":\"/, "").replace(/\"}$/, "");
      // Teile den Inhalt in drei Vorschläge (getrennt durch Leerzeile)
      const suggestions = outputText.split("\n\n"):contentReference[oaicite:1]{index=1}.map(s => s.trim()).filter(s => s);
      setPosts(suggestions);
    } catch (error) {
      console.error("Fehler beim Generieren der Posts:", error);
      setPosts([]);
    }
  };

  return (
    <div>
      <button onClick={generatePosts} className="btn-primary">Beiträge generieren</button>
      {/* Drei Karten nebeneinander (responsive) */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((text, idx) => (
          <div key={idx} className="p-4 bg-white rounded shadow flex flex-col justify-between">
            {/* Beitragstext */}
            <p className="whitespace-pre-line">{text}</p>
            {/* Zeichenzahl im Footer der Karte */}
            <div className="mt-2 text-sm text-gray-600 text-right">
              {text.length} Zeichen
            </div>
            {/* Auswahl-Button */}
            <button className="mt-2 text-blue-600 hover:underline">
              Ich bevorzuge diese Version
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BMLEHPostGenerator;
