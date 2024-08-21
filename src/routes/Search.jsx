function Search({ todos, setCurrentTodos }) {
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (event.target.search.value === "") {
            setCurrentTodos(todos);
            return;
          }
          const userId = event.target.search.value;
          const newTodos = todos.filter(
            (element) => element.userId === Number(userId)
          );
          setCurrentTodos(newTodos);
        }}
      >
        <input type="text" name="search" placeholder="Enter UserId"></input>
        <input type="submit" value="search"></input>
      </form>
    </>
  );
}
export default Search;
