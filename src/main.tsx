import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductProvider } from "./contexts/ProductContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ProductProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ProductProvider>
);
