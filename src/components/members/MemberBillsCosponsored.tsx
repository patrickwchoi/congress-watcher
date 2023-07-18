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

  return(
    <div>
      {bills && bills.map((bill)=> (
        <div key={bill.bill_id}>
          <h3>{bill.title}</h3>
        </div>
      ))}
      <button onClick={handleClick}> Next </button>
    </div>
  )
}
export default MemberBillsCosponsored;