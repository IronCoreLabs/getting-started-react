const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const ironCoreConfig = require("./ironcore-config.json");

const privateKey = fs.readFileSync(path.join(__dirname, "private.key"), "utf8");

/**
 * Generate a JWT token using the current requesting users ID, your project ID (pid) and segment ID (sid). Return
 * the generated token back to the client.
 */
function serveJWT(req, res) {
    const {
        userID
    } = req.params;
    if (!userID) {
        res.status(404).end();
    } else {
        const token = jwt.sign({
                pid: ironCoreConfig.projectId,
                sid: ironCoreConfig.segmentId,
                kid: ironCoreConfig.serviceKeyId,
            },
            privateKey, {
                algorithm: "ES256",
                expiresIn: "2m",
                subject: userID,
            }
        );
        res.status(200).send(token);
    }
}

module.exports = () => {
    return {
        devServer: {
            port: 3000,
            before(app) {
                app.get("/generateJWT/:userID", serveJWT);
                app.get("/", (req, res) =>
                    res.sendFile("index.html", {
                        root: __dirname,
                    })
                );
            },
        },
        entry: [
            "whatwg-fetch",
            path.resolve(__dirname, 'app/entry.jsx')
        ],
        output: {
            publicPath: "http://localhost:3000/static/dist/",
            filename: "[name].js",
        },
        resolve: {
            modules: ["app", "node_modules"],
            extensions: [".js", ".jsx", ".css"],
        },
        devtool: "cheap-module-source-map",
        module: {
            rules: [{
                test: /\.js[x]?$/,
                include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname, 'app'),
                loader: 'style-loader!css-loader'

            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=assets/[name].[ext]"
            }]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new OpenBrowserPlugin({
                url: 'http://localhost:3000'
            })
        ],
    }
}