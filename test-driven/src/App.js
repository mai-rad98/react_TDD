import {useState,useEffect} from 'react'
import TodoList from './components/TodoList';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
        response.json()
      );
      setTodos(result.slice(0, 5));
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
      {<TodoList todos={todos} />}
    </div>
  );
}

export default App;

