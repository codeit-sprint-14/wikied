import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LinkIcon from '@/public/icons/link.svg';

const LinkContainer = styled.a`
  width: 240px;
  height: 34px;
  padding: 5px 10px;
  gap: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
`;

export default function LinkComponent({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <LinkContainer href={href || '#'}>
      <Image src={LinkIcon} width={240} height={34} alt="Link Icon" />
      {children}
    </LinkContainer>
  );
}
