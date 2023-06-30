import React, { useState } from "react";
interface BillSearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
/**
 *
 * @param searchQuery string that is used to search for bills. Will trigger useEffect to fetch new bills when updated.
 * @param setSearchQuery
 * @returns {JSX.Element} The SearchBar component.
 */
const BillSearchBar: React.FC<BillSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [searchBar, setSearchBar] = useState(""); //search bar state, will update searchQuery when user submitted
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchBar);
    setSearchBar("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a bill"
          onChange={handleChange}
          value={searchBar}
        />
        <button>Search</button>
      </form>
    </div>
  );
};
export default BillSearchBar;
