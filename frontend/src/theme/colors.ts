const statusColors = {
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336",
  info: "#03A9F4",
} as const;

export const colors = {
  primary: "#00B8D4",
  secondary: "#2196F3",
  backgroundPrimary: "#424242",
  backgroundSecondary: "#212121",
  black: "#000000",
  white: "#FFFFFF",
  p1_30: "#BCC0C9",
  p1_50: "#7F9AB2",
  p1_75: "#2C3E50",
  p1: "#003366",
  p2: "#A2C639",
  p3: "#7F8C8D",
  p4: "#F54242",
  b1: "#1A3D6A",
  b2: "#B0BCC2",
  b3: "#BEBEBE",
  bg1: "#BCC6D4",
  bg2: "linear-gradient(173.02deg, #00B8D4 0%, #2196F3 100%)",
  bg3: "#003366",
  g1: "#BCC0C9",
  g2: "#003366",
  statusColors,
} as const;

export const boxShadow = {
  card: "4px 4px 10px rgba(0, 0, 0, 0.2)",
  cardLogin: "4px 4px 15px rgba(0, 0, 0, 0.2)",
  button: "1px 1px 6px rgba(0, 0, 0, 0.2)",
} as const;
