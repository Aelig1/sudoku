const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const rules = [
    {
      test: /\.tsx?$/i,
      use: "ts-loader",
      exclude: /node_modules/,
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
    target: "web",
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
