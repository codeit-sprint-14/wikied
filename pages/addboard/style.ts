import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';

export const Container = styled.div`
  max-width: 1060px;
  margin: 0 auto;
  padding-top: 80px;
  height: 100vh;
`;
export const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 50px 0;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    color: ${color('gray500')};
    ${typo('24sb')}
  }

  p {
    margin-top: 10px;
    color: ${color('gray400')};
    ${typo('16r')}
  }
`;

export const TopRightButton = styled.div``;

export const TitleArea = styled.div``;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  border-top: 1px solid ${color('gray200')};
  border-bottom: 1px solid ${color('gray200')};
`;

export const TitleInput = styled.input`
  flex: 1;
  padding: 12px 0;
  font-size: 16px;
  border: none;
  outline: none;
`;

export const CountText = styled.span`
  color: ${color('gray500')};
  ${typo('14m')}
  span {
    color: ${color('green300')};
  }
`;

export const EditorArea = styled.div`
  .quill {
  }
  p {
    margin-top: 20px;
    color: ${color('gray600')};
    ${typo('16m')}
  }
`;

export const BottomCenterButton = styled.div`
  text-align: center;
`;

export const ThumbnailButton = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
export const ThumbnailPreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;
