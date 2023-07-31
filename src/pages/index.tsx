require("dotenv").config();
import { useEffect, useState } from "react";
import type { GetServerSideProps, GetStaticProps } from "next";
import AllBills from "@/components/bills/AllBills";
import ListOfMembers from "@/components/members/ListOfMembers";
import { MemberListData, MemberListItemInfo } from '@/types/MemberTypes';
import SearchMemberBar from "@/components/members/SearchMemberBar";
interface HomePageProps {
  senateData: MemberListData;
  houseData: MemberListData;
}

const HomePage:React.FC<HomePageProps> = ({senateData, houseData}) => {
  return (
    <div>
      <h1>home page</h1>
      <SearchMemberBar allMembers={[...senateData.results[0].members, ...houseData.results[0].members]}/>
      <ListOfMembers memberListData={houseData}/>
      <AllBills />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   if (!process.env.PROPUBLICA_API_KEY) {
//     throw new Error("PROPUBLICA_API_KEY must be defined");
//   }

//   const memberListRes = await fetch( //start with list of 117 House members
//     `https://api.propublica.org/congress/v1/117/house/members.json`,
//     {
//       headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
//     },
//   );
//   const memberListData = await memberListRes.json();

//   return {
//     props: {
//       memberListData,
//     }
//   }
// }

export const getStaticProps:GetStaticProps = async () =>  { //runs only during site buildup
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }

  const senateListRes = await fetch( //start with list of 117 House members
    `https://api.propublica.org/congress/v1/117/senate/members.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    },
  );
  const senateData = await senateListRes.json();
  const houseListRes = await fetch( //start with list of 117 House members
    `https://api.propublica.org/congress/v1/117/house/members.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    },
  );
  const houseData = await houseListRes.json();


  const uniqueSenateMembers = [...new Set((senateData.results[0] as { members: MemberListItemInfo[] }).members.map(member => member.id))].map(id => {
    return (senateData.results[0] as { members: MemberListItemInfo[] }).members.find(member => member.id === id);
});

const uniqueHouseMembers = [...new Set((houseData.results[0] as { members: MemberListItemInfo[] }).members.map(member => member.id))].map(id => {
    return (houseData.results[0] as { members: MemberListItemInfo[] }).members.find(member => member.id === id);
});

  return {
    props: {
      //send in senateData and houseData with updated members list
      senateData: {...senateData, results: [{...senateData.results[0], members: uniqueSenateMembers}]},
      houseData: {...houseData, results: [{...houseData.results[0], members: uniqueHouseMembers}]},
      // allMembers: [...senateData.results[0].members, ...houseData.results[0].members],
    },
  };
}

export default HomePage;
