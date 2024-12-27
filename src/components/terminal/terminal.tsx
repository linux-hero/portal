import {useEffect, useState} from "react";
import {IDisposable, Terminal as XTermTerminal} from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import {
    promptHandler,
    runHandlers,
    TerminalOnKeyHandlerParams
} from "./handlers";

export default function Terminal() {
    const [terminal] = useState(new XTermTerminal());
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [onKey, setOnKey] = useState<IDisposable | null>(null);

    function openTerminal() {
        setOpen(true);
        terminal.open(document.getElementById("terminal")!)
        runHandlers({ terminal, key: "", input: "" }, [promptHandler]);
    }

    function setupTerminal() {
        if (onKey) {
            onKey.dispose();
            setOnKey(null);
        }

        setOnKey(terminal.onKey(({key}) => {
            setInput((prevInput) => {
                const params: TerminalOnKeyHandlerParams = {
                    terminal, key, input: prevInput,
                }

                return runHandlers(params);
            })
        }));
    }

    useEffect(() => {
        if (!open) {
            openTerminal();
        }
        setupTerminal();
    }, [input]);

    return <div id="terminal" data-testid="terminal"></div>
}