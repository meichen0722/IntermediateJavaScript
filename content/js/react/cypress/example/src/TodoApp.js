import React, { useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import './styles.scss'

/* eslint-disable jsx-a11y/accessible-emoji */

let idCounter = 1
const nextId = () => idCounter++

let initialTodos = [
  { id: nextId(), text: 'One' },
  { id: nextId(), text: 'Two' }
]

export const TodoApp = () => {
  const [todos, setTodos] = useState(initialTodos)
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    setTodos([...todos, { id: nextId(), text: newTodo }])
    setNewTodo('')
  }

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={e => {
            setNewTodo(e.target.value)
          }}
        />
        <button type="submit" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map(({ id, text }) => (
          <li key={id}>
            {text}
            <button
              data-test="delete-btn"
              onClick={() => {
                removeTodo(id)
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
