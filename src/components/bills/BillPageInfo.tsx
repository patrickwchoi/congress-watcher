import { SpecificBillProps } from "@/types/BillTypes";
import React from "react";

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
    <div className="bill-component flex flex-col m-4 p-2 border-2 border-black">
      <div className="bill-header flex flex-row justify-between border-b-2 border-gray-500">
        <h1 className="text-1xl font-bold">
          {bill.number} - {bill.title}
        </h1>
        <p className="text-base">{bill.introduced_date}</p>
      </div>

      <div className="bill-content flex flex-col">
        <div className="bill-sponsor flex flex-row gap-x-2">
          <h3 className="text-1xl">
            Sponsor: {bill.sponsor_title} {bill.sponsor},
          </h3>
          <p className="text-base">
            {bill.sponsor_party} - {bill.sponsor_state}
          </p>
        </div>
        <div className="bill-status">
          <h3 className="text-1xl">
            Status: {bill.active ? "Active" : "Inactive"}
          </h3>
          <p className="text-base">{bill.latest_major_action}</p>
        </div>
        <div className="bill-summary">
          <p>{bill.summary}</p>
          <p>Debugging Purposes: {bill.bill_id}</p>
        </div>
        <button onClick={handleLink}>View on Congres.gov</button>
      </div>
    </div>
  );
};

export default BillPageInfo;
