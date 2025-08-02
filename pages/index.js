import React, { useState } from "react";

function Home() {
        const styles = {
        wrapper: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1e1e2f",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            padding: "24px",
        },
        card: {
            width: "100%",
            maxWidth: 420,
            background: "#2c2c3e",
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            padding: 20,
            textAlign: "center",
            color: "#e0e0e0",
        },
        title: { fontSize: 24, margin: "8px 0 4px" },
        subtitle: { color: "#aaa", fontSize: 14, marginBottom: 16 },
        riddle: { fontSize: 18, lineHeight: 1.4, margin: "16px 0", color: "#fff" },
        inputRow: {
            display: "flex",
            gap: 8,
            marginTop: 12,
        },
        input: {
            flex: 1,
            padding: "12px 14px",
            border: "1px solid #444",
            background: "#1a1a2b",
            color: "#fff",
            borderRadius: 10,
            fontSize: 16,
            outline: "none",
        },
        btn: {
            padding: "12px 14px",
            borderRadius: 10,
            border: "none",
            fontSize: 14,
            cursor: "pointer",
            background: "#6c5ce7",
            color: "#fff",
        },
        hintBtn: {
            marginTop: 10,
            background: "#2d2d44",
            color: "#74b9ff",
            border: "1px solid #3e3e60",
            padding: "10px 12px",
            borderRadius: 10,
            fontSize: 14,
            cursor: "pointer",
        },
        msg: { marginTop: 14, fontSize: 15 },
        ok: { color: "#00b894" },
        error: { color: "#ff7675" },
        answer: {
            marginTop: 8,
            fontSize: 14,
            color: "#dfe6e9",
            background: "#353550",
            padding: "8px 10px",
            borderRadius: 8,
            display: "inline-block",
            border: "1px solid #5f5faf",
        },
        tiny: { fontSize: 12, color: "#999", marginTop: 10 },
        };


  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState(null); // "ok" | "err" | null
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const correct = ["buraco"];

  function normalize(s) {
    return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();
  }

  function check() {
    const g = normalize(guess);
    const isOk = correct.some((a) => normalize(a) === g);
    setStatus(isOk ? "ok" : "err");
    if (isOk) setRevealed(true);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={{ fontSize: 32 }}>❓❓❓❓</div>
        <h1 style={styles.title}>Oi você!</h1>
        <p style={styles.subtitle}>Uma charadinha rápida para iluminar o dia ✨</p>

        <p style={styles.riddle}>
          <strong>Charada:</strong> Quanto mais se tira, maior fica. O que é?
        </p>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="text"
            placeholder="Digite sua resposta"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            autoComplete="off"
          />
          <button style={styles.btn} onClick={check}>Conferir</button>
        </div>

        <button style={styles.hintBtn} onClick={() => setShowHint((v) => !v)}>
          {showHint ? "Esconder dica" : "Quero uma dica"}
        </button>

        {showHint && <div style={styles.answer}>Dica: você encontra no chão, em paredes…</div>}

        {status === "ok" && (
          <div style={{ ...styles.msg, ...styles.ok }}>
            Acertou! 🎉 Resposta: <strong>buraco</strong> <span>❤</span>
          </div>
        )}
        {status === "err" && <div style={{ ...styles.msg, ...styles.error }}>Quase! Tenta de novo 😉</div>}

        {revealed && (
          <p style={styles.tiny}>
            Obrigado por brincar! Você tornou este momento maior — igual à resposta. 🙂
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
