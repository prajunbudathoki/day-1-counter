import React, { useReducer, useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'remove'; id: number };

const initialState: Todo[] = [];

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'remove':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error('Unknown action type');
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState<string>('');

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (text.trim()) {
            dispatch({ type: 'add', text });
            setText('');
          }
        }}
      >
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {state.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => dispatch({ type: 'toggle', id: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'remove', id: todo.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;