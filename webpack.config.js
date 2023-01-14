const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/style.css",
      filename: "style.css",
      inject: false,
    }),
  ];

  let config = {
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
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
}
