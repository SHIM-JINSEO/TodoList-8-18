import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Search from "./Search.jsx";
import axios from "axios";

function TodoTable({ todos, checks, setChecks }) {
  return (
    <>
      {todos.map((element) => {
        return (
          <div className="grid" key={element.id}>
            <div className="completed">
              <input
                type="checkbox"
                checked={checks[element.id - 1]}
                onChange={(event) => {
                  const newChecks = checks.map((check, index) =>
                    index === element.id - 1 ? !check : check
                  );
                  setChecks(newChecks);
                }}
              />
            </div>
            <div
              className="title"
              style={
                checks[element.id - 1]
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
            >
              <Link to={`/${element.id}`}>{element.title}</Link>
            </div>
            <div className="userId">{element.userId}</div>
          </div>
        );
      })}
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const [checks, setChecks] = useState([]);
  const param = params.userId;
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        console.log(res.data);
        const jsonOthers = [];
        const jsonCompleted = [];
        res.data.forEach(function (element) {
          let { completed, ...rest } = element;
          jsonOthers.push(rest);
          jsonCompleted.push(completed);
        });
        setTodos(jsonOthers);
        setChecks(jsonCompleted);
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
      <TodoTable
        todos={newTodos}
        checks={checks}
        setChecks={setChecks}
      ></TodoTable>
    </>
  );
}

export default App;
