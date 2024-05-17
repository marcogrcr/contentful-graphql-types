import { describe, expect, it } from "vitest";

import { sum } from "../src/index.js";

describe("sum", () => {
  it("adds two numbers", () => {
    const actual = sum(1, 2);

    expect(actual).toBe(3);
  });
});
