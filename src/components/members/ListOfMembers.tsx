import React, { useEffect, useState } from "react";
import { MemberListData, MemberListItemInfo } from '@/types/MemberTypes';

interface ListOfMembersProps {
  memberListData: MemberListData;
}
const ListOfMembers: React.FC<ListOfMembersProps> = ({memberListData}) => {
  const [data, setData] = useState(memberListData);
  const [members, setMembers] = useState<MemberListItemInfo[] | []>(memberListData.results[0].members)
  const [order, setOrder] = useState('alphabetical');
  const [congress, setCongress] = useState(117);
  const [chamber, setChamber] = useState('house');

  const fetchData = async () => {
    const res = await fetch(
      `/api/members/getMembers?congress=${congress}&chamber=${chamber}`,
    ); 
    const json = await res.json();
    await setData(json);
    console.log(data)
    setMembers(data.results[0].members);
  };

  const handleSenate =  () => {
    setChamber('senate');
    fetchData();
  }
  const handleHouse = () => {
    setChamber('house');
    fetchData();
  }
  const handleCongressNum = (congressNum: number) => {
    setCongress(congressNum);
    fetchData();
  }

  useEffect(() => {
    switch (order) {
      case 'alphabetical':
        const sortedMembersByAlpha = [...members].sort((a, b) => (a.last_name > b.last_name) ? 1 : -1);
        setMembers(sortedMembersByAlpha);
        break;
      case 'party':
        const sortedMembersByParty = [...members].sort((a, b) => (a.party > b.party) ? 1 : -1);
        console.log(sortedMembersByParty)
        setMembers(sortedMembersByParty);
        break;
      case 'state':
        const sortedMembersByState = [...members].sort((a, b) => (a.state > b.state) ? 1 : -1);
        setMembers(sortedMembersByState);
        break;
    } 
}, [order]);

  return(
    <div>
      <button onClick={handleSenate}>Senate</button>
      <button onClick={handleHouse}>House</button>
      <div className="flex flex-row border">
        <button onClick={() => {setOrder('alphabetical')}}>alphabetical</button>
        <button onClick={() => {setOrder('party')}}>party</button>
        <button onClick={() => {setOrder('state')}}>state</button>

      </div>
      {members.map((member) => (
        <div key={member.id}>
          {member.first_name} {member.last_name}
          id: {member.id}
          <p>{member.party}</p>
          <p>{member.state}</p>
        </div>
      ))}
    </div>
  )
}

export default ListOfMembers;