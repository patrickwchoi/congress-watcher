require("dotenv").config();
import { useState, useEffect} from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

const PoliticianPage = ({ initialData }) => {
  const [politicianData, setPoliticianData] = useState(initialData)

  // useEffect(() => {
  //   console.log('politician data: ', politicianData);
  // }, [politicianData])
  console.log('politiciandata: ', politicianData)

  return (
    <div>
      <h2>Politician page</h2>
      {politicianData && politicianData.results[0] ? (
        <p>
          {politicianData.results[0].last_name}
        </p>
      ) : (
        <h2>no politician data</h2>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { politician_id } = context.query; //where is context.query coming from?
  console.log('politicina id: ', politician_id)
  const res = await fetch(
    `https://api.propublica.org/congress/v1/members/${politician_id}.json`,
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

export default PoliticianPage;
