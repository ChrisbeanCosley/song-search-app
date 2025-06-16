import { createTheme, Input, colorsTuple, CloseButton, Button, Card, Modal } from '@mantine/core';

export const theme = createTheme({

  breakpoints: {
    xs: '320px',
    sm: '425px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
    xxl: '2560px'
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
        backgroundColor: '#FF7F00',
        height: '50px',
        borderColor: 'white',
      },
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
        outline: 'green'
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



 
 other: {
  modalGradient: 'linear-gradient(90deg, hsla(204, 25%, 71%, 1) 0%, hsla(205, 39%, 17%, 1) 100%)',
  greenGradient: 'linear-gradient(90deg, rgba(28,193,161,1) 2%, rgba(32,92,81,1) 100%)',
},

});