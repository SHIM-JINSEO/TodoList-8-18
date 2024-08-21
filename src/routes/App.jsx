
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import Search from './Search.jsx';

function Checkbox({element}){
  const [checked, setChecked] = useState(element.completed);

  return <input 
            type='checkbox'
            checked={checked}
            onChange={(event)=>{
              setChecked(!checked);
            }}
  />
}


function TodoTable({todos}){
  
  return <>
    {todos.map(element=>(
      <div className="grid" key={element.id}>
        <div className='completed'><Checkbox element={element}/></div>
        <div className='title'><Link to={`/${element.id}`}>{element.title}</Link></div>
        <div className='userId'>{element.userId}</div>
        
      </div>
    ))}
  </>
}

function App() {
const [todos, setTodos] = useState([]);
const [currentTodos, setCurrentTodos] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setTodos(json)
        setCurrentTodos(json)
      });
  }, []);

  return (
    <>
      <Search todos={todos} setCurrentTodos={setCurrentTodos}></Search>
      <div className='grid'>
        <div className='completed'>COMPLETED</div>
        <div className='title'>TODO</div>
        <div className='userId'>USERID</div>
        
      </div>
      <TodoTable todos={currentTodos}></TodoTable>
    </>
  );
}

export default App;
