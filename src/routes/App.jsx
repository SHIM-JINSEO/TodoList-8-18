import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Search from "./Search.jsx";

function Checkbox({ element }) {
  const [checked, setChecked] = useState(element.completed);

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => {
        setChecked(!checked);
      }}
    />
  );
}

function TodoTable({ todos }) {
  return (
    <>
      {todos.map((element) => (
        <div className="grid" key={element.id}>
          <div className="completed">
            <Checkbox element={element} />
          </div>
          <div className="title">
            <Link to={`/${element.id}`}>{element.title}</Link>
          </div>
          <div className="userId">{element.userId}</div>
        </div>
      ))}
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const param = params.userId;
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
      });
  }, []);

  const newTodos = useMemo(() => {
    if (!param) return todos;
    return todos.filter((element) => element.userId === Number(param));
  }, [todos, param]);

  return (
    <>
      <Search
        navigate={(userId) => {
          if(!userId){
            navigate('/');
            return;
          }
          navigate(`/userId/${userId}`);
        }}
      ></Search>
      <div className="grid">
        <div className="completed">COMPLETED</div>
        <div className="title">TODO</div>
        <div className="userId">USERID</div>
      </div>
      <TodoTable todos={newTodos}></TodoTable>
    </>
  );
}

export default App;
