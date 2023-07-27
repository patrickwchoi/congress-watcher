import { useState } from "react";

const ListOfMembers = ({memberListData}) => {

  const members = memberListData.results[0].members;
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