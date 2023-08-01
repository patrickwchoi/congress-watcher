import { SpecificMemberInfo } from "@/types/MemberTypes";
import Image from "next/image";
import {getStateName} from '@/utils/util'
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
  const party = () => {
    switch (memberInfo.current_party) {
      case 'D':
        return 'Democrat';
      case 'R':
        return 'Republican';
      default:
        return memberInfo.current_party;
    }
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
    <div className="flex flex-row w-2/3 bg-green-200">
      <Image src={portraitUrl} alt="member image" width={200} height={300} />
      <div className="memberbio-text flex flex-col">
        <div className="flex flex-row">
          <h2>{memberInfo.first_name} {memberInfo.last_name}</h2>
          {/* <h4>- {memberInfo.current_party}</h4> */}
        </div>
        <div>

          <p>Party: {party()}</p>
          <p>State: {getStateName(roles.state)}</p>
          <p>Next election: {roles.next_election}</p>
          <p>Title: {roles.title}</p>
          <p>In office: {inOffice()}</p>
          <p>number of terms: {memberInfo.roles.length}</p>
        </div>
        <a href={memberInfo.url} target="_blank" rel="noopener noreferrer">
          View Official Website
        </a>
      </div>
    </div>
  );
};

export default MemberBio;
