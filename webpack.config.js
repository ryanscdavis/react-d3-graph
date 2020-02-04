
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {

    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}