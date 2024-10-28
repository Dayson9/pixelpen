import Header from './components/Header.js';
import Canvas from './components/Canvas.js';
import Footer from './components/Footer.js';

const { QComponent } = QueFlow;

const PixelPen = new QComponent("#app", {
  template: () => `
    <div id="main">
      <Header/>
      <Canvas/>
      <Footer/>
    </div>
  `,
  stylesheet: {
    "@font-face" : `
      font-family: 'Inter';
      src: url('assets/Inter_18pt-Medium.ttf');
      font-weight: 400;
      font-style: normal;
    `,
    
    "@font-face ": `
      font-family: 'Inter Bold';
      src: url('assets/Inter_18pt-Black.ttf');
      font-weight: 400;
      font-style: normal;
    `,
   
    "#main" : `
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0px;
      left: 0px;
      font-family: Inter;
    `
  }
});

PixelPen.render();

currentElement = document.querySelector("h1");

setTimeout(() => Footer.data.modalDisplay = "flex", 500);