import { useEffect, useState } from "react";
import BillItem from "@/components/bills/BillItem";
import BillSearchBar from "@/components/bills/BillSearchBar";
import { SearchBillData } from "@/types/BillTypes";

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

//when I have time, reconfigure this so it fetches from server side
const AllBills = () => {
  const [data, setData] = useState<SearchBillData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0); //must be multiple of 20
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/bills/searchBills?searchQuery=${searchQuery}&offset=${offset}`,
      ); //the url is what defines req in api page
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [searchQuery, offset]);

  return (
    <div className="flex flex-col ">
      <div className="flex flex-row items-center justify-between">
        <h2>Bills:</h2>
        <BillSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          />
      </div>
      {data &&
        data.results[0].bills.map((bill) => (
          <BillItem key={bill.bill_id} bill={bill} />
        ))}
      <button onClick={() => setOffset(offset + 20)}>Next</button>
    </div>
  );
};
export default AllBills;
