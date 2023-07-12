require("dotenv").config();
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { SpecificMemberProps } from "@/types/MemberTypes";
import Image from "next/image";
import MemberBio from "@/components/members/MemberBio";

const MemberPage: React.FC<SpecificMemberProps> = ({ memberData, pictureData}) => {
  const pages = pictureData.query.pages;
  const pageId = Object.keys(pages)[0];
  const imageUrl = pages[pageId].original?.source; // these 3 lines used to grab the url nested inside pictureData
  console.log(pages[pageId])
  return (
    <div className="flex flex-col items-center">
      <h2>member page</h2>
      <MemberBio memberInfo={memberData.results[0]} portraitUrl={imageUrl} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { member_id } = context.query; //where is context.query coming from?
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }
  const MemberRes = await fetch(
    `https://api.propublica.org/congress/v1/members/${member_id}.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    },
  );
  const memberData = await MemberRes.json();

  //fetch using wiki API to get politician's main wiki picture using their fullname
  const firstname = memberData.results[0].first_name
  const lastname = memberData.results[0].last_name
  const fullname = memberData.results[0].first_name + "_" + memberData.results[0].last_name;
  
  const wikiSearchRes = await fetch( //data includes list of wikiarticles based on query
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${firstname}%20${lastname}%20%politician&format=json`
  )
  const wikiSearchData = await wikiSearchRes.json();
  const wikiTitle = wikiSearchData.query.search[0].title;
  const pictureRes = await fetch(
    `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${wikiTitle}`,
  );
  const pictureData = await pictureRes.json();

  return {
    props: {
      memberData,
      pictureData,
      
    },
  };
};

export default MemberPage;
