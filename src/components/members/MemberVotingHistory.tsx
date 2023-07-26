import { MemberVoteHistoryData, MemberVoteInfo } from '@/types/MemberTypes';
import React, { useState, useEffect } from 'react';

interface memberVoteHistoryProps {
  member_id: number;
}

const MemberVoteHistory: React.FC<memberVoteHistoryProps> = ({ member_id }) => {
  const [data, setData] = useState<MemberVoteHistoryData | null>(null)
  const [votes, setVotes] = useState<MemberVoteInfo[] | []>([]);
  const [offset, setOffset] = useState(0); //add type here

  const fetchData = async (offset: number) => {
    try {
      const res = await fetch(
        `/api/members/getVoteHistory?member_id=${member_id}&offset=${offset}`
      );
      const json = await res.json();
      setData(json);
      setVotes(json.results[0].votes);
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };

  useEffect(() => {
    fetchData(offset);
  }, []);
  
  const handleNext = async () => {
    const newOffset = offset + 20
    const res = await fetch(
      `/api/members/getVoteHistory?member_id=${member_id}&offset=${newOffset}`
    );
    const newVoteData = await res.json();
    setVotes(newVoteData.results[0].votes);
    setOffset(newOffset);
  };
  const handleBack = async () => {
    const newOffset = offset - 20
    const res = await fetch(
      `/api/members/getVoteHistory?member_id=${member_id}&offset=${newOffset}`
    );
    const newVoteData = await res.json();
    setVotes(newVoteData.results[0].votes);
    setOffset(newOffset);
  };

  if (!data) {
    return <div>No Recent Votes</div>;
  }

  // Organize votes by bill in an obj
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
      
      <p>Viewing results {offset+1} - {offset+votes.length}</p>
      {(offset>0 && (<button onClick={handleBack}>Back</button>))}
      {(votes.length==20) && (<button onClick={handleNext}>Next</button>)}
    </div>
  );
};

export default MemberVoteHistory;
