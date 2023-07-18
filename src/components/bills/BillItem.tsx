import { BillProps } from "@/types/BillTypes";
import React from "react";
/**
 * Bill component that displays a bill's information.
 *
 * @param {BillProps} props - Object containing all bill information.
 * @param {object} props.bill - The bill object.
 *
 * @returns {JSX.Element} The Bill component.
 */
const BillItem: React.FC<BillProps> = ({ bill }) => {
  const handleLink = () => {
    window.open(bill.congressdotgov_url, "_blank");
  };
  const handleBillPage = () => {
    window.open(`/bill/${bill.bill_id}`, "_blank");
  };
  const handleMemberPage = () => {
    window.open(`/member/${bill.sponsor_id}`, "_blank");
  }
  return (
    <div className="bill-component flex flex-col m-4 p-2 border-2 border-black">
      <a
        className="bill-header flex flex-row justify-between border-b-2 border-gray-500"
        href={`/bill/${bill.bill_id}`}
      >
        <h1 className="text-1xl font-bold">{bill.number} - {bill.title}</h1>
        <p className="text-base">Introduced {bill.introduced_date}</p>
      </a>

      <div className="bill-content flex flex-col">
        <a 
          className="bill-sponsor flex flex-row gap-x-2 hover:cursor-pointer"
          href={`member/${bill.sponsor_id}`}
          target="_blank"
        >
          <h3 className="text-1xl">Sponsor: {bill.sponsor_title} {bill.sponsor_name},</h3>
          <p className="text-base">{bill.sponsor_party} - {bill.sponsor_state}</p>
        </a>
        <div className="bill-status">
          <h3 className="text-1xl">Status: {bill.active ? "Active" : "Inactive"}</h3>
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

export default BillItem;
