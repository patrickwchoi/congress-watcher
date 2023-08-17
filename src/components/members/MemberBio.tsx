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
  function getMembershipSummary(data: MemberData): string[] {
    let summaries: string[] = [];

    for (let role of data.roles) {
        const { congress, chamber, state, district, start_date, end_date } = role;
        const fullStateName = getState(state);  // Using the getState() function
        const startYear = start_date.split('-')[0];
        const endYear = end_date.split('-')[0] === "9999" ? "Present" : end_date.split('-')[0];
        const districtInfo = district ? `, District ${district}` : "";

        const existingSummaryIndex = summaries.findIndex(s => s.startsWith(`${chamber}\t${fullStateName}${districtInfo}`));

        if (existingSummaryIndex > -1) {
            const existingSummary = summaries[existingSummaryIndex];
            const parts = existingSummary.split(" ");
            parts[parts.length - 1] = `(${startYear}-${endYear})`;
            summaries[existingSummaryIndex] = parts.join(" ");
        } else {
            const formattedSummary = `${chamber}\t${fullStateName}${districtInfo} ${congress} (${startYear}-${endYear})`;
            summaries.push(formattedSummary);
        }
    }

    return summaries;
  }

  // const state = (acronym:string) => { //return full state name
  //   const stateNames: {[key:string] : string} = {'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland', 'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina', 'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'};
  //   if (stateNames[acronym]){
  //     return stateNames[acronym];
  //   }
  //   return acronym;
  // }


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
            <h4>{getMembershipSummary(memberInfo)}</h4>
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
