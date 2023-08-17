import React, { useEffect, useState } from "react";
import { MemberListData, MemberListItemInfo } from '@/types/MemberTypes';
import {getState, getParty, getUniqueMembers} from '@/utils/util'

interface ListOfMembersProps {
  houseMemberListData: MemberListData;
}
/**
 * 
 * @param houseMemberListData - starts with member data for the House of Reps. in congress 117
 * @returns 
 */
const ListOfMembers: React.FC<ListOfMembersProps> = ({houseMemberListData}) => {
  // const [data, setData] = useState(houseMemberListData); 
  const [members, setMembers] = useState<MemberListItemInfo[] | []>(getUniqueMembers(houseMemberListData))
  const [order, setOrder] = useState('alphabetical');
  const [congress, setCongress] = useState(118);
  const [chamber, setChamber] = useState('house');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const fetchData = async (targetChamber: string) => {
    const res = await fetch(
      `/api/members/getMembers?congress=${congress}&chamber=${targetChamber}`,
    ); 
    const json = await res.json();
    // await setData(json);
    setMembers(getUniqueMembers(json));
  };

  const handleSenate =  () => {
    setChamber('senate');
    fetchData('senate');
  }
  const handleHouse = () => {
    setChamber('house');
    fetchData('house');
  }
  const getChamberButtonStyle = (targetChamber: string) => {
    return chamber === targetChamber ? 'text-xl font-bold underline' : 'text-xl hover:bg-primary-hover';
  };
  const getOrderButtonStyle = (targetOrder: string) => {
    return order === targetOrder ? 'text-l font-bold underline' : 'text-l hover:bg-primary-hover';
  };
  
  const handleCongressNum = (congressNum: number) => {
    setCongress(congressNum);
    fetchData(chamber);
  }
  const sortAlphabetically = (members: any) => {
    let sortedMembers = [...members].sort((a, b) => a.last_name.localeCompare(b.last_name));
    return sortDirection === 'desc' ? sortedMembers.reverse() : sortedMembers;
}

const sortPartyThenAlphabetically = (members: any) => {
    let sortedMembers = [...members].sort((a, b) => {
        if (a.party === b.party) {
            return a.last_name.localeCompare(b.last_name);
        }
        return a.party.localeCompare(b.party);
    });
    return sortDirection === 'desc' ? sortedMembers.reverse() : sortedMembers;
}

  const sortStateThenAlphabetically = (members: any) => {
    let sortedMembers = [...members].sort((a, b) => {
        if (a.state === b.state) {
            return a.last_name.localeCompare(b.last_name);
        }
        return a.state.localeCompare(b.state);
    });
    return sortDirection === 'desc' ? sortedMembers.reverse() : sortedMembers;
  }


  useEffect(() => {
    switch (order) {
      case 'alphabetical':
        setMembers(sortAlphabetically(members));
        break;
      case 'party':
        setMembers(sortPartyThenAlphabetically(members));
        break;
      case 'state':
        setMembers(sortStateThenAlphabetically(members));
        break;
    } 
}, [order]);

  return(
    <div className="flex flex-col w-2/3">
      <div className="flex flex-row gap-3 justify-between">
        <div className="house-senate-buttons flex flex-row gap-4">
          <button onClick={handleHouse} className={getChamberButtonStyle('house')}>HOUSE</button>
          <button onClick={handleSenate} className={getChamberButtonStyle('senate')}>SENATE</button>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <h4>SORT BY:</h4>
          <button onClick={() => {setOrder('alphabetical')}} className={getOrderButtonStyle('alphabetical')}>ALPHABETICAL</button>
          <button onClick={() => {setOrder('party')}} className={getOrderButtonStyle('party')}>PARTY</button>
          <button onClick={() => {setOrder('state')}} className={getOrderButtonStyle('state')}>STATE</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 my-4 font-bold text-lg  border-b-2 border-black">
        <div>Name</div>
        <div>State</div>
        <div>Party</div>
        <div>Phone</div>
      </div>

      <div className="divide-y divide-gray-300 w-11/12">
        {members.map((member) => (
          <div key={member.id}  className="member-item grid grid-cols-4 gap-4 py-2 " >
            <a href={`member/${member.id}`} className="">
              <h3 className="politician-link">{member.first_name} {member.last_name}</h3>
            </a>
            <p>{getState(member.state)}</p>
            <p>{getParty(member.party)}</p>
            <p>{member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOfMembers;