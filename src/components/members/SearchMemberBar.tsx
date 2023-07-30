import React, {useState, useEffect} from 'react'
import { MemberListItemInfo } from '@/types/MemberTypes'

interface SearchMemberBarProps {
  allMembers: MemberListItemInfo[];
}

const SearchMemberBar: React.FC<SearchMemberBarProps> = ({allMembers}) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<MemberListItemInfo[]>([]);

  useEffect(() => {
    setFilteredMembers(allMembers.filter(member => member.first_name.includes(searchTerm) || member.last_name.includes(searchTerm) || member.state.includes(searchTerm)));
  }, [searchTerm]);

  return(
    <div>
      <input type="text" placeholder='Search Member'/>
      
      {filteredMembers.length>0 && (
        <div className='search-results'>
          <ul>
            {filteredMembers.map((member) => (
              <li key={member.id}>
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