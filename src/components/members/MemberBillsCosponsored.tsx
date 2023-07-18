import React, { useState } from 'react'
import { MemberBillsCosponsoredData } from '@/types/MemberTypes'
/** 
 * Not sure if I want to use getServerSideProps here, instead of fetching it when I open the page.
 * Slows down memberId page bc it fetches data that it doesnt need to show yet.
*/
interface MemberBillProps{
  memberBillsCosponsoredData: MemberBillsCosponsoredData;
}
const MemberBillsCosponsored: React.FC<MemberBillProps> = ({memberBillsCosponsoredData}) => {
  const [bills, setBills] = useState(memberBillsCosponsoredData.results[0].bills)

  let offset = 0;
  const member_id = memberBillsCosponsoredData.results[0].id;
  const handleClick = async () => {
    offset += 20;
    const res = await fetch(
      `/api/members/getBillsCosponsored?member_id=${member_id}&offset=${offset}`
    );
    const newBillsData = await res.json();
    setBills(newBillsData.results[0].bills);
  };

  const handleOpenLink = (congressdotgov_url: string) => {
    window.open(congressdotgov_url, "_blank");
  };

  const handleMemberPage = (sponsor_id: string) => {
    window.open(`/member/${sponsor_id}`, "_blank");
  }

  return(
    <div>
      {bills && bills.map((bill)=> (
        <div key={bill.bill_id}>
              <div className="bill-component flex flex-col m-4 p-2 border-2 border-black">
      <a
        className="bill-header flex flex-row justify-between border-b-2 border-gray-500"
        href={`/bill/${bill.bill_id}`}
      >
        <h1 className="text-1xl font-bold">{bill.number} - {bill.title}</h1>
        <p className="text-base">Introduced {bill.introduced_date}</p>
      </a>

      <div className="bill-content flex flex-col">
        <a 
          className="bill-sponsor flex flex-row gap-x-2 hover:cursor-pointer"
          href={`./${bill.sponsor_id}`}
          target="_blank"
        >
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
        <button onClick={() => {handleOpenLink(bill.congressdotgov_url)}}>View on Congres.gov</button>
      </div>
    </div>
        </div>
      ))}
      <button onClick={handleClick}> Next </button>
    </div>
  )
}
export default MemberBillsCosponsored;