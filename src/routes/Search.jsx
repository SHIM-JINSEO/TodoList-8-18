function Search({navigate}) {
  
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate(event.target.search.value);
        }}
      >
        <input type="text" name="search" placeholder="Enter UserId"></input>
        <input type="submit" value="search"></input>
      </form>
    </>
  );
}
export default Search;
