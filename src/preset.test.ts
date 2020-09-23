import { webpackFinal } from "./preset";

describe("webpackFinal", () => {
  it("sets fs to empty", async () => {
    const config = await webpackFinal({});
    expect(config).toStrictEqual({ node: { fs: "empty" } });
  });
});
