import React from "react";
import { Component, ABC, myFun } from "./Component";
import { withReactView } from "storybook-addon-react-view/register";

export const ComponentStory = () => (
  <Component title="X">
    <div>{ABC}</div>
    <div>{myFun()}</div>
  </Component>
);

export default {
  title: "Component",
  component: Component,
  decorators: [withReactView],
  parameters: { useView: { scope: { Component, ABC, myFun } } },
};
