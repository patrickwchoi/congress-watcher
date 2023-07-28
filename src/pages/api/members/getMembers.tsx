require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { sort, dir, member_id, type, chamber, congress } = req.query;
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error("PROPUBLICA_API_KEY must be defined");
  }
  if (!type){
    type = 'introduced';
  }
  const response = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`,
    {
      headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY },
    },
  );

  const data = await response.json();
  res.status(200).json(data);
};

export default handler;
