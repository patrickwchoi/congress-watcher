import React, { useEffect, useState } from 'react';
import { MemberBillsSponsoredData, MemberCosponsoredBillInfo } from '@/types/MemberTypes';
import MemberBillItem from '@/components/members/MemberBillItem'
/**
 * Fetches data after it is loaded
 */
interface MemberBillsSponsoredProps {
  memberBillsSponsoredData: MemberBillsSponsoredData;
}
const MemberBillsSponsored: React.FC<MemberBillsSponsoredProps> = ({ memberBillsSponsoredData }) => {
  const [data, setData] = useState<MemberBillsSponsoredData | null>(memberBillsSponsoredData);
  const [offset, setOffset] = useState(0);
  const [bills, setBills] = useState<MemberCosponsoredBillInfo[] | []>(memberBillsSponsoredData.results[0].bills);
  const member_id = memberBillsSponsoredData.results[0].id;
  let type = 'introduced';
  console.log('data', data);

  // Handlers
  const handleNext = async () => {
    const newOffset = offset + 20;
    const res = await fetch(
      `/api/members/getBillsSponsored?member_id=${member_id}&offset=${newOffset}&type=${type}`
      );
      const newBillsData = await res.json();
      console.log(newBillsData);
      setBills(newBillsData.results[0].bills);
      setOffset(newOffset);
  };
  const handleBack = async () => {
    const newOffset = offset - 20;
    const res = await fetch(
      `/api/members/getBillsSponsored?member_id=${member_id}&offset=${newOffset}&type=${type}`
      );
      const newBillsData = await res.json();
      console.log(newBillsData);
      setBills(newBillsData.results[0].bills);
      setOffset(newOffset);
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  if (!data) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div>
      {bills.map((bill) => (
        <MemberBillItem key={bill.bill_id} bill={bill}/>
      ))}

      <p>Viewing results {offset+1} - {offset+bills.length}</p>
      {(offset>0) && (<button onClick={handleBack}>Back</button>)}
      {(bills.length==20) && (<button onClick={handleNext}>Next</button>)}
    </div>
  );
};

export default MemberBillsSponsored;
