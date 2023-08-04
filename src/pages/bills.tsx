
import AllBills from "@/components/bills/AllBills";
import { GetServerSideProps } from "next";

const BillsPage = () => {

  return (
    <div className="w-4/5">
      <AllBills />
    </div>
  )
}

// const GetServerSideProps: GetServerSideProps = async () => {
//   if (!process.env.PROPUBLICA_API_KEY) {
//     throw new Error("PROPUBLICA_API_KEY must be defined");
//   }

//   const billsListRes = await fetch( //start with list of 117 House members
//     `https://api.propublica.org/congress/v1/bills/search.json`,
//     {
//       headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
//     },
//   );
//   const billsData = await billsListRes.json();
//   return {
//     props: {
//       billsData: billsData,
//     },
//   };
// }


export default BillsPage;