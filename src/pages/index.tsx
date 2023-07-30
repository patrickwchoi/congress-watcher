require("dotenv").config();
import { useEffect, useState } from "react";
import type { GetServerSideProps, GetStaticProps } from "next";
import AllBills from "@/components/bills/AllBills";
import ListOfMembers from "@/components/members/ListOfMembers";
import { MemberListData } from '@/types/MemberTypes';
import SearchMemberBar from "@/components/members/SearchMemberBar";
interface HomePageProps {
  memberListData: MemberListData;
}

const HomePage:React.FC<HomePageProps> = ({memberListData}) => {
  return (
    <div>
      <h1>home page</h1>
      <ListOfMembers memberListData={memberListData}/>
      {/* <SearchMemberBar allMembers={allMembers}/> */}
      <AllBills />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }

  const memberListRes = await fetch( //start with list of 117 House members
    `https://api.propublica.org/congress/v1/117/house/members.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    },
  );
  const memberListData = await memberListRes.json();

  return {
    props: {
      memberListData,
    }
  }
}

// export const getStaticProps:GetStaticProps = async () =>  { //runs only during site buildup
//   const senateData = await fetch(`/api/members/getMembers?congress=117&chamber=senate`).then(res => res.json());
//   const houseData = await fetch(`/api/members/getMembers?congress=117&chamber=house`).then(res => res.json());
  
//   return {
//     props: {
//       allMembers: [...senateData.results[0].members, ...houseData.results[0].members],
//     },
//   };
// }

export default HomePage;
