import { CosponsorsProps, CosponsorsInfo } from "@/types/BillTypes";
import React, { useState } from "react";
import {getState, getParty} from "@/utils/util";
/**
 * @param {CosponsorsProps} props
 * @param props.cosponsors list of cosponsors
 * @returns {JSX.Element} Cosponsors component, with a button that displays all cosponsors if clicked. Otherwise, only shows first 5 or less.
 */
const Cosponsors: React.FC<CosponsorsProps> = ({ cosponsors }) => {
  const [showAllCosponsors, setShowAllCosponsors] = useState(false);

  const handleClick = () => {
    setShowAllCosponsors(!showAllCosponsors);
  };
  if (cosponsors.length == 0) {
    return <div>No Cosponsors</div>;
  }

  interface cosponsorItemProps {
    cosponsor: CosponsorsInfo;
  }

  const cosponsorItem: React.FC<cosponsorItemProps> = ({cosponsor}) => (
    <li key={cosponsor.cosponsor_id} className="grid grid-cols-3 gap-4 py-2">
      <a href={`../member/${cosponsor.cosponsor_id}`} className="text-1xl font-bold text-blue-link">
        {cosponsor.cosponsor_title} {cosponsor.name}
      </a>
      <p>{getState(cosponsor.cosponsor_state)}</p>
      <p>{getParty(cosponsor.cosponsor_party)}</p>
    </li>
  );

  const allCosponsors = (
    <div>
      {/* Grid column headers */}
      <div className="grid grid-cols-3 gap-4 my-4 font-bold text-lg border-b-2 border-black">
        <div>Title & Name</div>
        <div>State</div>
        <div>Party</div>
      </div>
      
      {/* Grid list */}
      <ul className="divide-y divide-gray-300 ">
        {cosponsors.map((cosponsor) => cosponsorItem({cosponsor}))}
      </ul>
    </div>
  );

  const firstFiveCosponsors = (
    <div>
      {/* Grid column headers */}
      <div className="grid grid-cols-3 gap-4 my-4 font-bold text-lg border-b-2 border-black">
        <div>Title & Name</div>
        <div>State</div>
        <div>Party</div>
      </div>

      {/* Grid list */}
      <ul className="divide-y divide-gray-300 ">
        {cosponsors.slice(0, 5).map((cosponsor) => cosponsorItem({cosponsor}))}
      </ul>
    </div>
  );

  return (
    <div className="w-1/2 flex flex-col">
      {cosponsors.length ? (
        <div>
          <h2>Bill Cosponsors ({cosponsors.length}):</h2>
          {showAllCosponsors ? allCosponsors : firstFiveCosponsors}
          <button onClick={handleClick} className="bg-blue-100">
            {cosponsors.length > 5 &&
              (showAllCosponsors ? "Hide" : `Show More`)}
          </button>
        </div>
      ) : (
        <h1>No cosponsors</h1>
      )}
    </div>
  );
};

export default Cosponsors;
