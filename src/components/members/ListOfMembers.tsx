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
  useEffect(() => {
    switch (order) {
      case 'alphabetical':
        
        break;
    
      default:
        break;
    } 
  }, [order])
  return(
    <div>
      <button onClick={handleSenate}>Senate</button>
      <button onClick={handleHouse}>House</button>
      {members.map((member) => (
        <div key={member.id}>
          {member.first_name} {member.last_name}
          id: {member.id}
        </div>
      ))}
    </div>
  )
}

export default ListOfMembers;