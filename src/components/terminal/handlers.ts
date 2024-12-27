import {Terminal} from "@xterm/xterm";

export interface TerminalOnKeyHandlerParams {
    terminal: Terminal;
    key: string;
    input: string;
}

export type TerminalOnKeyHandler = (params: TerminalOnKeyHandlerParams) => string;

export const defaultHandler: TerminalOnKeyHandler = ({ terminal, key, input }) => {
    terminal.write(key);
    return input + key;
};

export const deleteHandler: TerminalOnKeyHandler = ({ terminal, input }) => {
    terminal.write('\b \b');
    return input.slice(0, -1);
}