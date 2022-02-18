// 根据 https://ts.chibicode.com/todo/ 完成的demo

type Place = 'home' | 'work' | { custom: string };

type TodoItem = {
  id: number;
  text: string;
  done: boolean;
  place?: Place;
};

// 使用 readonly 来防止原有数据被修改
type Todo = Readonly<TodoItem>;

// 使用合并类型(&), 后定义的会覆盖前面的
type CompletedTodo = Todo & { done: true };

// 不好的例子: 改变了原有对象
const toggleTodo1 = (todo: TodoItem): TodoItem => {
  todo.done = !todo.done;
  return todo;
};

const toggleTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    done: !todo.done,
  };
};

// "readonly Todo[]" 用来表示 todos 这个数组本身是不可以修改的，比如 todos.push() 是不允许的
const completeAll = (todos: readonly Todo[]): CompletedTodo[] => {
  return todos.map((todo) => ({
    ...todo,
    done: true,
  }));
};

const placeToString = (place: Place): string => {
  if (place === 'home') {
    return 'home icon';
  } else if (place === 'work') {
    return 'work icon';
  } else {
    return 'custom icon';
  }
};

const todoItem: Todo = {
  id: 1,
  text: 'test',
  done: true,
};

const result = toggleTodo(todoItem);

console.log(result);
