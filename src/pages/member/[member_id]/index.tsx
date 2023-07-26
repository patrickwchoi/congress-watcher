require("dotenv").config();
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { SpecificMemberProps } from "@/types/MemberTypes";
import MemberBio from "@/components/members/MemberBio";
import MemberVotingHistory from "@/components/members/MemberVotingHistory";
import MemberBillsCosponsored from "@/components/members/MemberBillsCosponsored";
import MemberBillsSponsored from "@/components/members/MemberBillsSponsored"

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const tabStyles = {
  "& .MuiTab-root": {
    textTransform: "capitalize",
    color: "grey",
  },
  "& .Mui-selected": {
    opacity: 1,
    color: "black !important",
    fontWeight: "bold",
    borderBottom: "2px solid #000",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
};

const MemberPage: React.FC<SpecificMemberProps> = ({ member_id, memberData, memberVoteHistoryData, pictureData, memberBillsSponsoredData}) => {
  const [value, setValue] = useState("1"); //tab value
  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };
  const pages = pictureData.query.pages;
  const pageId = Object.keys(pages)[0];
  const imageUrl = pages[pageId].original?.source; // these 3 lines used to grab the url nested inside pictureData
  return (
    <div className="flex flex-col justify-center items-center w-4/5 mx-auto">
      <h2>member page</h2>
      <MemberBio memberInfo={memberData.results[0]} portraitUrl={imageUrl} />
      
      <Box sx={{ width: '100%', }}>
        <TabContext value={value}>
          <Box>
            <TabList 
              onChange={handleChange} 
              centered={true} 
              sx={tabStyles}
            >
              <Tab label="Voting History" value="1" />
              <Tab label="Bills Cosponsored" value="2" />
              <Tab label="Bills Sponsored" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <MemberVotingHistory member_id={member_id} />
          </TabPanel>
          <TabPanel value="2">
            <MemberBillsCosponsored member_id={member_id}/>
          </TabPanel>
          <TabPanel value="3">
            <MemberBillsSponsored memberBillsSponsoredData={memberBillsSponsoredData}/>
          </TabPanel>
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

  // const memberBillsCosponsoredRes = await fetch(
  //   `https://api.propublica.org/congress/v1/members/${member_id}/bills/cosponsored.json`,
  //   {
  //     headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
  //   }
  // );
  // const memberBillsCosponsoredData = await memberBillsCosponsoredRes.json()

  const memberBillsSponsoredRes = await fetch(
    `https://api.propublica.org/congress/v1/members/${member_id}/bills/introduced.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    }
  );
  const memberBillsSponsoredData = await memberBillsSponsoredRes.json()

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

  const memberVoteHistoryRes = await fetch(
    `https://api.propublica.org/congress/v1/members/${member_id}/votes.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    }
  );
  const memberVoteHistoryData = await memberVoteHistoryRes.json()


  return {
    props: {
      member_id,
      memberData,
      memberVoteHistoryData,
      pictureData,
      memberBillsSponsoredData,
    },
  };
};

export default MemberPage;
