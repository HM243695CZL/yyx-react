const path = require('path')

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve('src'),
        }
    }
}
