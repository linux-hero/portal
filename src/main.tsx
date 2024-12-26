import {createRoot} from "react-dom/client";
import App from "./app";

function bootstrap() {
    const root = document.getElementById('root');
    if (!root)
        throw new Error("Root element not Found!");

    createRoot(root).render(<App />)
}

bootstrap()