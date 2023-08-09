import type { GetServerSideProps } from "next";
import { SpecificBillData, AmendmentsData, RelatedBillData, CosponsorsData } from "@/types/BillTypes";
import BillPageInfo from "@/components/bills/BillPageInfo";
import Cosponsors from "@/components/bills/Cosponsors";

/**
 * @param bill_id - This is NOT just the bill number, this is billnum-congressnum 
 * @returns 
 */
interface BillPageProps {
  bill_id: string;
  billData: SpecificBillData;
  amendmentsData: AmendmentsData;
  cosponsorsData: CosponsorsData;
}
const BillPage: React.FC<BillPageProps> = ({bill_id, billData, amendmentsData, cosponsorsData}) => {

  return (
    <div>
      <BillPageInfo bill={billData.results[0]} />
      <div className="bill-bottom flex flex-row items-center">
        <div className="amendments-container w-1/2">
          {amendmentsData.results[0].amendments.length != 0 ? (
            <div className="amendments">
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
        </div>
        <Cosponsors cosponsors={cosponsorsData.results[0].cosponsors} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bill_id } = context.query; 
  if (typeof bill_id !== "string") {
    return {
      notFound: true, // this will return a 404 page
    };
  }
  const bill_num = bill_id.split("-")[0];
  const congress = bill_id.split("-")[1];
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }
  // let congress = '117'; //subject to change if i add functionality to view past bills before 117
  const billRes = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/bills/${bill_num}.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    },
  );
  const billData = await billRes.json();

  const amendmentsRes = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/bills/${bill_num}/amendments.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    }
  );
  const amendmentsData = await amendmentsRes.json()

  //gonna skip relatedbills bc doesnt usually show up

  const cosponsorsRes = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/bills/${bill_num}/cosponsors.json`,
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
