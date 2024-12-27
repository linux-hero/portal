import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import App from "../../../src/modules/app/main";
import 'canvas';

describe("app module", () => {
    test("should render terminal component", () => {
       render(<App />);
       expect(screen.getByTestId("terminal")).toBeInTheDocument();
    });
});