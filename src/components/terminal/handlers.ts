import {Terminal} from "@xterm/xterm";
import {Dispatch, SetStateAction} from "react";

export interface TerminalOnKeyHandlerParams {
    terminal: Terminal;
    key: string;
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
}

export type TerminalOnKeyHandler = (params: TerminalOnKeyHandlerParams) => void;

export const defaultHandler: TerminalOnKeyHandler = (params) => {
    const { key } = params;

    console.log(key);
}