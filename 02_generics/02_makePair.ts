// 使用泛型创建有多个参数的函数

// 存储2个值, 分别指定2个参数的类型
function makePair() {
  let pair: { first: number; second: number };
  function getPair() {
    return pair;
  }
  function setPair(x: number, y: number) {
    pair = {
      first: x,
      second: y,
    };
  }
  return { getPair, setPair };
}

const { getPair, setPair } = makePair();
setPair(1, 2);

// 使用泛型来代表参数类型
function makePair1<F, S>() {
  let pair: { first: F; second: S };
  function getPair1() {
    return pair;
  }
  function setPair1(x: F, y: S) {
    pair = {
      first: x,
      second: y,
    };
  }
  return { getPair1, setPair1 };
}

const { getPair1, setPair1 } = makePair1<number, string>();
setPair1(1, 'a');

// 使用 extends 来指定参数类型
function makePair2<F extends number | string, S extends number | string>() {
  let pair: { first: F; second: S };
  function getPair2() {
    return pair;
  }
  function setPair2(x: F, y: S) {
    pair = {
      first: x,
      second: y,
    };
  }
  return { getPair2, setPair2 };
}
const { getPair2, setPair2 } = makePair2<number, string>();
setPair2(1, 'a');

export {};
