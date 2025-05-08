import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
      background-color: rgba(165, 165, 165, 0.1);
  }

  50% {
      background-color: rgba(165, 165, 165, 0.3);
  }

  100% {
      background-color: rgba(165, 165, 165, 0.1);
  }
`;

const Skeleton = styled.div<{ width?: string; height?: string; isCircle?: boolean }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  border-radius: ${props => (props.isCircle ? '9999px' : '8px')};
  animation: ${shimmer} 1.8s infinite ease-in-out;
`;

export default Skeleton;
