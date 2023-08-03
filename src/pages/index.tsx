require("dotenv").config();
import { useEffect, useState } from "react";
import type { GetServerSideProps, GetStaticProps } from "next";
import AllBills from "@/components/bills/AllBills";
import ListOfMembers from "@/components/members/ListOfMembers";
import { MemberListData, MemberListItemInfo } from '@/types/MemberTypes';
import SearchMemberBar from "@/components/members/SearchMemberBar";
import { getUniqueMembers } from "@/utils/util";

interface HomePageProps {
  senateData: MemberListData;
  houseData: MemberListData;
}

/**
 * @param senateData
 * @param houseData
 * 
 * Senate and house data props are fetched during site buildup. Contains house and senate members of 117 congress.
 * Must be built up again to fetch new data after new election.
 */
const HomePage:React.FC<HomePageProps> = ({senateData, houseData}) => {
  return (
    <div className="flex flex-col w-4/5">
      <div className="pb-3">
        <h2>Politicians</h2>
      </div>
      <div className="flex flex-row justify-between">
        <ListOfMembers houseMemberListData={houseData}/>
        <SearchMemberBar allMembers={[...senateData.results[0].members, ...houseData.results[0].members]}/>
      </div>
      {/* <AllBills /> */}
    </div>
  );
};

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


  const uniqueSenateMembers = getUniqueMembers(senateData);
  const uniqueHouseMembers = getUniqueMembers(houseData);


  return {
    props: {
      //send in senateData and houseData with updated members list
      senateData: {...senateData, results: [{...senateData.results[0], members: uniqueSenateMembers}]},
      houseData: {...houseData, results: [{...houseData.results[0], members: uniqueHouseMembers}]},
    },
  };
}

export default HomePage;
