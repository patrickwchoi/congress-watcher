import { CosponsorsProps } from '@/types/BillTypes';
import { useState } from 'react';

/**
 * @param {CosponsorsProps} props 
 * @param props.cosponsors list of cosponsors
 * @returns {JSX.Element} Cosponsors component, with a button that displays all cosponsors if clicked. Otherwise, only shows first 5 or less.
 */
const Cosponsors:React.FC<CosponsorsProps> = ({cosponsors}) => {

  const [showAllCosponsors, setShowAllCosponsors] = useState(false);

  const handleClick = () => {
    setShowAllCosponsors(!showAllCosponsors);
  }
  if (cosponsors.length == 0) {
    return (
      <div>No Cosponsors</div>
    )
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
  const firstFiveCosponsors = ( //first 5 or less cosponsors
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
          <h1>Cosponsors ({cosponsors.length}):</h1>
          { showAllCosponsors ? allCosponsors : firstFiveCosponsors }
          <button onClick={handleClick} className='bg-blue-100'>
            { cosponsors.length > 5 && 
              (showAllCosponsors ? 'Hide' : `Show More`)
            }
          </button>
        </div>
      ) : (
        <h1>No cosponsors</h1>
      )}
    </div>
  )
}

export default Cosponsors;