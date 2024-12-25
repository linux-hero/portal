import {createRoot} from "react-dom/client";

function bootstrap() {
    const root = document.getElementById('root');
    if (!root)
        throw new Error("Root element not Found!");

    createRoot(root).render(<h1>Hello World!</h1>);
}

bootstrap()