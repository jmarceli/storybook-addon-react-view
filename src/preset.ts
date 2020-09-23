export async function webpackFinal(webpackConfig: any = {}, options = {}) {
  // required to compile @babel in a storybook addon
  webpackConfig.node = { fs: "empty" };
  return webpackConfig;
}
