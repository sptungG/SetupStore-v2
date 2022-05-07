const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#9147ff", // primary color for all components
              "@secondary-color": "#a970ff", // primary color for all components
              "@link-color": "#9147ff", // link color
              "@success-color": "#52c41a", // success state color
              "@warning-color": "#faad14", // warning state color
              "@error-color": "#f5222d", // error state color
              "@box-shadow-base": "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};