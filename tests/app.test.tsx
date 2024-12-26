import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import App from "../src/modules/app/main";
import 'canvas';

describe("root component", () => {
    test("should render hello world", () => {
       render(<App />);
       expect(screen.getByTestId("terminal")).toBeInTheDocument();
    });
});