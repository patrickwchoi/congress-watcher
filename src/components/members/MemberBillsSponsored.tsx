import React, { useEffect, useState } from 'react';
import { MemberBillsCosponsoredData } from '@/types/MemberTypes';

const MemberBillsSponsored = ({ member_id }) => {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [bills, setBills] = useState([]);



  const fetchData = async (offset: number) => {
    try {
      const res = await fetch(`/api/members/getBillsByMember?member_id=${member_id}&type=introduced&offset=${offset}`);
      const json = await res.json();
      setData(json);
      console.log(data);
      setBills(json.results[0].bills);
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };

  useEffect(() => {
    fetchData(offset);
  }, [offset]);

  // Handlers
  const handleClick = () => {
    setOffset(prevOffset => prevOffset + 20);
  };

  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };

  const handleMemberPage = (sponsorId) => {
    window.open(`/member/${sponsorId}`, "_blank");
  };

  if (!data) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div>
      {bills.map((bill) => (
        <div key={bill.bill_id} className="bill-component flex flex-col m-4 p-2 border-2 border-black">
          <a className="bill-header flex flex-row justify-between border-b-2 border-gray-500" href={`/bill/${bill.bill_id}`}>
            <h1 className="text-1xl font-bold">{bill.number} - {bill.title}</h1>
            <p className="text-base">Introduced {bill.introduced_date}</p>
          </a>
          <div className="bill-content flex flex-col">
            <a className="bill-sponsor flex flex-row gap-x-2 hover:cursor-pointer" href={`./${bill.sponsor_id}`} target="_blank">
              <h3 className="text-1xl">Sponsor: {bill.sponsor_title} {bill.sponsor_name},</h3>
              <p className="text-base">{bill.sponsor_party} - {bill.sponsor_state}</p>
            </a>
            <div className="bill-status">
              <h3 className="text-1xl">Status: {bill.active ? "Active" : "Inactive"}</h3>
              <p className="text-base">{bill.latest_major_action}</p>
            </div>
            <div className="bill-summary">
              <p>{bill.summary}</p>
            </div>
            <button onClick={() => handleOpenLink(bill.congressdotgov_url)}>View on Congres.gov</button>
          </div>
        </div>
      ))}
      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default MemberBillsSponsored;
