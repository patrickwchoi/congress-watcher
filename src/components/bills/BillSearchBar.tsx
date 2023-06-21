import React, {useState} from 'react'

const BillSearchBar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Search for a bill"
          onChange={handleChange}
          value={searchQuery}
        />
        <button>
          Search
        </button>
      </form>
    </div>
  )
}
export default BillSearchBar;