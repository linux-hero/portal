import {afterEach, expect, vi} from "vitest";
import * as matchers from '@testing-library/jest-dom/matchers';
import {cleanup} from "@testing-library/react";
import '../../src/translation'

expect.extend(matchers);

afterEach(() => {
    cleanup();
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});