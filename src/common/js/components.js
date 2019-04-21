const requireComponent = require.context(
  // 其组件目录的相对路径
  '../../components/global',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
)

export default {
  install: (Vue, option) => {
    requireComponent.keys().forEach(fileName => {
      // 获取组件配置
      const componentConfig = requireComponent(fileName)

      // 获取组件的 PascalCase 命名
      const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

      // 全局注册组件
      Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
      )
    })
  }
}
