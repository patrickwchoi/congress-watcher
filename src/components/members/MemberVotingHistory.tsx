import { MemberVoteHistoryData, MemberVoteInfo } from '@/types/MemberTypes';
import React, { useState } from 'react';

interface memberVoteHistoryProps {
  memberVoteHistoryData: MemberVoteHistoryData;
}

const MemberVoteHistory: React.FC<memberVoteHistoryProps> = ({ memberVoteHistoryData }) => {
  const [votes, setVotes] = useState(memberVoteHistoryData.results[0].votes);

  let offset = 0;
  const member_id = memberVoteHistoryData.results[0].member_id;
  const handleClick = async () => {
    offset += 20;
    const res = await fetch(
      `/api/members/getVoteHistory?member_id=${member_id}&offset=${offset}`
    );
    const newVoteData = await res.json();
    setVotes(newVoteData.results[0].votes);
  };

  if (!votes) {
    return <div>No Recent Votes</div>;
  }

  // Organize votes by bill
  const votesByBill: { [billId: string]: MemberVoteInfo[] } = {};
  for (const vote of votes) {
    const billId = vote.bill.bill_id;
    if (votesByBill.hasOwnProperty(billId)) {
      votesByBill[billId].push(vote);
    } else {
      votesByBill[billId] = [vote];
    }
  }

  return (
    <div>
      {Object.entries(votesByBill).map(([billId, billVotes]) => (
        <div key={billId} className="border p-4 my-1">
          <div className="billheader flex flex-row">
            <h2>{billVotes[0].bill.title}</h2>
          </div>

          {billVotes.map((vote) => (
            <div key={vote.roll_call}>
              <p>description: {vote.description}</p>
              <p>Vote position: {vote.position} ({vote.date})</p>
              <div className="vote-breakdown flex flex-col border border-2">
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
        </div>
      ))}
      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default MemberVoteHistory;
