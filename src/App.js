
import { useEffect, useState } from 'react';
import './App.css';

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

function TodoTable({todos, setTodos}){
  
  return <>
    {todos.map(element=>(
      <div className="grid" key={element.id}>
        <div className='completed'><Checkbox element={element}/></div>
        <div className='title' /*style={element.completed?{textDecoration:'line-through'}:{}}*/>{element.title}</div>
        <div className='userId'>{element.userId}</div>
        
      </div>
    ))}
  </>
}

function App() {
const [todos, setTodos] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setTodos(json));
  }, []);

  return (
    <>
      <div className='grid'>
        <div className='completed'>COMPLETED</div>
        <div className='title'>TODO</div>
        <div className='userId'>USERID</div>
        
      </div>
      <TodoTable todos={todos} setTodos={setTodos}></TodoTable>
    </>
  );
}

export default App;
