require("dotenv").config();
import { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import AllBills from "@/components/bills/AllBills";
import ListOfMembers from "@/components/members/ListOfMembers";
import { MemberListData } from '@/types/MemberTypes';

interface HomePageProps {
  memberListData: MemberListData;
}

const HomePage:React.FC<HomePageProps> = ({memberListData}) => {
  return (
    <div>
      <h1>home page</h1>
      <ListOfMembers memberListData={memberListData}/>
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

export default HomePage;
