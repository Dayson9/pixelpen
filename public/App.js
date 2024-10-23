import Header from './components/Header.js';

const { QComponent } = QueFlow;

const PixelPen = new QComponent("#app", {
  template: () => `
    <Header/>
  `,
  stylesheet: {

  }
});

PixelPen.render();