import Header from './components/Header.js';
import Canvas from './components/Canvas.js';
import Footer from './components/Footer.js';
import Highlighter from './components/Highlighter.js';
import ElementMenu from './components/ElementMenu.js';
import CodeView from './components/CodeView.js';
import saveAsFile from './HelperFunctions.js';

const { QComponent } = QueFlow;

const PixelPen = new QComponent("#app", {
  template: () => `
    <div id="main">
      <Highlighter/>
      <CodeView/>
      <Header/>
      <Canvas/>
      <Footer/>
      <ElementMenu/>
    </div>
  `,
  stylesheet: {
    "@font-face" : `
      font-family: 'Inter';
      src: url('assets/Inter_18pt-Medium.ttf');
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

out = document.querySelector("#out");

loadAssets();