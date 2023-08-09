import { SpecificBillProps } from "@/types/BillTypes";
import React from "react";
import Link from "next/link";
import {getState, getParty} from "@/utils/util";

/**
 * Individual Bill Page Component
 * @param props.bill takes in a SpecificBillInfo object
 * @returns {JSX.Element} Main portion of our bill/[bill_id] page
 */
const BillPageInfo: React.FC<SpecificBillProps> = ({ bill }) => {
  const handleLink = () => {
    window.open(bill.congressdotgov_url, "_blank");
  };
  return (
    <div className="bill-component flex flex-col m-4 p-2 border-b-2 border-b-black">
      <div className="bill-header flex flex-row justify-between border-b-2 border-gray-500">
        <h1 className="text-1xl font-bold">
          {bill.number} - {bill.title}
        </h1>
        <p className="text-base">{bill.introduced_date}</p>
      </div>

      <div className="bill-content flex flex-col">
        <div className="bill-sponsor flex flex-row gap-x-2">
          <Link href={`/member/${bill.sponsor_id}`} className="flex flex-row items-center gap-2">
            <h3 className="">Sponsor: {bill.sponsor_title} {bill.sponsor}</h3>
          
            <h4 className="">({getParty(bill.sponsor_party)} - {getState(bill.sponsor_state)})</h4>
          </Link>
        </div>
        <div className="bill-status">
          <h3 className="text-1xl">Status: {bill.active ? "Active" : "Inactive"}</h3>
          <p className="text-base">{bill.latest_major_action}</p>
        </div>
        <div className="bill-summary">
          <p>{bill.summary}</p>
        </div>
        <button onClick={handleLink}>View on Congres.gov</button>
      </div>
    </div>
  );
};

export default BillPageInfo;
