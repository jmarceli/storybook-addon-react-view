import React from "react";
import { useView, Compiler, Editor, Error, TUseViewParams } from "react-view";

import { makeDecorator, StoryContext, StoryFn } from "@storybook/addons";

import { renderJsx } from "./renderJsx";

interface ExtendedParameters extends TUseViewParams {
  compilerClassName?: string;
  editorClassName?: string;
  errorClassName?: string;
}

interface PreviewProps {
  storyFn: any;
  storyContext: any;
  parameters: ExtendedParameters;
}

const Preview = ({ storyFn, storyContext, parameters }: PreviewProps) => {
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

  const { compilerClassName, editorClassName, errorClassName, ...config } = parameters

  const params = useView({
    ...config,
    initialCode,
  });

  return (
    <React.Fragment>
      <Compiler {...params.compilerProps} className={compilerClassName} />
      <div style={{ marginTop: 20 }}>
        <Editor {...params.editorProps} className={editorClassName} />
        <Error {...params.errorProps} className={errorClassName} />
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
