import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BillData } from '@/types/index';

const BillPage = () => {
  const router = useRouter();
  const { bill_id } = router.query;
  // const [data, setData] = useState<BillData | null>(null);
  const [data, setData] = useState(null);

  const [congress, setCongress] = useState('118'); //fix with actual bill_id
  const [billNum, setBillNum] = useState('s2148');


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/bills/searchSpecificBill?congress=${congress}&bill_id=${billNum}`); //the url is what defines req in api page
      const json = await res.json();
      setData(json);
      console.log(json)
    };
    fetchData();
  }, [congress, billNum]);

  return (
    <div>
      <h1>Bill {bill_id}</h1>
        {data && 
          <div>
            <h1>{data.results[0].title}</h1>
          </div>
        }
    </div>
  )
}
export default BillPage;