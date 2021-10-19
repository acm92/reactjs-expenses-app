const path = require("path")

module.exports = (env, argv) => {
    
    let isProduction = ""
    isProduction = argv.mode === 'production'

    return {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, "public"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                //To run Babel when a .js file is encountered. A single loader with "loader"
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                //SCSS. The S is optional, so it reads scss and/or css
                test: /\.s?css$/,
                //To use an array of loaders
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]

            }]
        },

        mode: isProduction ? "production" : "development",

        devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
        
        devServer: {
            static: path.join(__dirname, "public"),
            compress: true,
            historyApiFallback: true,
            port: 8080
        }
    }

}


