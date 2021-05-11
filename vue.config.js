// module.exports = {
//     runtimeCompiler: true,
//     publicPath: '/', // 设置打包文件相对路径
//     devServer: {
//         port: 8080,
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:8080/',
//                 changeOrigin: true,
//                 ws: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// }