//import path from path;

module.exports = {
    watch: true,
    entry: "./src/index.js",
    devtool: "eval-cheap-module-source-map",
    watchOptions: {
        ignored: ["node_modules"]
    }
}