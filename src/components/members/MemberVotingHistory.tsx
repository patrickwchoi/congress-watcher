
import {MemberVoteHistoryData} from '@/types/MemberTypes';
import React, {useState} from 'react';

interface memberVoteHistoryProps {
  memberVoteHistoryData: MemberVoteHistoryData;
}
const MemberVoteHistory: React.FC<memberVoteHistoryProps> = ({memberVoteHistoryData}) => {
  // let votes = memberVoteHistoryData.results[0].votes;
  const [votes, setVotes] = useState(memberVoteHistoryData.results[0].votes);

  let offset = 0;
  const member_id = memberVoteHistoryData.results[0].member_id;
  const handleClick = async () => {
    offset+=20;
    //api call
    const res = await fetch(
      `/api/members/getVoteHistory?member_id=${member_id}&offset=${offset}`
    );
    const newVoteData = await res.json();
    setVotes(newVoteData.results[0].votes);
    console.log(votes);
  }
  return (
    <div>
      {votes && votes.map((vote) => (
        <div key={vote.vote_uri} className="border">
          <h3>{vote.bill.title}</h3>
          <h4>break</h4>
        </div>
      ))}
      <button onClick={handleClick}>Next</button>
    </div>
  )
}

export default MemberVoteHistory;