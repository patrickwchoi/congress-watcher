require("dotenv").config();
import { useState} from "react";
import type { GetServerSideProps } from 'next'
import { SpecificMemberProps } from "@/types/MemberTypes"
import Image from 'next/image'
import MemberBio from '@/components/members/MemberBio'

const MemberPage:React.FC<SpecificMemberProps> = ({ MemberData, pictureData }) => {
  // const [memberData, setMemberData] = useState<SpecificMemberData|null>(MemberData)

  const pages = pictureData.query.pages;
  const pageId = Object.keys(pages)[0];  
  const imageUrl = pages[pageId].original.source;  // these 3 lines used to grab the url nested inside pictureData
  
  return (
    <div>
      <h2>member page</h2>
      <MemberBio memberInfo={MemberData.results[0]} portraitUrl={imageUrl}/>
      {/* {MemberData && MemberData.results[0] ? (
        <div>
          <p>
            {MemberData.results[0].first_name}
            {MemberData.results[0].last_name}
          </p>
          <Image src={imageUrl} alt='member image' width={200} height={300}/>
        </div>
      ) : (
        <h2>No member data.</h2>
      )} */}

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { member_id } = context.query; //where is context.query coming from?
  console.log('politicina id: ', member_id)
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }
  const MemberRes = await fetch(
    `https://api.propublica.org/congress/v1/members/${member_id}.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    }
    );
  const MemberData = await MemberRes.json();
  
  //fetch using wiki API to get politician's main wiki picture using their fullname
  const fullname = MemberData.results[0].first_name + '_' + MemberData.results[0].last_name
  const pictureRes = await fetch(
    `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${fullname}`
  );
  const pictureData = await pictureRes.json();


  return {
    props: {
      MemberData,
      pictureData,
    },
  };
}

export default MemberPage;
