import styled from 'styled-components';
import color from '@/utils/color';
import Image from 'next/image';
import ProfileIcon from '@/public/icons/ico-profile.svg';
import LinkComponent from './link'; // link 컴포넌트 import

const SearchResultBox = styled.div`
  position: relative; /* 우측 하단에 절대 위치 요소를 배치하기 위해 추가 */
  width: 868px;
  height: 142px;
  padding: 24px 36px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #dcdcdc;
`;

// ProfileArea: icon과 정보 영역을 포함 (총 width: 206, height: 94, gap: 32px)
const ProfileArea = styled.div`
  width: 206px;
  height: 94px;
  display: flex;
  gap: 32px;
  align-items: center;
`;

// InfoContainer: 오른쪽에 배치할 정보 영역 (width: 80, height: 94)
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 94px;
`;

const NameText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0%;
`;

// AdditionalInfo: 김동욱 아래에 14px 간격을 주어 위치와 직업 정보를 표시
const AdditionalInfo = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

const LocationText = styled.div`
  width: 120px; /* 기존 80px에서 너비를 늘림 */
  height: 24px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0%;
  color: ${color('gray400')};
`;

const OccupationText = styled.div`
  width: auto; /* 적절한 고정값으로 조정 가능 */
  height: 24px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0%;
  color: ${color('gray400')};
`;

// LinkWrapper: SearchResultBox의 우측 하단에 link 컴포넌트를 배치
const LinkWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  right: 36px;
`;

export default function SearchResult() {
  return (
    <SearchResultBox>
      <ProfileArea>
        <Image src={ProfileIcon} width={94} height={94} alt="Profile Icon" />
        <InfoContainer>
          <NameText>김동욱</NameText>
          <AdditionalInfo>
            <LocationText>서울, 대한민국</LocationText>
            <OccupationText>대학생</OccupationText>
          </AdditionalInfo>
        </InfoContainer>
      </ProfileArea>
      <LinkWrapper>
        <LinkComponent />
      </LinkWrapper>
    </SearchResultBox>
  );
}
