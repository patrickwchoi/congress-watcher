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

  // const fetchData = async (offset: number) => {
  //   try {
  //     const res = await fetch(`/api/members/getBillsByMember?member_id=${member_id}&type=introduced&offset=${offset}`);
  //     const json = await res.json();
  //     setData(json);
  //     setBills(json.results[0].bills);
  //   } catch (error) {
  //     console.error("Error fetching the data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(offset);
  // }, [offset]);

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
      `/api/members/getBillsCosponsored?member_id=${member_id}&offset=${newOffset}&type=${type}`
      );
      const newBillsData = await res.json();
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
      {(offset>0) && (
        <button onClick={handleBack}>Back</button>
      )}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default MemberBillsSponsored;
