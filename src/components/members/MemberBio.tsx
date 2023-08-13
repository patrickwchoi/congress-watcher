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
    <div className="flex flex-row w-4/5 border bg-primary-dark border-black border-2 rounded-sm shadow-xl p-4 justify-around">
      <Image src={portraitUrl} alt="member image" width={220} height={300} />
      <div className="memberbio-text flex flex-col ">
        <div className="header-section text-center">
          <h1>{roles.short_title} {memberInfo.first_name} {memberInfo.last_name}</h1>
        </div>
        <div className="info-section grid grid-cols-2 gap-4">
          <div>
            <h4>Party: {getParty(memberInfo.current_party)}</h4>
            <h4>State: {getState(roles.state)}</h4>
            <h4>Age: {(getAge(memberInfo.date_of_birth))}</h4>
            <h4>Next election: {roles.next_election}</h4>
          </div>
          <div>
            <h4>In office: {inOffice()}</h4>
            <h4>Number of terms: {memberInfo.roles.length}</h4>
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
