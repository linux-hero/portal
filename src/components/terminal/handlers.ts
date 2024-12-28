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
    if (input.length) {
        terminal.write('\b \b');
        return input.slice(0, -1);
    }

    return input;
}

export const newLineHandler: TerminalOnKeyHandler = ({ terminal }) => {
    terminal.write('\r\n');
    return "";
}

export const tabHandler: TerminalOnKeyHandler = ({ terminal, input }) => {
    terminal.write("    ");
    return input + "    ";
}

export const promptHandler: TerminalOnKeyHandler = ({ terminal }) => {
    terminal.write("$ ");
    return "";
}

export const commandHandler: TerminalOnKeyHandler = ({ input }) => {
    console.log('command: ' + input);
    return input;
}

export const clearHandler: TerminalOnKeyHandler = ({ terminal }) => {
    terminal.clear();
    return "";
}

export const defaultHandlers: Record<string, TerminalOnKeyHandler[]> = {
    '\x09': [tabHandler],
    '\x0c': [clearHandler],
    '\x0d': [commandHandler, newLineHandler, promptHandler],
    '\x7f': [deleteHandler],
    'default': [defaultHandler],
}

export function runHandlers(params: TerminalOnKeyHandlerParams, handlers?: TerminalOnKeyHandler[]) {
    if (!handlers)
        handlers = defaultHandlers[params.key]
            ? defaultHandlers[params.key]
            : defaultHandlers['default'];
    for (const handler of handlers)
        params.input = handler(params);

    return params.input;
}