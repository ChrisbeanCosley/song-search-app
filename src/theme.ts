import { createTheme, Input, colorsTuple, CloseButton, Button, Card, Modal } from '@mantine/core';

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

  Card: Card.extend({
    styles: {
      root: {
        backgroundColor: '#243E51',
        color: 'white',
      },
      section: {
        backgroundColor: '#243E51',
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

  Button: Button.extend({
    styles: {
      root: {
        color: 'white',
        backgroundColor: 'var(--mantine-color-searchGrey-0)',
        height: '50px',
      }
    }

  }),

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

  Modal: Modal.extend({
    styles: {
      root: {
        bg: '#0D171E',
        color: 'white',
      },
      body: {
        backgroundColor: '#0D171E',
      },
      header: {
        backgroundColor: '#0D171E',
        color: 'white',
      },
    }
  }),

},

 colors: {
  searchGrey: colorsTuple('#243E51'),
 },

});