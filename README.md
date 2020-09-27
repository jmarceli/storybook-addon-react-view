# Storybook Addon React View

Storybook addon which makes your story source interactive [Storybook Addon React View](https://github.com/jmarceli/storybook-addon-react-view).

Demo: https://jmarceli.github.io/storybook-addon-react-view/
Demo code: [docs-source](./docs-source)

## Installation

If you need to add it to your Storybook, you can run:

```sh
npm i -D storybook-addon-react-view
```

## Configuration

Then, add following content to [`.storybook/main.js`](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project):

```js
module.exports = {
  addons: ["storybook-addon-react-view"],
};
```

## Usage

Simple:

```jsx
import React from "react";
import { Component, ABC, myFun } from "./Component";
import { withReactView } from "storybook-addon-react-view/register";

export const ComponentStory: React.FC<{}> = () => (
  <Component title="X">
    <div>{ABC}</div>
    <div>{myFun()}</div>
  </Component>
);

export default {
  title: "Component",
  component: Component,
  decorators: [withReactView],
  parameters: { useView: { scope: { Component } } },
};
```

or with `@storybook/addon-docs`:

```jsx
import React from "react";
import { Component, ABC, myFun } from "./Component";
import { withReactView } from "storybook-addon-react-view/register";

export const ComponentStory: React.FC<{}> = () => (
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
```

## License

[MIT](./LICENSE)

## Author

Jan Grzegorowski
