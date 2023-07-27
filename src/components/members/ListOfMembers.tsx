import React, { useState } from "react";
import { MemberListData, MemberListItemInfo } from '@/types/MemberTypes';

interface ListOfMembersProps {
  memberListData: MemberListData;
}
const ListOfMembers: React.FC<ListOfMembersProps> = ({memberListData}) => {
  const [members, setMembers] = useState<MemberListItemInfo[] | []>(memberListData.results[0].members)
  
  return(
    <div>
      {members.map((member) => (
        <div key={member.id}>
          {member.first_name} {member.last_name}
        </div>
      ))}
    </div>
  )
}

export default ListOfMembers;