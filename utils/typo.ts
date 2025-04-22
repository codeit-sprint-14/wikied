import { DefaultTheme } from 'styled-components';
import theme from '@/styles/theme';

type TypoKeys =
  | '48sb'
  | '24sb'
  | '20sb'
  | '20m'
  | '20r'
  | '18sb'
  | '18m'
  | '18r'
  | '16sb'
  | '16m'
  | '16r'
  | '14sb'
  | '14m'
  | '14r'
  | '13m'
  | '12sb'
  | '12r';

const typo = (variant: TypoKeys) => (props: { theme: DefaultTheme }) => {
  const typoStyle = props.theme.typo[variant];

  if (!typoStyle) {
    console.warn(`theme에 "${variant}"가 없어요`);
    return '';
  }

  return `
    font-size: ${typoStyle.fontSize};
    font-weight: ${typoStyle.fontWeight};
  `;
};

typo.options = Object.keys(theme.typo);

export default typo;
