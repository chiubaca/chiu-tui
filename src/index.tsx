import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { useState, useEffect } from "react";
import { useKeyboard, useTimeline } from "@opentui/react";
import { spawn } from "bun";

const links = [
  { label: "bluesky", url: "https://bsky.app/placeholder" },
  { label: "x", url: "https://x.com/placeholder" },
  { label: "linkedin", url: "https://linkedin.com/in/placeholder" },
  { label: "website", url: "https://chiubaca.com" },
];

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [spinIndex, setSpinIndex] = useState(0);

  useKeyboard((key) => {
    switch (key.name) {
      case "left":
      case "h":
        setSelectedIndex((i) => (i > 0 ? i - 1 : links.length - 1));
        break;
      case "right":
      case "l":
        setSelectedIndex((i) => (i < links.length - 1 ? i + 1 : 0));
        break;
      case "enter":
        console.log("Opening:", links[selectedIndex].url);
        break;
    }
  });

  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box
        flexDirection="column"
        alignItems="center"
        border
        padding={1}
        borderStyle="rounded"
      >
        <ascii-font font="tiny" text="chiubaca" />
        <text attributes={TextAttributes.DIM}>fullstack developer</text>
        <box padding={1}>
          <text attributes={TextAttributes.ITALIC}>
            dreaming - building - learning
          </text>
        </box>
        <box flexDirection="row" gap={1} padding={1}>
          <text attributes={TextAttributes.BOLD}>
            {links.map((link, i) => (
              <span key={link.label}>
                {i === selectedIndex ? (
                  <span bg="#ffffff" fg="#342b2b">
                    {link.label}
                  </span>
                ) : (
                  <a href={link.url}>{link.label}</a>
                )}
                {i < links.length - 1 && " "}
              </span>
            ))}
          </text>
        </box>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
