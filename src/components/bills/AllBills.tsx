import { useEffect, useState } from 'react';
import Bill from '@/components/bills/Bill';
import BillSearchBar from '@/components/bills/BillSearchBar';
import { BillData } from '@/types/index';

// import { Bill } from '@/components/bills';

/**
 * AllBills component that fetches bills using searchQuery and renders them using Bill Component.
 * 
 * It maintains two pieces of state: 'data' for holding the fetched bill data, 
 * and 'searchQuery' to control the search query for fetching bills.
 *
 * It uses a useEffect to fetch the bill data whenever the 'searchQuery' state changes.
 * The fetched data is then stored in the 'data' state.
 * 
 * @returns {JSX.Element} The AllBills component.
 */

const AllBills = () => {
  const [data, setData] = useState<BillData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/bills?searchQuery=${searchQuery}&offset=${offset}`); //the url is what defines req in api page
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [searchQuery, offset]);

  return (
    <div className="flex flex-col bg-blue-100">
      <BillSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <h1>Bills:</h1>
      {data && data.results[0].bills.map((bill) => (
        <Bill key={bill.bill_id} bill={bill}/>
      ))} 
      <button onClick={() => setOffset(offset + 20)}>Next</button>
    </div>
  )
}
export default AllBills;