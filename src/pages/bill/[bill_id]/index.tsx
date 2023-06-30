import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SpecificBillData } from '@/types/index';

const BillPage = () => {
  const router = useRouter();
  const { bill_id } = router.query; //derived from the folder name [bill_id].tsx
  
  const [data, setData] = useState<SpecificBillData | null>(null);
  const [billNum, setBillNum] = useState('');
  const [congress, setCongress] = useState(''); 
  
  useEffect(() => { //sets our state only after we get bill_id
    if (bill_id && typeof bill_id === "string") {
      setBillNum(bill_id.split('-')[0]);
      setCongress(bill_id.split('-')[1]);
    }
  }, [bill_id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/bills/searchSpecificBill?congress=${congress}&bill_num=${billNum}`); //the url is what defines req in api page
      const json = await res.json();
      setData(json);
    }; 
    fetchData();
  }, [congress, billNum]);

  return (
    <div>
      <h1>Bill {bill_id}</h1>
        {data && data.results ? 
          <div>
            <h1>{data.results[0].title}</h1>
            
          </div> 
          :
          <h1>Cannot Find Bill</h1>
        }
    </div>
  )
}
export default BillPage;