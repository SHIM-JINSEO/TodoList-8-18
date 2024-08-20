import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../App.css';

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

export default function TodoDetail(){
    const params = useParams();
    const [todo, setTodo] = useState();
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
          .then(response => response.json())
          .then(json => setTodo(json));
      }, [params.id]);
    return  todo?<>
    <div className='grid'>
        <div className='completed'>COMPLETED</div>
        <div className='title'>TODO</div>
        <div className='userId'>USERID</div>
        
    </div>
    <div className="grid" key={todo.id}>
        <div className='completed'><Checkbox element={todo}/></div>
        <div className='title'>{todo.title}</div>
        <div className='userId'>{todo.userId}</div>
    </div>
      </>:null;
}


