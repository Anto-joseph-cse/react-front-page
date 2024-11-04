// webpack.config.js
const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "url": require.resolve("url/"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert/"),
            "zlib": require.resolve("browserify-zlib")
        }
    },
    // Add entry, output, and other settings if needed
};
