import { SpecificMemberInfo } from "@/types/MemberTypes";
import Image from "next/image";

interface MemberBioProps {
  memberInfo: SpecificMemberInfo;
  portraitUrl: string;
}

const MemberBio: React.FC<MemberBioProps> = ({ memberInfo, portraitUrl }) => {
  const handleLink = () => {
    window.open(memberInfo.url, "_blank");
  };
  const handleTwitter = () => {
    window.open(memberInfo.twitter_account, "_blank");
  }
  const handleFacebook = () => {
    window.open(memberInfo.facebook_account, "_blank");
  }
  return (
    <div className="flex flex-row">
      <Image src={portraitUrl} alt="member image" width={200} height={300} />
      <div className="memberbio-text flex flex-col">
        <div className="flex flex-row">
          <h2>{memberInfo.first_name} {memberInfo.last_name} - {memberInfo.current_party}</h2>
          {/* <h4>- {memberInfo.current_party}</h4> */}
        </div>
        <div>
          <p>
            number of terms: {memberInfo.roles.length}
          </p>
        </div>
        <a href={memberInfo.url} target="_blank" rel="noopener noreferrer">
          View Their Official Website
        </a>
      </div>
    </div>
  );
};

export default MemberBio;
