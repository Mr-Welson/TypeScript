// 将 01_makeState function 改造成 class

class State<T> {
  state: T;

  getState() {
    return this.state;
  }

  setState(x: T) {
    this.state = x;
  }
}

const numState = new State<number>();
numState.setState(1);

export {};
