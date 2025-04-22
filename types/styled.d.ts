import 'styled-components';
import theme from '../styles/theme';

type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    color: {
      gray50: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      green100: string;
      green200: string;
      green300: string;
      red100: string;
      red200: string;
      purple100: string;
      yellow100: string;
      [key: string]: string;
    };
    typo: {
      '48sb': { fontSize: string; fontWeight: number };
      '24sb': { fontSize: string; fontWeight: number };
      '20sb': { fontSize: string; fontWeight: number };
      '20m': { fontSize: string; fontWeight: number };
      '20r': { fontSize: string; fontWeight: number };
      '18sb': { fontSize: string; fontWeight: number };
      '18m': { fontSize: string; fontWeight: number };
      '18r': { fontSize: string; fontWeight: number };
      '16sb': { fontSize: string; fontWeight: number };
      '16m': { fontSize: string; fontWeight: number };
      '16r': { fontSize: string; fontWeight: number };
      '14sb': { fontSize: string; fontWeight: number };
      '14m': { fontSize: string; fontWeight: number };
      '14r': { fontSize: string; fontWeight: number };
      '13m': { fontSize: string; fontWeight: number };
      '12sb': { fontSize: string; fontWeight: number };
      '12r': { fontSize: string; fontWeight: number };
      [key: string]: { fontSize: string; fontWeight: number };
    };
  }
}
