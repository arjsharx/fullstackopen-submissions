const FilterSearch = ({newSearch, onSearchChange}) => {
    return(
        <form>
        <div>
          filter shown with: <input value= {newSearch} onChange={onSearchChange}/>
        </div>
      </form>

    )
}
export default FilterSearch