const statusColors = {
  success: "#42BF65",
  warning: "#3DB0F1",
  error: "#ED4444",
  info: "#EB9A21",
} as const;

export const colors = {
  primary: "#00FEFB",
  secondary: "#1786F9",
  backgroundPrimary: "#393E46",
  backgroundSecondary: "#222831",

  black: "#000000",
  white: "#FFFFFF",
  p1_30: "#B3C0CA",
  p1_50: "#8096A7",
  p1_75: "#41627B",
  p1: "#022D4F",
  p2: "#7EC242",
  p3: "#6D6E70",
  p4: "#EC6767",
  b1: "#1C4A6D",
  b2: "#AEBAC5",
  b3: "#ABABAB",
  bg1: "#AEBACF",
  bg2: "linear-gradient(173.02deg, #00FEFB 0%, #1786F9 100%)",
  bg3: "#022d4f4d",
  g1: "#B3C0CA",
  g2: "#022D4F",
  statusColors,
} as const;

export const boxShadow = {
  card: "4px 4px 8px 0px rgba(0, 0, 0, 0.25)",
  cardLogin: "4px 4px 12px 0px rgba(0, 0, 0, 0.25)",
  button: "1px 1px 8px 0px rgba(0, 0, 0, 0.25)",
} as const;
