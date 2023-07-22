import React, { useEffect, useState } from 'react';
import { MemberBillsSponsoredData, MemberCosponsoredBillInfo } from '@/types/MemberTypes';
import MemberBillItem from '@/components/members/MemberBillItem'
/**
 * Fetches data after it is loaded
 */
interface MemberBillsSponsoredProps {
  member_id: number;
}
const MemberBillsSponsored: React.FC<MemberBillsSponsoredProps> = ({ member_id }) => {
  const [data, setData] = useState<MemberBillsSponsoredData | null>(null);
  const [offset, setOffset] = useState(0);
  const [bills, setBills] = useState<MemberCosponsoredBillInfo[] | []>([]);

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
      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default MemberBillsSponsored;
