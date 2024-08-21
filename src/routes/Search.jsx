function Search({todos, setCurrentTodos}){
    return <>
     <form onSubmit={event=>{
        event.preventDefault();
        const userId = event.target.search.value;
        console.log(event.target.search.value);
        const newTodos = [];
        
        todos.forEach(element => {
         if(element.userId === Number(userId)){
            newTodos.push(element);
         }
        })
        if(event.target.search.value === ""){
         setCurrentTodos(todos);
        }
        else{
         setCurrentTodos(newTodos);
        }
        
     }}>
        <input type="text" name="search" placeholder="Enter UserId"></input>
        <input type="submit" value="search"></input>
     </form>
    </>
}
export default Search;