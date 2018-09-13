const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        signup: "./src/pages/signup.js",
        signin: "./src/pages/login.js",
        question: "./src/pages/questions.js",
        allquiz: "./src/pages/allquiz.js",
        userprofile: "./src/pages/userprofile.js",
        answer: "./src/pages/answers.js",
        home: "./src/pages/homepage.js"
    },
    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["babel-preset-env", "stage-2"]
                }
            }
        }]
    },
    devtool: "inline-source-map"
};
