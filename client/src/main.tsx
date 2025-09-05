// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { NotificationProvider} from "./components/Notifications/NotificationContext.tsx"; 

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <NotificationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotificationProvider>
  // </StrictMode>
);
