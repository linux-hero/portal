import {useEffect, useState} from "react";
import {Terminal as XTermTerminal} from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import {
    runHandlers,
    TerminalOnKeyHandlerParams
} from "./handlers";
import * as CheerpX from '@leaningtech/cheerpx';

export default function Terminal() {
    const [terminal] = useState(new XTermTerminal({ convertEol: true }));
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    function openTerminal() {
        setOpen(true);
        terminal.open(document.getElementById("terminal")!)
    }

    async function setupEngine() {
        const cloudDevice:CheerpX.CloudDevice = await CheerpX.CloudDevice.create("wss://disks.webvm.io/debian_large_20230522_5044875331.ext2");
        const idbDevice:CheerpX.IDBDevice = await CheerpX.IDBDevice.create("block1");
        const overlayDevice:CheerpX.OverlayDevice = await CheerpX.OverlayDevice.create(cloudDevice, idbDevice);
        const cx:CheerpX.Linux = await CheerpX.Linux.create({mounts:[{ type: "ext2", path: "/", dev: overlayDevice }]});

        const sender = cx.setCustomConsole(
            (buf) => terminal.write(new Uint8Array(buf)),
            terminal.cols,
            terminal.rows
        );
        terminal.onKey(({ key }) => {
            setInput((prevInput) => {
                const params: TerminalOnKeyHandlerParams = {
                    terminal, key, input: prevInput, sender
                }

                return runHandlers(params);
            });
        });

        await cx.run("/bin/bash", ["--login"], {
            env: [
                "HOME=/home/user",
                "USER=user",
                "SHELL=/bin/bash",
                "EDITOR=vim",
                "LANG=en_US.UTF-8",
                "LC_ALL=C",
            ],
            cwd: "/home/user",
            uid: 1000,
            gid: 1000,
        });
    }

    useEffect(() => {
        if (!open) {
            openTerminal();
            setupEngine()
                .then(() => console.log("Unix engine successfully setup."))
                .catch((err) => { throw new Error("Unable to setup unix engine. " + err)});
        }
    }, []);

    return <div id="terminal" data-testid="terminal"></div>
}