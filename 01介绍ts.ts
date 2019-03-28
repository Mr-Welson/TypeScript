// 什么是 TypeScript

// 为什么选择TypeSctipt
// 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用
// 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
// 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
// => 增加了代码的可读性和可维护性

// 01. 使用冒号(:)指定变量的类型，: 的前后有没有空格都可以;
// 02. 使用 tsc 命令可编译 .ts 文件为 .js 文件;
// 03. TypeScript 编译的时候即使报错了，还是会生成编译结果(.js), 可通过 tsconfig.json 文件配置;

function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = '';
console.log(sayHello(user));