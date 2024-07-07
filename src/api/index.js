import Vue from 'vue'
const requireDirective = require.context(
    // 指令目录
    './',
    // 不查找子目录
    false,
    // js文件
    /.+\.js$/
)
let $API={}
// 对每个配匹的文件
requireDirective.keys().forEach(fileName => {
    // 请求指令模块
    const directiveConfig = requireDirective(fileName)

    const directiveName = fileName
        // 移除开始的 './'
        .replace(/^\.\//, '')
        // 移除文件扩展
        .replace(/\.\w+$/, '');
    if (directiveName != 'index') {
        // 注册指令, 文件名作为指令名
        $API[directiveName]=directiveConfig.default || directiveConfig
    }
})
Vue.prototype.$API=$API