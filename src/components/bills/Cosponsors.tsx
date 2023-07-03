import { CosponsorsProps } from '@/types/BillTypes';
import { useState } from 'react';

const Cosponsors:React.FC<CosponsorsProps> = ({cosponsors}) => {

  const [showAllCosponsors, setShowAllCosponsors] = useState(false);

  const handleClick = () => {
    setShowAllCosponsors(!showAllCosponsors);
  }
  const allCosponsors = (
    <div>
      <ul>
        {cosponsors.map((cosponsor) => (
          <li key={cosponsor.cosponsor_id}>
            <a href={cosponsor.cosponsor_uri}>{cosponsor.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
  const firstFiveCosponsors = (
    <div>
      <ul> 
        {cosponsors.slice(0,5).map((cosponsor) => (
          <li key={cosponsor.cosponsor_id}>
            <a href={cosponsor.cosponsor_uri}>{cosponsor.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <div className=''>
      {cosponsors ? (
        <div>
          <h1>Cosponsors</h1>
          { showAllCosponsors ? allCosponsors : firstFiveCosponsors }
          <button onClick={handleClick}>
            { showAllCosponsors ? 'Hide' : 'Show More'}
          </button>
        </div>
      ) : (
        <h1>No cosponsors</h1>
      )}
    </div>
  )
}

export default Cosponsors;