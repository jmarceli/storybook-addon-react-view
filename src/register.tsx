import React from "react";
import { useView, Compiler, Editor, Error } from "react-view";

import { makeDecorator, StoryContext, StoryFn } from "@storybook/addons";

import { renderJsx } from "./renderJsx";

const Preview = ({ storyFn, storyContext, parameters }: any) => {
  let initialCode = "";

  if (
    storyContext.parameters.storySource &&
    storyContext.parameters.storySource.source
  ) {
    // if @storybook/addon-docs is used use source from the addon
    initialCode = storyContext.parameters.storySource.source;
  } else {
    initialCode = `() => (\n` + renderJsx(storyFn(storyContext), {}) + `\n);`;
  }

  const params = useView({
    ...parameters,
    initialCode,
  });

  return (
    <React.Fragment>
      <Compiler {...params.compilerProps} />
      <div style={{ marginTop: 20 }}>
        <Editor {...params.editorProps} />
        <Error {...params.errorProps} />
      </div>
    </React.Fragment>
  );
};

export const withReactView = makeDecorator({
  name: "withReactView",
  parameterName: "useView",
  wrapper: (
    storyFn,
    context,
    {
      parameters,
    }: {
      storyFn: StoryFn<React.Component>;
      context: StoryContext;
      options: {};
      parameters: { scope: {}; componentName: string };
    }
  ) => {
    return (
      <Preview
        storyFn={storyFn}
        storyContext={context}
        parameters={parameters}
      />
    );
  },
});
