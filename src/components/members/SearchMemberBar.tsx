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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  return(
    <div className='w-60'>
      <input 
        type="text" 
        placeholder='Search Politician' 
        value={searchTerm} 
        onChange={handleChange}
        className='w-full px-1 rounded-sm border-2 border-gray-400 focus:outline-none focus:border-black'
      />
      {filteredMembers.length>0 && (
        <div className='search-results p-1 pt-0 overflow-y-scroll h-64 bg-secondary border border-black'>
          <ul>
            {filteredMembers.map((member) => (
              <li key={member.id + 'searchres'}>
                <a 
                  className="bill-sponsor flex flex-row gap-x-2 hover:cursor-pointer"
                  href={`member/${member.id}`}
                  
                >
                  
                {member.first_name} {member.last_name} ({member.state})
                </a>
              </li>
            ))}
          </ul>
        </div>
        )}
    </div>
  )
}

export default SearchMemberBar;