#!/usr/bin/env bun
import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { useState } from "react";
import { useKeyboard } from "@opentui/react";
import { spawn } from "bun";

const COLORS = {
  primary: "#38bdf8",
  secondary: "#818cf8",
  muted: "#64748b",
  bg: "#0f172a",
  text: "#e2e8f0",
  accent: "#22d3ee",
};

const links = [
  { label: "linkedin", url: "https://www.linkedin.com/in/achiu1/", icon: "in" },
  {
    label: "bluesky",
    url: "https://bsky.app/profile/chiubaca.com",
    icon: "bsky",
  },
  { label: "x", url: "https://x.com/chiubaca", icon: "x" },
  { label: "website", url: "https://chiubaca.com/", icon: "globe" },
];

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      case "return":
        spawn(["open", links[selectedIndex].url]);
        break;
    }
  });

  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box
        flexDirection="column"
        alignItems="center"
        border
        paddingX={4}
        paddingY={2}
        borderStyle="rounded"
        borderColor={COLORS.primary}
      >
        <box paddingTop={1}>
          <ascii-font font="tiny" text="chiubaca" />
        </box>
        <text fg={COLORS.muted} attributes={TextAttributes.ITALIC}>
          Full Stack Developer
        </text>
        <box paddingY={1} alignItems="center">
          <text fg={COLORS.text}>Hey I'm Alex 👋</text>
          <text fg={COLORS.text}>
            I'm a software engineer based in London 🇬🇧
          </text>
        </box>

        <text fg={COLORS.text} attributes={TextAttributes.BOLD}>
          connect with me
        </text>
        <text fg={COLORS.muted}>────────────────────</text>
        <box flexDirection="row" gap={2} paddingY={1}>
          {links.map((link, i) => (
            <text key={link.label}>
              {i === selectedIndex ? (
                <span
                  bg={COLORS.primary}
                  fg={COLORS.bg}
                  attributes={TextAttributes.BOLD}
                >
                  {link.label}
                </span>
              ) : (
                <span fg={COLORS.muted}>{link.label}</span>
              )}
            </text>
          ))}
        </box>
        <text fg={COLORS.muted}>────────────────────</text>
        <text fg={COLORS.secondary} attributes={TextAttributes.DIM}>
          ← → to navigate · enter to open
        </text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
