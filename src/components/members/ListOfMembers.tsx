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
  const [congress, setCongress] = useState(117);
  const [chamber, setChamber] = useState('house');

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
  const getButtonStyle = (targetChamber: string) => {
    return chamber === targetChamber ? 'text-xl font-bold underline' : 'text-xl';
  };
  
  const handleCongressNum = (congressNum: number) => {
    setCongress(congressNum);
    fetchData(chamber);
  }

  const sortAlphabetically = (members: any) => {
    return [...members].sort((a, b) => (a.last_name > b.last_name) ? 1 : -1);
  }

  const sortPartyThenAlphabetically = (members: any) => {
    return [...members].sort((a, b) => {
      if (a.party === b.party) {
        return a.last_name.localeCompare(b.last_name);
      }
      return a.party.localeCompare(b.party);
    });
  }
  
  const sortStateThenAlphabetically = (members: any) => {
    return [...members].sort((a, b) => {
      if (a.state === b.state) {
        return a.last_name.localeCompare(b.last_name);
      }
      return a.state.localeCompare(b.state);
    });
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
    <div className="flex flex-col">
      <div className="flex flex-row border gap-3">
        <button onClick={() => {setOrder('alphabetical')}}>ALPHABETICAL</button>
        <button onClick={() => {setOrder('party')}}>PARTY</button>
        <button onClick={() => {setOrder('state')}}>STATE</button>
      </div>
      <div className="house-senate-buttons flex flex-row gap-4">
        <button onClick={handleHouse} className={getButtonStyle('house')}>HOUSE</button>
        <button onClick={handleSenate} className={getButtonStyle('senate')}>SENATE</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 font-bold text-lg w-2/3 border-b-2 border-black">
        <div>Name</div>
        <div>State</div>
        <div>Party</div>
      </div>

      <div className="divide-y divide-gray-200 w-2/3">
        {members.map((member) => (
          <div key={member.id}  className="member-item grid grid-cols-3 gap-4 py-2 " >
            <a href={`member/${member.id}`} className="">
              <h1 className="text-1xl font-bold">{member.first_name} {member.last_name}</h1>
            </a>
            <p>{getState(member.state)}</p>
            <p>{getParty(member.party)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOfMembers;