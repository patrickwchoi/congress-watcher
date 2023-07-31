import React, {useState, useEffect} from 'react'
import { MemberListItemInfo } from '@/types/MemberTypes'

interface SearchMemberBarProps {
  allMembers: MemberListItemInfo[];
}

const SearchMemberBar: React.FC<SearchMemberBarProps> = ({allMembers}) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<MemberListItemInfo[]>([]);

  useEffect(() => {
    if (searchTerm.length < 1) {
      setFilteredMembers([]);
      return;
    }
    const trimmedSearchTerm = searchTerm.trim()
    setFilteredMembers(allMembers.filter(member => 
      member.first_name.toLowerCase().includes(trimmedSearchTerm.toLowerCase()) || 
      member.last_name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
    ));
  }, [searchTerm]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  return(
    <div className='bg-red-100'>
      <input 
        type="text" 
        placeholder='Search Member' 
        value={searchTerm} 
        onChange={handleChange}
      />
      {filteredMembers.length>0 && (
        <div className='search-results'>
          <ul>
            {filteredMembers.map((member) => (
              <li key={member.id + 'searchres'}>
                {member.first_name} {member.last_name}
              </li>
            ))}
          </ul>
        </div>
        )}
    </div>
  )
}

export default SearchMemberBar;