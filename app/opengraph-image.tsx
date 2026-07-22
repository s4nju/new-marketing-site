import { ImageResponse } from "next/og";

export const alt = "biu — learn anything and remember forever";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(135deg, #8a3b43 0%, #d98872 45%, #faf2df 100%)",
        color: "#2c2722",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.04em",
        padding: "80px",
        textAlign: "center",
        width: "100%",
      }}
    >
      <div style={{ fontSize: 76, fontWeight: 700, marginBottom: 34 }}>biu</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 62,
          fontWeight: 600,
          lineHeight: 1.05,
        }}
      >
        <span>learn anything.</span>
        <span>remember forever.</span>
      </div>
      <div style={{ fontSize: 28, marginTop: 36 }}>
        summaries, flashcards, and spaced repetition
      </div>
    </div>,
    size,
  );
}
