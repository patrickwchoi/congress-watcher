import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpecificBillData } from "@/types/BillTypes";
import BillPageInfo from "@/components/bills/BillPageInfo";

const BillPage = () => {
  const router = useRouter();
  const { bill_id } = router.query; //derived from the folder name [bill_id].tsx

  const [data, setData] = useState<SpecificBillData | null>(null);
  const [billNum, setBillNum] = useState("");
  const [congress, setCongress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //sets our state only after we get bill_id
    if (bill_id && typeof bill_id === "string") {
      setBillNum(bill_id.split("-")[0]);
      setCongress(bill_id.split("-")[1]);
    }
  }, [bill_id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/bills/searchSpecificBill?congress=${congress}&bill_num=${billNum}`
      ); //the url is what defines req in api page
      const json = await res.json();
      console.log('Received data from server:', json);
      setData(json);
      if (json.status === "OK") {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [congress, billNum]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      {
        data && data.results ? (
          <BillPageInfo bill={data.results[0]} />
        ) : (
          <h1>Cannot Find Bill</h1>
          //small bug where this will show for a split second before data is rendered, even with isLoading.
          //can be fixed by adding combining state, but wanted to keep it simple for now
          )
      }
    </div>
  );
};
export default BillPage;
