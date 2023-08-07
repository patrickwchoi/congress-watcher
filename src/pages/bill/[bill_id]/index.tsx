import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import { SpecificBillData, AmendmentsData, RelatedBillData, CosponsorsData } from "@/types/BillTypes";
import BillPageInfo from "@/components/bills/BillPageInfo";
import Cosponsors from "@/components/bills/Cosponsors";

const BillPage = ({bill_id, billData, amendmentsData, cosponsorsData}) => {
  // const router = useRouter();
  // const { bill_id } = router.query; //derived from the folder name [bill_id].tsx

  // const [billData, setBillData] = useState<SpecificBillData | null>(null);
  // const [amendmentsData, setAmendmentsData] = useState<AmendmentsData | null>(
  //   null,
  // );
  // const [relatedBillsData, setRelatedBillsData] =
  //   useState<RelatedBillData | null>(null);
  // const [cosponsorsData, setCosponsorsData] = useState<CosponsorsData | null>(
  //   null,
  // );

  // const [billNum, setBillNum] = useState("");
  // const [congress, setCongress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   //sets our state only after we get bill_id
  //   if (bill_id && typeof bill_id === "string") {
  //     setBillNum(bill_id.split("-")[0]);
  //     setCongress(bill_id.split("-")[1]);
  //   }
  // }, [bill_id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const billRes = await fetch(
  //       `/api/bills/searchSpecificBill?congress=${congress}&bill_num=${billNum}`,
  //     ); //the url is what defines req in api page
  //     const billJson = await billRes.json();
  //     console.log("Received data from server:", billJson);
  //     setBillData(billJson);

  //     const amendmentsRes = await fetch(
  //       `/api/bills/billAmendments?congress=${congress}&bill_num=${billNum}`,
  //     );
  //     const amendmentsJson = await amendmentsRes.json();
  //     console.log("Received amendments data from server:", amendmentsJson);
  //     setAmendmentsData(amendmentsJson);

  //     const relatedBillsRes = await fetch(
  //       `/api/bills/relatedBills?congress=${congress}&bill_num=${billNum}`,
  //     );
  //     const relatedBillsJson = await relatedBillsRes.json();
  //     console.log("Received related bills data from server:", relatedBillsJson);
  //     setRelatedBillsData(relatedBillsJson);

  //     const cosponsorsRes = await fetch(
  //       `/api/bills/billCosponsors?congress=${congress}&bill_num=${billNum}`,
  //     );
  //     const cosponsorsJson = await cosponsorsRes.json();
  //     console.log("Received cosponsors data from server:", cosponsorsJson);
  //     setCosponsorsData(cosponsorsJson);

  //     if (billJson.status === "OK") {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [congress, billNum]);

  // if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      {billData && billData.results ? (
        <BillPageInfo bill={billData.results[0]} />
      ) : (
        <h1>Cannot Find Bill</h1>
      )}

      {amendmentsData &&
      amendmentsData.results &&
      amendmentsData.results[0].amendments.length != 0 ? (
        <div>
          <h1>Amendments</h1>
          <ul>
            {amendmentsData.results[0].amendments.map((amendment) => (
              <li key={amendment.amendment_number}>
                <a href={amendment.congressdotgov_url}>{amendment.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>No amendments</h1>
      )}

      {/* {relatedBillsData && relatedBillsData.results.related_bills ? (
        <div>
          <h1>Related Bills</h1>
          <ul>
            {relatedBillsData.results.related_bills.map((bill) => (
              <li key={bill.bill_id}>
                <a>{bill.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>No related bills</h1>
      )} */}

      {/* TODO: make button so it shows max 5 cosponsors unless button is pressed */}
      {cosponsorsData &&
      cosponsorsData.results &&
      cosponsorsData.results[0].cosponsors ? (
        <Cosponsors cosponsors={cosponsorsData.results[0].cosponsors} />
      ) : (
        <h1>No cosponsors</h1>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bill_id } = context.query; 
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }
  let congress = '117'; //subject to change if i add functionality to view past bills before 117
  const billRes = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/bills/${bill_id}.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    },
  );
  const billData = await billRes.json();

  const amendmentsRes = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/bills/${bill_id}/amendments.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    }
  );
  const amendmentsData = await amendmentsRes.json()

  //gonna skip relatedbills bc doesnt usually show up

  const cosponsorsRes = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/bills/${bill_id}/cosponsors.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    }
  );
  const cosponsorsData = await cosponsorsRes.json()

  return {
    props: {
      bill_id,
      billData,
      amendmentsData,
      cosponsorsData,
    },
  };
};


export default BillPage;
