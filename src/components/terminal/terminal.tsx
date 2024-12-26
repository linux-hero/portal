import {useEffect} from "react";
import { Terminal as XTermTerminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

export default function Terminal() {
    const terminalId = "terminal";

    function openTerminal() {
        const terminal = new XTermTerminal();
        const terminalElement = document.getElementById(terminalId);
        if (!terminalElement)
            throw new Error("Unable to find terminal element!");

        terminal.open(terminalElement);
        return (terminal);
    }

    function writeToTerminal(terminal: XTermTerminal) {
        const transformationTable: Record<number, string> = {
            127: '\b \b',
        };

        terminal.onData((data) => {
            data = data
                .split('')
                .map(char => transformationTable[char.charCodeAt(0)] || char)
                .join();

            terminal.write(data);
        });
    }

    useEffect(() => {
        const terminal = openTerminal();
        writeToTerminal(terminal);
    }, []);

    return <div id={terminalId} data-testid={terminalId}></div>
}