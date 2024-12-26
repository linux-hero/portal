import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import App from "../src/modules/app/main";

describe("root component", () => {
    test("should render hello world", () => {
       render(<App />);
       screen.debug();
       expect(screen.getByText("Olá, Mundo!")).toBeInTheDocument();
    });
});