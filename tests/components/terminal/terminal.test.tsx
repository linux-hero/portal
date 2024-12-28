import {beforeAll, beforeEach, describe, expect, MockInstance, test, vi} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Terminal from "../../../src/components/terminal/terminal";

describe('terminal component', () => {
    beforeEach(async () => {
        render(<Terminal />);
        await waitFor(() => {
            screen.getByText("$");
        });
    });

    test('should render terminal element', () => {
        expect(screen.getByTestId("terminal")).toBeInTheDocument();
        expect(screen.getByText("$")).toBeInTheDocument();
    });

    describe('default handler', () => {
        test('should print all numeric characters properly', async () => {
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
            fireEvent.keyPress(
                screen.getByRole('textbox', { name: /terminal input/i }),
                { charCode: 32 }
            );

            await waitFor(() => {
                expect(screen.getByText("$").textContent).toBe("$  ");
            });
        });
    });

    describe('backspace handler', () => {
        test('should delete the last character', async () => {
            const characters = [97, 97, 127];
            for (const character of characters) {
                fireEvent.keyPress(
                    screen.getByRole('textbox', { name: /terminal input/i }),
                    { charCode: character }
                );
            }

            await waitFor(() => {
                expect(screen.getByText(/\$/i).textContent).toBe("$ a");
            });
        });

        test('should delete nothing when input is empty', async () => {
            fireEvent.keyPress(
                screen.getByRole('textbox', { name: /terminal input/i }),
                { charCode: 127 }
            );

            await waitFor(() => {
                expect(screen.getByText(/\$/i).textContent).toBe("$ ");
            });
        });
    })

    describe('carriage return handler', () => {
        let consoleSpy: MockInstance;
        beforeAll(() => {
           consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        });

        test('should print command to stdout', async () => {
           const characters = [97, 13];
           for (const character of characters) {
               fireEvent.keyPress(
                   screen.getByRole('textbox', { name: /terminal input/i }),
                   { charCode: character }
               );
           }

           await waitFor(() => {
               expect(screen.getByText("$ a")).toBeInTheDocument();
               expect(consoleSpy).toHaveBeenCalledWith("command: a");
           })
        });

        test('should print a new line', async () => {
            const characters = [97, 13, 97];
            for (const character of characters) {
                fireEvent.keyPress(
                    screen.getByRole('textbox', { name: /terminal input/i }),
                    { charCode: character }
                );
            }

            await waitFor(() => {
                expect(screen.getAllByText("$ a").length).toBe(2);
            });
        });
    });

    describe('tab handler', () => {
        test("should print four spaces", async () => {
            const characters = [97, 9, 97];
            for (const character of characters) {
                fireEvent.keyPress(
                    screen.getByRole('textbox', { name: /terminal input/i }),
                    { charCode: character }
                );
            }

            await waitFor(() => {
                expect(screen.getByText(/\$/i).textContent).toBe("$ a    a");
            })
        });
    });

    describe('clear handler', () => {
        test('should clear the terminal', async () => {
            const characters = [97, 98, 99, 12];
            for (const character of characters) {
                fireEvent.keyPress(
                    screen.getByRole('textbox', { name: /terminal input/i }),
                    { charCode: character }
                );
            }

            await waitFor(() => {
                expect(screen.getAllByText(/\$/i).length).toBe(1);
                expect(screen.getByText(/\$/i).textContent).toBe("$ ");
            })
        });
    })
});