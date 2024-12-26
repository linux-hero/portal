import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import App from "../src/app";

describe("root component", () => {
    test("should render hello world", () => {
       render(<App />);
       screen.debug();
       expect(screen.getByText("Hello, World!")).toBeInTheDocument();
    });
});