# Training

# Setup Guide

- install node (具体版本需要找项目负责人确定)
- install git   [key-questions](https://github.com/inetfuture/technote/blob/master/git.md#key-questions)
- install vscode

# Training Step 1
## Summary
- 学习JS和es6语法
- 学习和掌握react语法
- 利用[react-webpack-babel](https://github.com/alicoding/react-webpack-babel)完成 [TODOMVC](http://todomvc.com/examples/react/#/). 并提交代码到相应的地方

## References
- [JS](http://www.w3school.com.cn/js/index.asp)
- [ES6](http://es6.ruanyifeng.com/)
- [react](https://github.com/enaqx/awesome-react)
- [chrome-devtools](https://developers.google.com/web/tools/chrome-devtools/?hl=en)
- [ES7](https://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html)

# Training Step 2
## Summary
- 学习并掌握 redux
- 学习并掌握 moment
- 学习并掌握 lodash

## References
- [redux](http://redux.js.org/)
- [moment](http://momentjs.cn/docs/)
- [lodash](https://lodash.com/docs)

# Training Step 3
## Summary
- 参照各个项目的 eslint 配置, 规范 Code Style
- 参考 demo 代码 [Demo](./demo)

## References
- [ESLint](https://github.com/eslint/eslint/tree/master/docs/rules)
- [ESLint-React](https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules)

# Code Style

## ES6
- 如果声明该文件使用绝对路径, 那么该文件夹下组件相互引用需要用相对路径.
- 私有成员要加下划线前缀
- 类成员排序：静态属性、静态方法、实例属性、`constructor` 、实例方法，公开方法尽量写在私有方法前面
- 成员声明后面不要加分号

## React
- 组件成员排序：`propTypes` 、`defaultProps` 、`state` 、`constructor` 、生命周期方法、其它方法、事件处理方法、render 方法，除 `state` 外的实例属性初始化放在 `constructor` 内
- `propTypes` 排序：其它属性、方法属性、样式属性
- 事件处理方法、styles 等声明尽量按 UI 组件排列顺序或者交互顺序
- `defaultProps` ：
- 对于 redux connected component ，不要使用 `defaultProps` ，应该使用 redux 中的 `_getInitialState()`
- 必需的属性不需要声明默认值
- 在 `componentDidMount` 中调 API 初始化数据而非 `componentWillMount`
- 事件处理方法命名规则为 `on` + 动词 + 名词，上下文很简单的情况下名词可省略，比如 `onPressSignIn` 、`onPress`
- 性能：
- 不要在 render 中进行大量计算，计算结果应该缓存到 state 中
- 尽量实现 `componentShouldUpdate` 方法减少不必要的刷新
- 向其它模块 `dispatch` action 必须经由目标模块导出的 action creator ，不能直接 `dispatch({ type: 'xxx' })`
- 在 action creator ，redux connected component 中不要使用 `store` 访问 `dispatch` ，`state` ，而应该直接使用框架传入的：

## Others
- 命名：
    - 布尔值的命名需要以 is ，can ，should 等开头
    - 概念命名尽量与服务端 api 一致
    - 通用可重用组件命名可以抽象化，比如 `item` ，但是在 module 内应该尽量具体，比如 `order` 、`guest` 、`user`
- 特殊问题的特定解决方案处要加注释说明为什么要这样做

# References
## 准备
> html
- http://www.w3school.com.cn/html/index.asp
- http://www.w3school.com.cn/html5/index.asp

> javascript
- http://www.w3school.com.cn/js/index.asp
- http://es6.ruanyifeng.com

> css
- http://www.w3school.com.cn/css/index.asp
- http://www.w3school.com.cn/css3/index.asp
- http://lesscss.org/#getting-started


## 基础
- https://github.com/facebook/react
- https://github.com/ReactTraining/react-router
- https://github.com/reactjs/react-redux
- https://github.com/axios/axios

## 提高
- https://github.com/ant-design/ant-design
- https://github.com/lodash/lodash
- https://github.com/moment/moment

## 超脱
- https://github.com/webpack/webpack
- https://github.com/eslint/eslint
- https://github.com/stylelint/stylelint
