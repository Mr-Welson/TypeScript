// 在 02_makePair 的基础上, 抽取类型以复用

// 使用 interface 定义类型
interface Pair<F, S> {
  first: F;
  second: S;
}

// 使用 type 定义类型。作用同上
type Pair1<F, S> = {
  first: F;
  second: S;
};

function makePair<F, S>() {
  let pair: Pair<F, S>;

  function getPair() {
    return pair;
  }

  function setPair(x: F, y: S) {
    return {
      first: x,
      second: y,
    };
  }

  return { getPair, setPair };
}

export {};
