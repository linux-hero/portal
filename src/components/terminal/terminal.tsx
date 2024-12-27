import {useEffect, useState} from "react";
import {IDisposable, Terminal as XTermTerminal} from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import {defaultHandler, deleteHandler, TerminalOnKeyHandler, TerminalOnKeyHandlerParams} from "./handlers";

export default function Terminal() {
    const [terminal] = useState(new XTermTerminal());
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [onKey, setOnKey] = useState<IDisposable | null>(null);

    function openTerminal() {
        setOpen(true);
        terminal.open(document.getElementById("terminal")!)
    }

    function setupTerminal() {
        if (onKey) {
            onKey.dispose();
            setOnKey(null);
        }

        const handlers: Record<string, TerminalOnKeyHandler> = {
            '\x7f': deleteHandler,
            'default': defaultHandler,
        }

        setOnKey(terminal.onKey(({key}) => {
            setInput((prevInput) => {
                const params: TerminalOnKeyHandlerParams = {
                    terminal, key, input: prevInput,
                }

                const newInput = handlers[key]
                    ? handlers[key](params)
                    : handlers['default'](params);

                console.log(newInput);
                return(newInput);
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