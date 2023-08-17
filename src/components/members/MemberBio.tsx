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
        ans.push(<h4 key={role.congress}><strong>{chamber}</strong>: {fullStateName} ({recentStartYear}-{oldEndDate})</h4>);
      } else {
        recentStartYear = startYear;
        recentChamber = chamber;
        oldEndDate = endYear;
        
        const line = chamber === "House" ? 
          <h4 key={role.congress}><strong>{chamber}</strong>: {fullStateName}, District {district} ({startYear}-{endYear})</h4> :
          <h4 key={role.congress}><strong>{chamber}</strong>: {fullStateName} ({startYear}-{endYear})</h4>;
        ans.push(line);
      }
    }
    return (
      <div>
        {ans}
      </div>
    );
  }

  const inOffice = () => {
    if (memberInfo.in_office){
      return 'True';
    }
    return 'False';
  }
  
  return (
    <div className="flex flex-col sm:flex-row items-center w-4/5 border bg-primary-dark border-black border-2 rounded-sm shadow-xl px-1 p-4 sm:px-4 justify-around">
      <Image src={portraitUrl} alt="member image" width={220} height={300} />
      <div className="memberbio-text flex flex-col w-4/5 sm:w-1/2">
        <div className="header-section text-center">
          <h1>{roles.short_title} {memberInfo.first_name} {memberInfo.last_name}</h1>
        </div>
            <h4>{getMembershipSummary(memberInfo)}</h4>
        <div className="info-section sm:grid sm:grid-cols-2 gap-4">
          <div>
            <h4><strong>Party: </strong>{getParty(memberInfo.current_party)}</h4>
            <h4><strong>State: </strong>{getState(roles.state)}</h4>
            <h4><strong>Age: </strong>{(getAge(memberInfo.date_of_birth))}</h4>
            <h4><strong>Next election: </strong>{roles.next_election}</h4>
          </div>
          <div>
            <h4><strong>In office: </strong>{inOffice()}</h4>
            <h4><strong>Number of terms: </strong>{memberInfo.roles.length}</h4>
          </div>
        </div>
        <div className="website-link">
          <a href={memberInfo.url} target="_blank" rel="noopener noreferrer">
            View Official Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemberBio;
