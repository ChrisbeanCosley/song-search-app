import { createTheme, Input, colorsTuple, CloseButton } from '@mantine/core';

export const theme = createTheme({

  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
    xxl: '120em'
  },
 components: {

  Input: Input.extend({
    styles: {
      input: {
        color: 'white',
        letterSpacing: '0.5px',
        borderColor: '#F0F0F3',
        background: 'var(--mantine-color-searchGrey-0)',
        height: '50px',
      },

    }

  }),

  CloseButton: CloseButton.extend({
    styles: {
      root: {
        color: 'white',
        backgroundColor: 'var(--mantine-color-searchGrey-0)',
    }}

  }),



 },

 colors: {
  searchGrey: colorsTuple('#243E51'),
 },

});