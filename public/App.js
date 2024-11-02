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
   
    "#main:not(#out *)" : `
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0px;
      left: 0px;
      font-family: Inter;
    `,
  
    // Style for the button container
    ".btns:not(#out *)": `
      width: 80%;
      height: 50%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 5px;
      justify-content: space-around;
    `,
    // Style for buttons within the button container
    ".btns button:not(#out *)": `
      width: 100px;
      height: 35px;
      border: none;
      border-radius: 15px;
      background: rgba(0,0,0,.3);
      color: white;
    `,
    
    "#plus i:not(#out *)": `
      font-size: 35px;
      font-weight: 800;
      color: rgba(80, 157, 255);
    `,
    "#plus:not(#out *)": `
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    `
  }
});


PixelPen.render();

out = document.querySelector("#out");
canvasContainer = document.querySelector("#main-c");
loadAssets();