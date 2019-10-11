
import { WithData, WithLog } from './HOC'
import Detail from './Detail'


//1.高阶组件的链式调用
let Person = WithLog(WithData(WithLog(Detail)))


//2.高阶组件的装饰器写法

// @WithLog
// @WithData
// @WithLog

// let Person = Detail


//fixbug：导出的是变量名（String），而不是组件（Object）

export default Person
