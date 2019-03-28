// TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型
// JavaScript原始数据类型: boolean, string, number, void, null, undefined, 

// 布尔值
let isDone:boolean = false;
// 注意，使用构造函数 Boolean 创造的对象不是布尔值
// let newBool:boolean = new Boolean(true);


// 数字
let aNumber:number = 6;
let notANumber:number = NaN;


// 字符串
let aString:string = 'Tom';
let sentence:string = `my name is ${aString}`;


// void 空值
// void 类型的变量只能赋值为 undefined 和 null：
let unusable:void = undefined;
// 可以用 void 表示没有任何返回值的函数
function alertName():void {
  alert('My name is Tom');
}


// Null 和 Undefined
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null。
let undefined01: undefined = undefined;
let null01: null = null;
// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错
let num:number = undefined;


// 任意值（Any）用来表示允许赋值为任意类型。
let anyType:any = 'seven';
anyType = 7;
// 在任意值上访问任何属性和方法都是允许的
console.log(anyType.name().age) // 允许编译
// 变量如果在声明的时候，未指定其类型， 也没有赋值， 那么它会被推断为任意值类型而完全不被类型检查
let something; // 等价于 let something: any;
something = 'seven';
something = 7;


// 类型推论（Type Inference）: 如果没有明确的指定类型，那么 TypeScript 会依照类型推论的规则推断出一个类型
let string01 = 'seven'; // 等价于 let string01: string = 'seven';
// string01 = 7;
// error TS2322: Type 'number' is not assignable to type 'string'.

// 联合类型（Union Types）: 表示取值可以为多种类型中的一种
// 使用 | 分隔每个类型。
let stringOrNumber:string | number;
stringOrNumber = 'seven';
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候, 我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
  // return something.length;
  return 0
  // length 不是 string类型 和 number类型 的共有属性， 所以报错
}

function getString(something: string | number): string {
  return something.toString();
  // toString 是 string类型 和 number类型 的共有属性， 因此通过
}