import { DefaultTheme } from 'styled-components';
import theme from '@/styles/theme';

type ColorKeys =
  | 'gray50'
  | 'gray100'
  | 'gray200'
  | 'gray300'
  | 'gray400'
  | 'gray500'
  | 'gray600'
  | 'green100'
  | 'green200'
  | 'green300'
  | 'red100'
  | 'red200'
  | 'purple100'
  | 'yellow100'
  | string;

const color = (variant: ColorKeys) => (props: { theme: DefaultTheme }) => {
  const colorStyle = props.theme.color[variant];

  if (!colorStyle) {
    console.warn(`theme에 "${variant}"가 없어요`);
    return '';
  }

  return colorStyle;
};

color.options = Object.keys(theme.color).filter(key => typeof theme.color[key] === 'string');

export default color;
