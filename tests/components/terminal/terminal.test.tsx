import {describe, expect, test} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Terminal from "../../../src/components/terminal/terminal";

describe('terminal component', () => {
    test('should render terminal element', () => {
        render(<Terminal />);
        expect(screen.getByTestId("terminal")).toBeInTheDocument();
    });

    test('should display prompt when rendering', async () => {
       render(<Terminal />);
       await waitFor(() => {
           expect(screen.getByText("$")).toBeInTheDocument();
       });
    });

    test('should print all numeric characters properly', async () => {
       render(<Terminal />);
       await waitFor(() => {
           expect(screen.getByText("$")).toBeInTheDocument();
       });
       for (let i = 48; i <= 57; i++) {
           fireEvent.keyPress(
               screen.getByRole('textbox', { name: /terminal input/i }),
               { charCode: i }
           );

           await waitFor(() => {
               const regex = new RegExp(`${String.fromCharCode(i)}`, 'i');
               expect(screen.getByText(regex)).toBeInTheDocument();
           });
       }
    });

    test('should print all uppercase letter characters properly', async () => {
        render(<Terminal />);
        await waitFor(() => {
            expect(screen.getByText("$")).toBeInTheDocument();
        });
        for (let i = 65; i <= 90; i++) {
            fireEvent.keyPress(
                screen.getByRole('textbox', { name: /terminal input/i }),
                { charCode: i }
            );

            await waitFor(() => {
                const regex = new RegExp(`${String.fromCharCode(i)}`, 'i');
                expect(screen.getByText(regex)).toBeInTheDocument();
            });
        }
    });

    test('should print all lowercase letter characters properly', async () => {
        render(<Terminal />);
        await waitFor(() => {
            expect(screen.getByText("$")).toBeInTheDocument();
        });
        for (let i = 97; i <= 122; i++) {
            fireEvent.keyPress(
                screen.getByRole('textbox', { name: /terminal input/i }),
                { charCode: i }
            );

            await waitFor(() => {
                const regex = new RegExp(`${String.fromCharCode(i)}`, 'i');
                expect(screen.getByText(regex)).toBeInTheDocument();
            });
        }
    });

    test('should print all special characters properly', async () => {
        render(<Terminal />);
        await waitFor(() => {
            expect(screen.getByText("$")).toBeInTheDocument();
        });

        const ranges = [[33, 47], [58, 64], [91, 96], [123, 126]]
        for (const [start, end] of ranges) {
            for (let i = start; i <= end; i++) {
                fireEvent.keyPress(
                    screen.getByRole('textbox', { name: /terminal input/i }),
                    { charCode: i }
                );

                await waitFor(() => {
                    const regex = new RegExp(`\\${String.fromCharCode(i)}`, 'i');
                    expect(screen.getByText(regex)).toBeInTheDocument();
                });
            }
        }
    });

    test('should print space character properly', async () => {
        render(<Terminal />);
        await waitFor(() => {
            expect(screen.getByText("$")).toBeInTheDocument();
        });

        fireEvent.keyPress(
            screen.getByRole('textbox', { name: /terminal input/i }),
            { charCode: 32 }
        );

        await waitFor(() => {
            expect(screen.getByText("$").textContent).toBe("$  ");
        });
    });

    test('should handle backspace character properly', async () => {
        render(<Terminal />);
        await waitFor(() => {
            expect(screen.getByText(/\$/g)).toBeInTheDocument();
        });

        const characters = [97, 97, 127];
        for (const character of characters) {
            fireEvent.keyPress(
                screen.getByRole('textbox', { name: /terminal input/i }),
                { charCode: character }
            );
        }

        await waitFor(() => {
            expect(screen.getByText(/\$/g).textContent).toBe("$ a");
        });
    });
})