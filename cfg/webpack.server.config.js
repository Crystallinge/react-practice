const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_SCSS_REGEXP = /\.global\.scss$/;

module.exports = {
  target: "node",
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: path.resolve(__dirname, "../src/server/server.js"),
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              // onlyLocals: true,
            },
          },
          "sass-loader",
        ],
        exclude: GLOBAL_SCSS_REGEXP,
      },
      {
        test: GLOBAL_SCSS_REGEXP,
        use: ["css-loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
