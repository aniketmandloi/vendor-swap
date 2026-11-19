import { ImageResponse } from "next/og";

export const alt = "VendorSwap. Know which dental software you can safely cancel. For solo dental practices.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const background = "#f5f4eb";
const foreground = "#172821";
const forest = "#17382c";
const lime = "#dbef99";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background,
          color: foreground,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: forest, fontSize: 44, letterSpacing: -1.5 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: forest,
              color: lime,
              fontSize: 40,
            }}
          >
            ↔
          </div>
          VendorSwap
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.06, letterSpacing: -3 }}>
          <div style={{ display: "flex" }}>Know which dental software</div>
          <div style={{ display: "flex" }}>
            you can&nbsp;
            <span style={{ background: lime, padding: "0 10px", margin: "0 -10px" }}>safely cancel.</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 30, color: forest }}>For solo dental practices</div>
      </div>
    ),
    size,
  );
}
