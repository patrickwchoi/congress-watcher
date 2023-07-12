require("dotenv").config();
import { useState, useEffect} from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { SpecificMemberProps, SpecificMemberData } from "@/types/MemberTypes"

const MemberPage:React.FC<SpecificMemberProps> = ({ initialData }) => {
  const [memberData, setMemberData] = useState<SpecificMemberData|null>(initialData)

  console.log('memberdata: ', memberData)

  return (
    <div>
      <h2>member page</h2>
      {memberData && memberData.results[0] ? (
        <p>
          {memberData.results[0].last_name}
        </p>
      ) : (
        <h2>no member data</h2>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { member_id } = context.query; //where is context.query coming from?
  console.log('politicina id: ', member_id)
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }
  const res = await fetch(
    `https://api.propublica.org/congress/v1/members/${member_id}.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    }
    );

  const initialData = await res.json();

  return {
    props: {
      initialData,
    },
  };
}

export default MemberPage;
