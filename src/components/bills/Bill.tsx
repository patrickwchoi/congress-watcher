import { BillProps } from '@/types/index';
import React from 'react';
/**
 * Bill component that displays a bill's information.
 *
 * @param {BillProps} props - Object containing all bill information.
 * @param {object} props.bill - The bill object.
 *
 * @returns {JSX.Element} The Bill component.
 */
const Bill: React.FC<BillProps> = ({ bill }) => {

  return (
    <div className='bill-component flex flex-col m-4 p-2 border-2 border-black'>
      <div className='bill-header flex flex-row justify-between border-b-2 border-gray-500'>
        <h1 className='text-1xl font-bold'>{bill.title}</h1>
        <p className='text-base'>{bill.introduced_date}</p> 
      </div>

      <div className='bill-content flex flex-col'>
        <div className='bill-sponsor flex flex-row gap-x-2'>
          <h3 className='text-1xl'>Sponsor: {bill.sponsor_name},</h3>
          <p className='text-base'>{bill.sponsor_party} - {bill.sponsor_state}</p>
        </div>
        <div className='bill-status'>
          <h3 className='text-1xl'>Status: {bill.active ? 'Active' : 'Inactive'}</h3>
          <p className='text-base'>{bill.latest_major_action}</p>
        </div>
        <div className='bill-summary'>
          <p>{bill.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default Bill;