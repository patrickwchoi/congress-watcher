
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
    const res = await fetch(
      `/api/members/getVoteHistory?member_id=${member_id}&offset=${offset}`
    );
    const newVoteData = await res.json();
    setVotes(newVoteData.results[0].votes);
  }
  if (!votes) {
    <div>No Recent Votes</div>
  }
  return (
    <div>
      {votes && votes.map((vote) => (
        <div key={vote.vote_uri} className="border p-4 my-1 ">
          <div className='billheader flex flex-row'>
            <h2>{vote.bill.title}</h2>
          </div>

          <p>description: {vote.description}</p>
          <p>Vote position: {vote.position}  ({vote.date})</p>
          <div className='vote-breakdown flex flex-col border border-2'>
            <h3>Vote Breakdown:</h3>
            <p>yes: {vote.total.yes}</p>
            <p>no: {vote.total.no}</p>
            <p>present: {vote.total.present}</p>
            <p>not voting: {vote.total.not_voting}</p>
            <p>result: {vote.result}</p>
          </div>
          <a href={`../../bill/${vote.bill.bill_id}`}>View Bill</a>
        </div>
      ))}
      <button onClick={handleClick}>Next</button>
    </div>
  )
}

export default MemberVoteHistory;