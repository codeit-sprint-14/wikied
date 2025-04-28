import styled from 'styled-components';
import color from '@/utils/color';
import Image from 'next/image';
import SearchIcon from '@/public/icons/ico-search.svg';

const StyledBox = styled.div`
  position: relative;
  width: 860px;
  height: 45px;
  border-radius: 10px;
  padding: 10px 20px; /* top: 10px, right: 20px, bottom: 10px, left: 20px */
  gap: 10px;
  border: 1px solid ${color('gray100')};
  z-index: 100;

  /* 입력 요소가 포커스 될 때 배경색 변경 */
  &:focus-within {
    background-color: #f7f7fa;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  width: 100%;
  /* 아이콘 부분을 고려해서 왼쪽 여백 추가 */
  padding-left: 50px;
`;

interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <StyledBox>
      <SearchIconWrapper>
        <Image src={SearchIcon} width={22} height={22} alt="Search Icon" />
      </SearchIconWrapper>
      <SearchInput placeholder="검색어를 입력하세요" value={value} onChange={onChange} />
    </StyledBox>
  );
}
