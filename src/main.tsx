import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/fonts.css";
import "./styles/portfolio.css";
import "./styles/glass.css";
import "./styles/services.css";

createRoot(document.getElementById("root")!).render(<App />);
