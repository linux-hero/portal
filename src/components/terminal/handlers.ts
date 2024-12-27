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

export const newLineHandler: TerminalOnKeyHandler = ({ terminal, input }) => {
    terminal.write('\r\n');
    return input;
}

export const promptHandler: TerminalOnKeyHandler = ({ terminal }) => {
    terminal.write("$ ");
    return "";
}

export const commandHandler: TerminalOnKeyHandler = ({ input }) => {
    console.log('command: ' + input);
    return "";
}

export const defaultHandlers: Record<string, TerminalOnKeyHandler[]> = {
    '\x7f': [deleteHandler],
    '\x0d': [commandHandler, newLineHandler, promptHandler],
    'default': [defaultHandler],
}

export function runHandlers(params: TerminalOnKeyHandlerParams, handlers?: TerminalOnKeyHandler[]) {
    let input = params.input;
    if (handlers)
        for (const handler of handlers)
            input = handler(params);
    else
        input = defaultHandlers[params.key]
            ? runHandlers(params, defaultHandlers[params.key])
            : runHandlers(params, defaultHandlers['default']);

    return input;
}