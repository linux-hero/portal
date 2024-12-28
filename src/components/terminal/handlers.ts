import {Terminal} from "@xterm/xterm";

export interface TerminalOnKeyHandlerParams {
    terminal: Terminal;
    key: string;
    input: string;
    sender: EventListener;
}

export type TerminalOnKeyHandler = (params: TerminalOnKeyHandlerParams) => string;

export const defaultHandler: TerminalOnKeyHandler = ({ key, input, sender }) => {
    sender(key.charCodeAt(0) as any);
    return input + key;
};

export const commandHandler: TerminalOnKeyHandler = ({ input }) => {
    console.log('command: ' + input);
    return input;
}

export const clearHandler: TerminalOnKeyHandler = () => {
    return "";
}

export const defaultHandlers: Record<string, TerminalOnKeyHandler[]> = {
    '\x0d': [commandHandler, defaultHandler, clearHandler],
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