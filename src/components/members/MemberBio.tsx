import { SpecificMemberInfo } from "@/types/MemberTypes";
import Image from "next/image";

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
          <p>State: {roles.state}</p>
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
