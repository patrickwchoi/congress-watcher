import { useEffect, useState } from 'react';
import Bill from '@/components/Bill';
import { BillData } from '@/types/index';

const AllBills = () => {
  const [data, setData] = useState<BillData | null>(null);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/bills?query=${query}`);
      const json = await res.json();
      setData(json);
      // console.log(data.results[0].bills)
    };
    // https://api.propublica.org/congress/v1/bills/search.json?query=megahertz
    fetchData();
  }, [query]);

  return (
    <div className="flex flex-col bg-blue-100">
      <h1>Bills:</h1>
      {data && data.results[0].bills.map((bill) => (
        <Bill key={bill.bill_id} bill={bill}/>
      ))} 
    </div>
  )
}
export default AllBills;