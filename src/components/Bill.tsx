import { BillProps } from '@/types/index';
import React from 'react';

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