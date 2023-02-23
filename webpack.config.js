const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const rules = [
    {
      test: /\.(t|j)sx?$/i,
      exclude: /node_modules/,
      use: ["babel-loader"],
    },
    {
      test: /\.(c|s[ac])ss$/i,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
  ];

  const plugins = [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false,
    }),
  ];

  const config = {
    entry: "./src/index.ts",
    module: { rules },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    target: ["web", "es5"],
    output: {
      filename: "index.js",
    },
    plugins,
  };

  if (argv.mode === "development") {
    console.log("Building for development");
  }

  else if (argv.mode === "production") {
    console.log("Building for production");
  }

  return config;
};
