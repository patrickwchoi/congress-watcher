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
        <h2 className="">
          {bill.number} - {bill.title}
        </h2>
      </div>

      <div className="bill-content flex flex-col">
        <h4 className="">Introduced {bill.introduced_date}</h4>
        <div className="bill-sponsor flex flex-row gap-x-2">
          <h4>Sponsor: </h4>
            <Link 
              href={`/member/${bill.sponsor_id}`} 
              className="politician-link"
              >
              <h3>{bill.sponsor_title} {bill.sponsor}</h3>
            </Link>
            <h4>({getParty(bill.sponsor_party)} - {getState(bill.sponsor_state)})</h4>
        </div>
        <div className="bill-status">
          <h4 className="">Status: {bill.active ? "Active" : "Inactive"}</h4>
        </div>
        <div className="bill-summary">
          <p>{bill.summary}</p>
        </div>
        <div className="bill-actions">
          <h4>Bill Actions</h4>
          <ul>
            {bill.actions.map((action) => (
              <li key={action.id}>
                ({action.chamber}, {action.action_type}) {action.description} ({action.datetime})
              </li>
            ))}

          </ul>
          {/* <p>Latest Action: {bill.latest_major_action} ({bill.latest_major_action_date})</p> */}
        </div>
        <button onClick={handleLink}>View on Congres.gov</button>
      </div>
    </div>
  );
};

export default BillPageInfo;
