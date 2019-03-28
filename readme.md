---
title: TypeScript
categories:
  - 笔记
tag:
  - typescript
---



## 简介

[TypeScript](http://www.typescriptlang.org/) 是 JavaScript 的一个超集，主要提供了 类型系统 和对 ES6 的支持，由 Microsoft 开发。

应用：vue3.0，angular2.0，vscode...

1. 编译型语言：编译为 js 后运行，单独无法运行;
2. 强类型语言;
3. 面向对象的语言;

### 优势

1. 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用；
2. 可以在编译阶段就发现大部分错误，这总比在运行时候出错好；
3. 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等；

总结：TypeSctipt增加了代码的可读性和可维护性。

### 安装

需要有node环境，通过npm安装

```
npm install -g typescript
```

### 编码

[在线编译预览 TS ](https://www.tslang.cn/play/index.html)

使用 `.ts` 文件扩展名， 使用 `typescript` 编写使用 React 时，使用 `.tsx` 扩展名。

使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以;

```
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

### 编译

使用` tsc`  命令可编译 .ts 文件， 生成一个同名 .js 文件；编译的时候即使报错了，还是会生成编译结果(.js)，可通过 [tsconfig.json](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html) 文件配置

```
tsc demo.ts
```

## 基础类型

### 布尔值 boolean

```typescript
let isDone: boolean = false;
```

注意，使用构造函数 Boolean 创造的对象不是布尔值

```typescript
let newBool: boolean = new Boolean(true);
// 编译报错: 不能将类型“Boolean”分配给类型“boolean”。“boolean”是基元，但“Boolean”是包装器对象。如可能首选使用“boolean”。ts(2322)
```

### 数字 number

```typescript
let number: number = 6;
let notANumber: number = NaN;
```

### 字符串 string

```typescript
let  string: string = 'Tom';
let sentence: string = `my name is ${aString}`;
```

### 空值 void

void 类型的变量只能赋值为 undefined 和 null

```
let unusable: void = undefined;
```

可以用 void 表示没有任何返回值的函数

```
function alertName(): void {
  alert('My name is Tom');
}
```

### null 和 undefined

undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null

```
let u: undefined = undefined;
let n: null = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

```
let u: undefined;
let num: number = u;
let num2:number = undefined;
// 编译合法 undefined是number的子类型

let unm2: void;
let num3: number = unm2;
// => 不合法 (void不是number的子类型)
```

### 任意值 any

any 用来表示允许赋值为任意类型

```
let anyType:any = 'seven';
anyType = 7;
```

在任意值上访问任何属性和方法都是允许的，即不做类型检查

```
let anyType:any = 'seven';
console.log(anyType.name().age) 
// => 允许编译，但是js执行会报错
```

变量如果在声明的时候，未指定其类型， 也没有赋值， 那么它会被推断(类型推论)为任意值类型而完全不被类型检查

```
let something; 
// 等价于 let something: any;
something = 'seven';
something = 7;
```

### 数组

可理解为相同类型的一组数据，数组类型有多种定义方式

1，类型 + 方括号（  type [ ] ）

这种方式定义的数组项中不允许出现其他的类型

```
let list: number[] = [1, 2, 3];
```

2，数组泛型  Array < type >

```
let list: Array<number> = [1, 2, 3];
```

### 元祖 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同，简单理解为可定义一组不同类型的数据：

```
let arr:[string, number] = ['name', 20];
console.log(arr[0]); 
// => 'name' 
```

越界元素：当访问超出元祖长度的元素时，它的类型会被限制为元祖中每个类型的联合类型

```
let arr:[string, number] = ['name', 20];
arr[0] = 'age';
arr[2] = 'string';
arr[3] = 40;
arr[4] = true; // 编译报错
```

### 枚举 enum  

['enəm] 

枚举类型用于取值被限定在一定范围内的场景，如一周只有7天，一年只有4季等。

#### 枚举初始化

枚举初始化可以理解为给枚举成员赋值。每个枚举成员都需要带有一个值，在未赋值的情况下， 枚举成员会被赋值为从 `0` 开始， 步长为 1 递增的数字：

```
enum Weeks {Mon, Tue, Wed, Thu, Fri, Sat, Sun};

console.log(Weeks['Mon']); // => 0
console.log(Weeks[0]); // => 'Mon'
console.log(Weeks.Tue); // => 1
```

手动赋值时， 未赋值的枚举成员会接着上一个枚举项递增（初始化）：

```typescript
enum Weeks {
	Mon, Tue, Wed, Thu = 2, Fri, Sat = -1.5, Sun
};

console.log(Weeks['Mon']); // => 0
console.log(Weeks.Wed); // => 2
console.log(Weeks.Thu); // => 2
console.log(Weeks.Fri); // => 3
console.log(Weeks.Sun); // => -0.5
```

上例中，未手动赋值的 Wed 和手动赋值的 Thu 取值重复了，但是 TypeScript 并不会报错，该种情况可能会引起取值错误，所以使用的时候最好避免出现取值重复的情况。

TypeScript 支持 数字 的和基于字符串的枚举。

#### 数字枚举

```
enum Weeks {
	Sun, Mon, Tue, Wed, Thu, Fri, Sat
};
```

#### 字符串枚举

```
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

#### 异构枚举（Heterogeneous enums）

可以混合字符串和数字，但通常不这么做

```
enum Gender {
    Male = 0,
    Female = "1",
}
```

#### 常量成员和计算所得成员

枚举成员的值可以是 常量 或 计算出来的。

上面所举的例子都是常量成员，官网定义如下：

当满足以下条件时，枚举成员被当作是常数：

- 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 `1`。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 `0`。
- 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
  - 数字字面量
  - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
  - 带括号的常数枚举表达式
  - `+`, `-`, `~` 一元运算符应用于常数枚举表达式
  - `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错

所有其它情况的枚举成员被当作是需要计算得出的值。

#### 常量枚举 const enum

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

```
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

编译后：

```
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

#### 外部枚举 declare enum

外部枚举与声明语句一样，常出现在声明文件中。

```
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

编译后：

```
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

同时使用 `declare` 和 `const` 也是可以的，编译结果同常量枚举一致。

### never

永远不存在值的类型，一般用于错误处理函数。

```
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

### symbol

自ECMAScript 2015起，`symbol`成为了一种新的原生类型，就像 `number` 和 `string` 一样。

`symbol`类型的值是通过`Symbol`构造函数创建的。

```
let sym1 = Symbol();
```

Symbols是不可改变且唯一的。

```
let sym2 = Symbol("key");
let sym3 = Symbol("key");
sym2 === sym3; // false, symbols是唯一的
```

更多用法参看 [阮一峰ES6的symbol](http://es6.ruanyifeng.com/#docs/symbol)

### object

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

```
function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

### 内置对象

JavaScript 中有很多[内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在 TypeScript 中当做定义好了的类型。

#### ECMAScript 的内置对象

`Boolean`、`Error`、`Date`、`RegExp` 等。更多的内置对象，可以查看 [MDN 的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)。

```
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

#### DOM 和 BOM 的内置对象

`Document`、`HTMLElement`、`Event`、`NodeList` 等。

```
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

## 类型推论

变量申明如果没有明确的指定类型，那么 TypeScript 会依照类型推论的规则推断出一个类型

```
let string = 'seven';
// 等价于 let string: string = 'seven';
string = 4;
// 编译报错: error TS2322: Type 'number' is not assignable to type 'string'
```

变量声明但是未赋值，会推论为 any

```
let x;
x = 1;
x = 'aaa'
```

## 联合类型

表示取值可以为多种类型中的一种，使用 | 分隔每个类型

```
let stringOrNumber:string | number;
stringOrNumber = 'seven';
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候, 我们只能访问此联合类型的所有类型里共有的属性或方法

```typescript
function getString(something: string | number): string {
  // toString 是 string类型 和 number类型 的共有属性
  return something.toString();
}

function getLength(something: string | number): number {
  return something.length;
  // => 编译报错: length 不是 string类型 和 number类型 的共有属性, 所以报错
}
```

## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

类型断言有2种形式：

1，<类型>值   ( 尖括号语法 )

```
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

2，值 as 类型  ( as 语法 )

当使用 `tsx`  时，只有 `as`语法断言是被允许的

```
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

在上述 联合类型 的例子中， `getLength` 方法会编译报错，此时我们可以使用类型断言，将 `something ` 断言成 `string` 就不会报错了：

```typescript
function getLength(something: string | number): number {
    if ((<string>something).length) {
    	// 将 something 断言为 string类型
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

**注意 :** 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：

```
function toBoolean(something: string | number): boolean {
    return <boolean>something;
    // => 报错
}
```

## 类型别名 type

类型别名用来给一个类型起个新名字，多用于联合类型：

```
type Name = string;
type GetName = () => string;
type NameOrGetter = Name | GetName;
function getName(n: NameOrGetter): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

## 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'
```

## 接口 Interfaces 

接口（Interfaces）是一个很重要的概念，可以理解为一种规范或者约束，用来描述 **对象(object) 的形状** 或者对 **类(class) 的行为** 进行抽象。对类的行为抽象将在后面 **类与接口** 一章中介绍，下面主要介绍对对象的形状进行描述。

### 接口定义

使用 interface 定义接口, 接口名称一般首字母大写，定义接口的时候，只定义声明即可，不包含具体内容：

```
// 定义一个接口 Person
interface Person {
  name: string;
  age: number;
}

// 定义一个个变量，它的类型是 Person
let tom: Person = {
  name: 'Tom',
  age: 25
};
```

实现接口的时候，要实现里面的内容，定义的变量比接口少了或多了属性都是不允许的：

```
let tom: Person = {
  name: 'tom'
}
// => 编译报错，少了age属性
```

### 可选属性

使用 ? 代表可选属性, 即该属性可以不存在, 但不允许添加未定义的属性

```
interface Person {
  name: string;
  age?: number;
}
let tom: Person = {
  name: 'tom'
}
// age是可选属性
```

### 任意属性

定义了任意属性后可以添加未定义的属性，并可以指定属性值的类型

```
interface Person03 {
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom04: Person03 = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
```

定义了任意属性，那么确定属性和可选属性都必须是它的子属性

```
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}
// 编译报错：Person定义了一个任意属性，其值为string类型。则Person的所有属性都必须为string类型，而age为number类型
```

### 只读属性 readonly

```typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
```

只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

```typescript
let person: Person = {
  id: 100,
  name: 'tom',
}
person05.id = 90;
// => 编译报错：id为只读, 不可修改

let person2: Person = {
  name: 'welson',
  age: 2
}
// => 编译报错：给对象 person2 赋值，未定义只读属性id
person2.id = 1;
// => 编译报错：id为只读, 不可修改
```

### 函数类型接口

```
// 只有参数列表和返回值类型的函数定义, 参数列表里的每个参数都需要名字和类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

## 函数

### 函数声明

```
function sum(x: number, y: number): number {
    return x + y;
}
```

输入多余的（或者少于要求的）参数，是不被允许的

```
sum(1, 2, 3);
// 编译报错：多了1个参数
```

### 匿名函数（函数表达式）

```
let mySum = function (x: number, y: number): number {
    return x + y;
};
```

上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
```

### 用接口定义函数的形状

```
interface FuncAdd {
  (value: number, increment: number): number
}
let add: FuncAdd;
add = function(value: number, increment: number): number {
  return value + increment;
}
// 函数的参数名不需要与接口里定义的名字相匹配
let add2: FuncAdd;
add2 = function(a: number, b: number) {
  return a + b;
}
```

### 可选参数

可选参数必须接在必需参数后面，换句话说，可选参数后面不允许再出现必须参数了

```
function addNum(a: number, b: number, c? :number): number {
	if(c) {
      	return a + b + c;
	} else {
      	return a + b;
	}
}
console.log(add(1, 2));
```

### 默认参数

类比 ES6 中的默认值

```
function add(a: number = 1, b: number): number {
  	return a + b;
}
console.log(add(undefined, 1));
```

### 剩余参数

类比 Es6 中对象展开

```
interface AddFunc {
  (num1: number, ...rest: number[]): number
}
let add: AddFunc;
add = function(a: number, ...rest: number[]): number {
	let result = a; 
	rest.map(v => result += v);
	return result;
}
console.log(add(1,2,3,4));
```

### 函数重载

重载是为同一个函数提供多个函数类型定义，允许函数对传入不同的参数返回不同的的结果分别做类型检查

比如实现一个数字或字符串的反转函数：

```typescript
function reverse(text: number | string): number | string {
  if(typeof text === 'string') {
    return text.split('').reverse().join('');
  } else if(typeof text === 'number') {
    return +text.toString().split('').reverse().join('')
  }
}
```

上述函数利用联合类型实现，但有一个缺点，无法精确检查输入和输出类型，即输入数字输出也应该为数字，这时就可以使用重载定义多个函数类型:

```
function reverse(text: number): number;
function reverse(text: string): string;
function reverse(text: number | string): number | string {
  if(typeof text === 'string') {
    return text.split('').reverse().join('');
  } else if(typeof text === 'number') {
    return +text.toString().split('').reverse().join('')
  }
}
```

重复定义多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。

TypeScript与JavaScript的处理流程相似，它会查找重载列表，从第一个重载定义开始匹配，如果匹配的话就使用这个定义，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

## 类 class

同ES6 的 class

### 相关概念

- 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

### 类的定义

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数。

```
class Animal {
		name:string; // 定义属性
    constructor(name) {
        this.name = name; // 属性赋值
    }
    sayHi() {
        return `我叫 ${this.name}`;
    }
}

let cat = new Animal('Tom');
console.log(cat.sayHi()); // 我叫 Tom
```

### 类的继承

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```
class Cat extends Animal {
    color: string;
    constructor(name, color) {
        super(name); // 调用父类Animal的 constructor(name)
        this.color = color
    }
    sayHi() {
        // 调用父类的 sayHi()；
        return super.sayHi() + '我是一只'+ this.color + ' 色的猫，'; 
    }
}

let c = new Cat('Tom', '橘黄'); // Tom
console.log(c.sayHi()); // 我叫 Tom，我是一只橘黄色的猫；

let cat2 = new Cat('Jerry');
cat2.color = '黑';
console.log(c.sayHi()); // 我叫 Jerry，我是一只黑色的猫；
```

### 存取器

使用 getter 和 setter 可以改变属性的赋值和读取行为：

```
class Animal {
		name:string;
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

### 实例属性和方法

js中的属性和方法：

```
// js中
function Person(name) {
  this.name = name; // 实例属性
  this.eat = function(){ console.log('eat') };  // 实例方法
}
Person.age = 19; // 静态属性
Person.sleep = function(){ console.log('sleep') }; // 静态方法

// 访问实例方法和属性:
var tom = new Person('tom');
console.log(tom.name) // tom
tom.eat();
tom.sleep() // error: tom.sleep is not a function

// 访问静态方法和属性:
console.log(Person.age); // 19
Person.sleep();
Person.eat(); // error: Person.eat is not a function
```

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义：

```
class Animal {
    constructor(){
			this.name = 'tom';
		}
    eat() {}
}

let a = new Animal();
console.log(a.name); // tom
```

ES7 提案中可以直接在类里面定义：

```
// ts
class Animal {
    name = 'tom';
    eat() {}
}

let a = new Animal();
console.log(a.name); // Jack
```

### 静态属性和方法

ES7 提案中，可以使用 `static` 定义一个静态属性或方法。静态方法不需要实例化，而是直接通过类来调用：

```
// ts
class Animal {
    static num = 42;
    static isAnimal(a) {
        return a instanceof Animal;
    }
}

console.log(Animal.num); // 42
let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

### 访问修饰符

#### public

公有属性或方法，可以在任何地方被访问到，默认所有的属性和方法都是 `public`的

#### private 

私有属性或方法，不能在声明它的类的外部访问，也不可以在子类中访问

#### protected

受保护的属性或方法，它和 `private` 类似，区别是它可以在子类中访问

```
class Person {
    public name:string;
    protected phone:number;
    private idCard:number;
    constructor(name,idCard,phone) {
        this.name = name;
        this.idCard = idCard;
        this.phone = phone;
    }
}

let tom = new Person('tom',420000,13811110000);
console.log(tom.name) // tom

console.log(tom.phone)
// error:Property 'phone' is protected and only accessible within class 'Person' and its subclasses

console.log(tom.idCard) 
// error:Property 'idCard' is private and only accessible within class 'Person'.


class Teacher extends Person {
    constructor(name,idCard,phone) {
        super(name,idCard,phone);
        console.log(this.name)
        console.log(this.phone)
				console.log(this.idCard)
				// error:Property 'idCard' is private and only accessible within class 'Person'.
    }
}
```

### 多态

同一个父类的多个子类，可以有不同结果的同名方法：

```typescript
class Person {
  eat(){ console.log('eat') }
}
class A extends Person {
  eat(){ console.log('A eat') }
}
class B extends Person {
  eat(){ console.log('B eat') }
}
```

### 抽象类/抽象方法 abstract

`abstract` 用于定义抽象类和其中的抽象方法。

1. 抽象类是提供给其他类继承的基类（父类），是不允许被实例化
2. 抽象方法只能包含在抽象类中
3. 子类继承抽象类，必须实现抽象类中的抽象方法

```
abstract class Animal {
    abstract eat(); // 抽象方法
    // 普通方法
    sleep(){
      console.log('sleep')
    }
}

let a = new Animal(); // 报错，抽象类不能被实例化

class Cat extends Animal {
    eat(){ 
    	// 父类的eat方法必须被实现
      console.log('eat')
    }
}
```



## 类与接口

前面介绍了 **接口** 可以用来描述 **对象(object)的形状**，这一章主要介绍 **接口** 对 **类(class)的行为** 进行抽象。

### 类实现接口 implements

实现（implements）是面向对象中的一个重要概念。一个类只能继承自另一个类，不同类之间可能会有一些共有特性，提取多个类的共有特性，作为一个接口，再用 `implements` 关键字来实现就可以大大提高面向对象的灵活性。

举例： 人是一个类，人需要吃东西。动物是一个类，动物也需要吃东西。这种情况就可以把 吃东西 提取出来作为一个接口：

```
interface Ieat {
   eat();
}

class Person implements Ieat{
  eat(){}
}

class Animal implements Ieat {
  eat(){}
}
```

一个类也可以实现多个接口：

```
interface Ieat {
   eat();
}

interface Isleep {
    sleep();
}

class Person implements Ieat, Isleep{
  eat(){}
  sleep() {}
}
```

### 接口继承接口 

```
interface Alarm {
    alert();
}

interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
```

### 接口继承类

```
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

### 混合类型

前面介绍了接口可以用来定义函数的形状，有时候，一个函数还可以有自己的属性和方法：

```
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```









## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

打印number：

```typescript
function printer(arr:number[]):void {
  for(var item of arr) {
    console.log(item)
  }
}
printer([1,2,3,4])
```

打印字符串：

```typescript
// 打印字符串
function printer1(arr:string[]):void {
  for(var item of arr) {
    console.log(item)
  }
}
printer1(['a','b','c','d'])
```

使用 any 也可以通过编译，但是无法准确定义返回值的类型，这个时候就可以使用泛型函数

### 泛型函数

在函数名后加上 `<T>` （也可以是其他别的字母），其中 `T` 用来指代输入的类型，在函数内部就可以使用这个 `T` 类型。

```
function printer<T>(arr:T[]):void {
  for(var item of arr) {
    console.log(item)
  }
}
// 指定具体类型调用
printer<string>(['a','b','c','d']);
// 调用时也可以直接让ts自己做类型推论
printer([1,2,3,4]);
```

也可以同时使用多个类型参数

```typescript
function swap<S,P>(tuple:[S,P]):[P,S] {
  return [tuple[1], tuple[0]]
}
swap<string, number>(['a', 2])
```

### 泛型类

```typescript
class arrayList<T> {
  name: T;
  list: T[] = [];
  add(val:T):void {
    this.list.push(val)
  }
}

var arr = new arrayList<number>();
arr.add(1)
arr.add(2)
console.log(arr.list)
```

### 泛型接口

```
interface Iadd<T> {
  (x:T,y:T):T;
}

var add:Tadd<number> = function(x:number,y:number):number {
  return x + y
}
```

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

获取一个参数的长度：

```
function getLength<T>(arg:T):T {
	console.log(arg.length) // error: Property 'length' does not exist on type 'T'
  return arg;
}
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了，这时候就可以使用泛型约束，使用 `extends` 约束泛型 `<T>` 必须符合 `Ilength` 的形状，也就是必须包含 `length` 属性：

```
interface Ilength {
  length: number
}

function getLength<T extends Ilength>(arg:T):T {
	console.log(arg.length)
  return arg;
}

getLength('abcd') // 4

getLength(7) // error: Argument of type '7' is not assignable to parameter of type 'Ilength'.
```

多个参数间也可以互相约束：

```
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 })
```

## 声明文件 declare

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

### 声明语句

假如我们使用第三方库 jQuery，来获取一个元素

```
$('#foo');
jQuery('#foo');
```

但是在 ts 中，编译器并不知道 `$` 或 `jQuery` 是什么东西：

```
jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.
```

这时，我们需要使用 `declare var` 来定义它的类型，`declare var`  并没有真的定义一个变量，只是定义了全局变量 `jQuery` 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。

```
declare var jQuery: (selector: string) => any;
jQuery('#foo');
```

### 声明文件

通常我们会把声明语句放到一个单独的文件（`xxx.d.ts`）中，这就是声明文件，声明文件必需以 `.d.ts` 为后缀。

一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuery` 的类型定义了。

这是使用全局变量模式的声明文件，还有其他模式如 模块导入 等会在后面介绍。

### 第三方声明文件

社区已经帮我们定义好了很多第三方库的声明文件，可以直接下载下来使用，更推荐使用 `@types` 统一管理第三方库的声明文件。`@types` 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

```
npm install @types/jquery --save-dev
```

可以在[这个页面](http://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

### 书写声明文件

当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。

在不同的场景下，声明文件的内容和使用方式会有所区别：

- 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
- npm 包：通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
- UMD 库：既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
- 模块插件：通过 `import` 导入后，可以改变另一个模块的结构
- 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构。比如为 `String.prototype` 新增了一个方法
- 通过导入扩展全局变量：通过 `import` 导入后，可以改变一个全局变量的结构

### 全局变量

未完待续 。。。





## 感谢

-  [TypeScript 入门教程](https://ts.xcatliu.com/)
- [TS 官方文档中文](https://www.tslang.cn/docs/home.html)
- [阮一峰ECMAScript 6 入门](http://es6.ruanyifeng.com/)