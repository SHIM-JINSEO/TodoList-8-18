import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Search from "./Search.jsx";
import axios from "axios";

function Todo({ element, check, setTodo }) {
  return (
    <div className="grid" key={element.id}>
      <div className="completed">
        <input
          type="checkbox"
          checked={check}
          onChange={(event) => {
            setTodo();
          }}
        />
      </div>
      <div
        className="title"
        style={
          check
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        <Link to={`/${element.id}`}>{element.title}</Link>
      </div>
      <div className="userId">{element.userId}</div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const params = useParams();
  const [todos, setTodos] = useState([]);
  /* const [todos, setTodos] = useState([]);
  const [checks, setChecks] = useState([]); */
  const param = params.userId;
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTodos(res.data);
        /* console.log(res.data);
        const jsonOthers = [];
        const jsonCompleted = [];
        res.data.forEach(function (element) {
          let { completed, ...rest } = element;
          jsonOthers.push(rest);
          jsonCompleted.push(completed);
        });
        setTodos(jsonOthers);
        setChecks(jsonCompleted); */
      })
      .catch((err) => {
        console.error("error: ", err);
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
          if (!userId) {
            navigate("/");
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
      {newTodos.map((element) => {
        return (
          <Todo
            element={element}
            check={element.completed}
            setTodo={() => {
              const copyTodos = todos.map((element2) => {
                if (element.id === element2.id) {
                  let { completed, ...rest } = element2;
                  rest.completed = !completed;
                  return rest;
                } else {
                  return element2;
                }
              });
              setTodos(copyTodos);
            }}
          />
        );
      })}
    </>
  );
}

export default App;
