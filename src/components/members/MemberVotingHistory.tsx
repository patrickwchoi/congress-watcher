
import {MemberVoteHistoryData} from '@/types/MemberTypes';
import React from 'react';
interface memberVoteHistoryProps {
  memberVoteHistoryData: MemberVoteHistoryData;
}
const memberVoteHistory: React.FC<memberVoteHistoryProps> = ({memberVoteHistoryData}) => {
  const votes = memberVoteHistoryData.results[0].votes;
  console.log(votes);
  return (
    <div>
      {votes && votes.map((vote) => (
        <div key={vote.vote_uri}>
          <h3>{vote.bill.title}</h3>
          <h4>break</h4>
        </div>
      ))}
    </div>
  )
}

export default memberVoteHistory;