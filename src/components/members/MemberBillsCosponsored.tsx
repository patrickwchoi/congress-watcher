import React, { useState, useEffect } from 'react'
import { MemberBillsCosponsoredData, MemberCosponsoredBillInfo } from '@/types/MemberTypes'
import MemberBillItem from '@/components/members/MemberBillItem'

/** 
 * Not sure if I want to use getServerSideProps here, instead of fetching it when I open the page.
 * Slows down member_id page bc it fetches data that it doesnt need to show yet.
*/
interface MemberBillProps{
  member_id: number;
}
const MemberBillsCosponsored: React.FC<MemberBillProps> = ({member_id}) => {
  const [data, setData] = useState<MemberBillsCosponsoredData|null>(null);
  const [offset, setOffset] = useState(0);
  const [bills, setBills] = useState<MemberCosponsoredBillInfo[]|[]>([]);

  const fetchData = async (offset: number) => {
    try {
      const res = await fetch(
        `/api/members/getBillsCosponsored?member_id=${member_id}&offset=${offset}`
      );
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

  const handleClick = async () => {
    setOffset(offset+20);
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

  if (!data) {
    return <h2>Fetching data...</h2>;
  }
  return(
    <div>
      {bills && bills.map((bill)=> (
        <MemberBillItem key={bill.bill_id} bill={bill}/>
      ))}
      <button onClick={handleClick}> Next </button>
    </div>
  )
}
export default MemberBillsCosponsored;