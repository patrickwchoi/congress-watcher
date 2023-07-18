require("dotenv").config();
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { SpecificMemberProps } from "@/types/MemberTypes";
import MemberBio from "@/components/members/MemberBio";
import MemberVotingHistory from "@/components/members/MemberVotingHistory";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const MemberPage: React.FC<SpecificMemberProps> = ({ memberData, memberVoteHistoryData, pictureData}) => {
  const [value, setValue] = useState("1"); //tab value
  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };
  const pages = pictureData.query.pages;
  const pageId = Object.keys(pages)[0];
  const imageUrl = pages[pageId].original?.source; // these 3 lines used to grab the url nested inside pictureData
  return (
    <div className="flex flex-col justify-center items-center w-2/3 mx-auto">
      <h2>member page</h2>
      <MemberBio memberInfo={memberData.results[0]} portraitUrl={imageUrl} />
      
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Voting History" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <MemberVotingHistory memberVoteHistoryData={memberVoteHistoryData} />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>

      
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { member_id } = context.query; //where is context.query coming from?
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }
  const memberRes = await fetch(
    `https://api.propublica.org/congress/v1/members/${member_id}.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    },
  );
  const memberData = await memberRes.json();

  const memberVoteHistoryRes = await fetch(
    `https://api.propublica.org/congress/v1/members/${member_id}/votes.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    }
  );
  const memberVoteHistoryData = await memberVoteHistoryRes.json()
  console.log(memberVoteHistoryData)

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
      memberVoteHistoryData,
      pictureData,

    },
  };
};

export default MemberPage;
