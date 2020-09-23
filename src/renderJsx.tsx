import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";

// code from https://github.com/storybookjs/storybook/blob/next/addons/docs/src/frameworks/react/jsxDecorator.tsx

/** Run the user supplied onBeforeRender function if it exists */
const applyBeforeRender = (domString: string, options: any) => {
  if (typeof options.onBeforeRender !== "function") {
    return domString;
  }

  return options.onBeforeRender(domString);
};
/** Apply the users parameters and render the jsx for a story */
export const renderJsx = (code: any, options: any): any => {
  if (typeof code === "undefined") {
    // logger.warn("Too many skip or undefined component");
    return null;
  }

  let renderedJSX = code;
  const Type = renderedJSX.type;

  for (let i = 0; i < options.skip; i += 1) {
    if (typeof renderedJSX === "undefined") {
      // logger.warn("Cannot skip undefined element");
      return null;
    }

    if (React.Children.count(renderedJSX) > 1) {
      // logger.warn("Trying to skip an array of elements");
      return null;
    }

    if (typeof renderedJSX.props.children === "undefined") {
      // logger.warn("Not enough children to skip elements.");

      if (typeof Type === "function" && Type.name === "") {
        renderedJSX = <Type {...renderedJSX.props} />;
      }
    } else if (typeof renderedJSX.props.children === "function") {
      renderedJSX = renderedJSX.props.children();
    } else {
      renderedJSX = renderedJSX.props.children;
    }
  }

  const opts =
    typeof options.displayName === "string"
      ? {
          ...options,
          showFunctions: true,
          displayName: () => options.displayName,
        }
      : options;

  const result = React.Children.map(code, (c) => {
    // @ts-ignore FIXME: workaround react-element-to-jsx-string
    const child = typeof c === "number" ? c.toString() : c;
    let string = applyBeforeRender(
      reactElementToJSXString(child, opts),
      options
    );
    const matches = string.match(/\S+=\\"([^"]*)\\"/g);

    if (matches) {
      matches.forEach((match: any) => {
        string = string.replace(match, match.replace(/&quot;/g, "'"));
      });
    }

    return string;
  }).join("\n");

  return result.replace(/function\s+noRefCheck\(\)\s+\{\}/, "() => {}");
};
