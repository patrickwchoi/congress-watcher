require('dotenv').config();
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

/**
 * Handler for the API route that fetches bills based on a query.
 * 
 * This function uses the ProPublica API to fetch the bills.
 * The ProPublica API key is read from the environment variables.
 *
 * It expects the request query to contain the parameters 'sort', 'dir', and 'query'.
 * These parameters are used to sort and filter the fetched bills.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {object} req.query - The parsed query string from the request URL.
 * @param {string} req.query.sort - The property to sort the fetched bills by.
 * @param {string} req.query.dir - The direction to sort the fetched bills in.
 * @param {string} req.query.searchQuery - The query to filter the fetched bills by.
 *
 * @param {NextApiResponse} res - The Next.js API response object.
 * @param {function} res.status - Sets the HTTP status code for the response.
 * @param {function} res.json - Sends a JSON response.
 *
 * @throws {Error} Will throw an error if the PROPUBLICA_API_KEY environment variable is not set.
 *
 * @returns {Promise<void>} Nothing.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {sort, dir, searchQuery, offset} = req.query;
  if (!process.env.PROPUBLICA_API_KEY) {
    throw new Error('PROPUBLICA_API_KEY must be defined');
  }

  const response = await fetch(`https://api.propublica.org/congress/v1/bills/search.json?query=${searchQuery}&offset=${offset}`, {
    headers: { 'X-API-Key': process.env.PROPUBLICA_API_KEY }
  });

  const data = await response.json();
  
  res.status(200).json(data);
};

export default handler;
