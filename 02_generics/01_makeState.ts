// 泛型基础示例 https://ts.chibicode.com/generics
// 使用泛型创建只有一个参数的函数

// 创建 string 类型的 state
function makeStringState() {
  let state: string;
  function getState() {
    return state;
  }
  function setState(x: string) {
    state = x;
  }
  return { getState, setState };
}

// 创建 number 类型的 state
function makeNumberState() {
  let state: number;
  function getState() {
    return state;
  }
  function setState(x: number) {
    state = x;
  }
  return { getState, setState };
}

// 使用泛型创建 string 或 number 类型的 state。
// 存在一个问题： 可以创建 boolean 或其他类型的 state
function makeStringOrNumberState<S>() {
  let state: S;
  function getState() {
    return state;
  }
  function setState(x: S) {
    state = x;
  }
  return { getState, setState };
}

// 使用泛型创建参数类型只能是 number 或 string，切默认为 number
function makeStringOrNumberOnlyState<S extends number | string = number>() {
  let state: S;
  function getState() {
    return state;
  }
  function setState(x: S) {
    state = x;
  }
  return { getState, setState };
}

// 未指定类型, 默认 number 类型
const makeState = makeStringOrNumberOnlyState();
makeState.setState(1);
// 指定 number 类型
const numState = makeStringOrNumberOnlyState<number>();
numState.setState(1);
// 指定 string 类型
const strState = makeStringOrNumberOnlyState<string>();
strState.setState('a');

// 加一行 export {} 代码, 避免出现 "无法重新声明块范围变量 xxx" 的错误提示
export {};
