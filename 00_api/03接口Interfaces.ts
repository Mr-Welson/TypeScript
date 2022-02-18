// 1. 使用 interface 定义接口, 接口一般首字母大写
// 2. 定义的变量比接口少了一些属性是不允许的, 多一些属性也是不允许的
// 3. 变量赋值为某一个接口的时候，变量的形状必须和接口的形状保持一致
// 4. 接口可以定义可选属性 ? 

// 定义一个接口 Person
interface Person {
  name: string;
  age: number;
}

// 定义一个变量 tom，它的类型是 Person
// 比接口少了属性是不允许的
let tom: Person = {
  name: 'Tom',
  age: 25
};


// 可选属性
// 使用 ? 代表可选属性, 即该属性可以不存在, 但不允许添加未定义的属性
interface Person02 {
  name: string;
  age?: number;
}


// 任意属性: 可以添加未定义的属性，并可以指定属性值的类型
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

// 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性
// 如下: 简单理解为Person04定义了一个任意属性，其值为string类型。则Person04的所有属性都必须为string类型，而age为number类型，因此不通过 
interface Person04 {
  name: string;
  // age?: number;
  [propName: string]: string;
}


// 只读属性 readonly 
interface Person05 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

// 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
// 给对象person05赋值
let person05: Person05 = {
  id: 100,
  name: 'tom',
}
// id为只读, 不可修改
// person05.id = 90;
// 给对象person06赋值，未定义只读属性id
// let person06:Person05 = {
//   name: 'welson',
//   age: 2
// }
// id为只读, 不可修改
// person06.id = 1;


 