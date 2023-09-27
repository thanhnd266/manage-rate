const path = require("path");
const { useBabelRc, override } = require("customize-cra");

module.exports = {
  webpack: function (config, env) {
    config = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@": path.resolve(__dirname, "src"),
          "~": path.resolve(__dirname, "src/components"),
        },
      },
    };
    return config;
  },
  override: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc();
  },
};