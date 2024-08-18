import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TodoDetail(){
    const params = useParams();
    const [todo, setTodo] = useState();
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
          .then(response => response.json())
          .then(json => setTodo(json));
      }, [params.id]);
    return  todo?<ul>
        <li>{(todo.completed.toString())}</li>
        <li>{todo.title}</li>
        <li>{todo.userId}</li>
    </ul>:null;
}


