import { SpecificMemberInfo } from "@/types/MemberTypes";
import Image from "next/image";
import {getState, getParty, getAge} from '@/utils/util'
interface MemberBioProps {
  memberInfo: SpecificMemberInfo;
  portraitUrl: string;
}

const MemberBio: React.FC<MemberBioProps> = ({ memberInfo, portraitUrl }) => {
  const roles = memberInfo.roles[0];
  const handleLink = () => {
    window.open(memberInfo.url, "_blank");
  };
  const handleTwitter = () => {
    window.open(memberInfo.twitter_account, "_blank");
  }
  const handleFacebook = () => {
    window.open(memberInfo.facebook_account, "_blank");
  }
  const getMembershipSummary = (memberInfo: SpecificMemberInfo) => {
    let ans = [];
    let recentStartYear = "";
    let recentChamber = "";
    let oldEndDate = "";
  
    for (let role of memberInfo.roles) {
      const { congress, chamber, state, district, start_date, end_date } = role;
      const fullStateName = getState(state);
      const startYear = start_date ? start_date.split('-')[0] : '';
      //must update 2024 if it is 2024
      const endYear = end_date ? (end_date.split('-')[0] >= "2024" ? "Present" : end_date.split('-')[0]) : '';
      if (role.chamber === recentChamber) {
        ans.pop();
        ans.push(<h4 key={role.congress}><strong>{chamber}</strong>: {fullStateName} ({startYear}-{oldEndDate})</h4>);
      } else {
        recentStartYear = startYear;
        recentChamber = chamber;
        oldEndDate = endYear;
        
        const line = chamber === "House" ? 
          <h4 key={role.congress}><strong>{chamber}</strong>: {fullStateName}, District {district} ({recentStartYear}-{endYear})</h4> :
          <h4 key={role.congress}><strong>{chamber}</strong>: {fullStateName} ({recentStartYear}-{endYear})</h4>;
        ans.push(line);
      }
    }
    return (
      <div className="mb-2">
        {ans}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row bg-primary-dark border-black border-2 rounded-sm shadow-xl px-1 p-4 sm:px-4 justify-around">
      <Image src={portraitUrl} alt="member image" width={220} height={300} />
      <div className="memberbio-text items-center flex flex-col w-4/5 sm:w-1/2 justify-between">
        <div className="">
          <div className="header-section text-center mb-2">
            <h1>{roles.short_title} {memberInfo.first_name} {memberInfo.last_name}</h1>
          </div>
              {getMembershipSummary(memberInfo)}
          <div className="info-section sm:grid sm:grid-cols-2 gap-4">
            <div>
              <p><strong>Party: </strong>{getParty(memberInfo.current_party)}</p>
              <p><strong>Age: </strong>{(getAge(memberInfo.date_of_birth))}</p>
              <p><strong>Next election: </strong>{roles.next_election}</p>
            </div>
            <div>
              <p><strong>Phone:</strong> {memberInfo.roles[0].phone}</p>
              <p><strong>Address:</strong> {memberInfo.roles[0].office}</p>
            </div>
          </div>
        </div>
        <div className="website-link">
          <a className="flex flex-row" href={memberInfo.url} target="_blank" rel="noopener noreferrer">
            View Official Website
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.25 5C5.56 5 5 5.56 5 6.25v11.5c0 .69.56 1.25 1.25 1.25h11.5c.69 0 1.25-.56 1.25-1.25V14a1 1 0 1 1 2 0v3.75A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3H10a1 1 0 1 1 0 2H6.25ZM14 5a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L17.586 5H14Z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemberBio;
