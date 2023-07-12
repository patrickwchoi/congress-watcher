import { SpecificMemberInfo } from '@/types/MemberTypes'
import Image from 'next/image'

interface MemberBioProps {
  memberInfo: SpecificMemberInfo;
  portraitUrl: string;
}

const MemberBio:React.FC<MemberBioProps> = ({memberInfo, portraitUrl}) => {

  return (
    <div className='flex flex-row'>
      <Image src={portraitUrl} alt='member image' width={200} height={300}/>
      <div className='memberbio-text'>
        <h2>
          {memberInfo.first_name} {memberInfo.last_name}
        </h2>
      </div>
    </div>
  )

}

export default MemberBio