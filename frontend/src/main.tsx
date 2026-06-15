import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"  // 🔥 Só UM aqui

import "./index.css"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>   {/* 🔥 Apenas um BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
)