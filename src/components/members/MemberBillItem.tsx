import { MemberCosponsoredBillInfo } from '@/types/MemberTypes'
import React from 'react';

interface MemberBillItem {
  bill: MemberCosponsoredBillInfo;
}
const MemberBillItem: React.FC<MemberBillItem> = ({bill}) => {

  return (
    <div className="bill-component flex flex-col m-4 p-2 border-2 border-black">
      <a className="bill-header flex flex-row justify-between border-b-2 border-gray-500" href={`/bill/${bill.bill_id}`}>
        <h1 className="text-1xl font-bold">{bill.number} - {bill.title}</h1>
        <p className="text-base">Introduced {bill.introduced_date}</p>
      </a>

      <div className="bill-content flex flex-col">
        <a className="bill-sponsor flex flex-row gap-x-2 hover:cursor-pointer" href={`./${bill.sponsor_id}`}>
          <h3 className="text-1xl">Sponsor: {bill.sponsor_title} {bill.sponsor_name},</h3>
          <p className="text-base">{bill.sponsor_party} - {bill.sponsor_state}</p>
        </a>
        <div className="bill-status">
          <h3 className="text-1xl">Status: {bill.active ? "Active" : "Inactive"}</h3>
          <p className="text-base">{bill.latest_major_action}</p>
        </div>
        <div className="bill-summary">
          <p>{bill.summary}</p>
        </div>
        <a href={bill.congressdotgov_url} target="_blank" rel="noopener noreferrer">
          View on Congres.gov
        </a>
      </div>
    </div>
  )
}

export default MemberBillItem;