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
    <div className='flex flex-row m-4'>
      <h1 className='text-2xl font-bold'>Bill:</h1>
      <p className='text-base'>{bill.title}</p>
      <p className='text-base'>{bill.introduced_date}</p>
    </div>
  )
}

export default Bill;