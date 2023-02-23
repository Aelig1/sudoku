const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const rules = [
    {
      test: /\.(t|j)sx?$/i,
      exclude: /node_modules/,
      use: ["babel-loader"],
    },
    {
      test: /\.(c|s[ac])ss$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
  ];

  const plugins = [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
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
      filename: "[name].[contenthash].js",
      clean: true,
    },
    optimization: {
      minimizer: [
        "...",
        new CssMinimizerPlugin(),
      ],
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
