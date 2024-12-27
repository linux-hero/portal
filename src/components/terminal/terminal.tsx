import {useEffect, useState} from "react";
import { Terminal as XTermTerminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import {defaultHandler, TerminalOnKeyHandler, TerminalOnKeyHandlerParams} from "./handlers";

export default function Terminal() {
    const [terminal] = useState(new XTermTerminal());
    const [input, setInput] = useState('');

    function openTerminal() {
        terminal.open(document.getElementById("terminal")!)
    }

    function setupTerminal() {
        const handlers: Record<string, TerminalOnKeyHandler> = {
            'default': defaultHandler,
        }

        terminal.onKey(({key}) => {
            const params: TerminalOnKeyHandlerParams = {
                terminal, key, input, setInput
            }

            handlers[key]
                ? handlers[key](params)
                : handlers['default'](params);
        })
    }

    useEffect(() => {
        openTerminal();
        setupTerminal();
    }, []);

    return <div id="terminal" data-testid="terminal"></div>
}