/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React from "react";
// import range from 'lodash/range';
import addons, { StoryWrapper } from "@storybook/addons";
import { withReactView } from "./register";

const SNIPPET_RENDERED = `storybook-addon-react-view/snippet-rendered`;

interface MakeDecoratorOptions {
  name: string;
  parameterName: string;
  skipIfNoParametersOrOptions?: boolean;
  wrapper: StoryWrapper;
}

jest.mock("react-view", () => ({
  useView: jest.fn(),
  Compiler: jest.fn(),
  Editor: jest.fn(),
  Error: jest.fn(),
}));
jest.mock("@storybook/addons", () => ({
  makeDecorator: (args: MakeDecoratorOptions) => args,
}));

expect.addSnapshotSerializer({
  print: (val: any) => val,
  test: (val) => typeof val === "string",
});

describe("renderJsx", () => {
  it("basic", () => {
    // console.log('withReactView', withReactView);
    const decorator = withReactView;
    expect(decorator).toStrictEqual({
      name: "withReactView",
      parameterName: "useView",
      wrapper: expect.any(Function),
    });
    expect((decorator as any).wrapper(() => "", {}, {})).toMatchInlineSnapshot(`
      <Preview
        storyContext={Object {}}
        storyFn={[Function]}
      />
    `);
  });
});
