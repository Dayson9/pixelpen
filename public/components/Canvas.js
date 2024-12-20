// Import the subComponent constructor from QueFlow
const { subComponent } = QueFlow;

// Create a new subComponent instance named 'Canvas'
const Canvas = new subComponent("Canvas", {
  // Define reactive data for the Canvas component
  data: {
    // An empty string to store the HTML content to be rendered
    html: '',
    containerBG: localStorage.getItem('pxp-canvas-bg') || 'white',
    modalDisplay: 'none',
    mdDisplay: 'none',
    attriValue: '',
    screenBlur: 0
  },
  // Define the template for the Canvas component
  template: () => `
       <div class='plus' onclick={{ this.data.mdDisplay = 'block' }}  position='fixed' left='10px' bottom='21vh' background='rgba(34, 70, 116, .5)'>
         <i class='bx bxl-css3' color='white'></i>
       </div>
       
       <div class='plus' onclick={{ this.data.modalDisplay = 'block' }}  position='fixed' left='10px' bottom='12vh' background='rgba(34, 70, 116, .5)'>
         <i class='bx bx-paint-roll' color='white'></i>
       </div>
       
       <div class='modal' display={{ this.data.mdDisplay }}>
         <i class='bx bx-x' onclick={{ this.data.mdDisplay = 'none'; }}></i>
         <Text { text: 'CSS Attribute', weight: 750, size: 20, color: 'rgba(19, 40, 67, 1)' } />
         
        <input type='text' id='attri' oninput={{ this.data.attriValue = currentElement.style[e.target.value] }} placeholder='flex-direction'>
        
        <TextField { width: 78, height: 57, border: 'dodgerblue', color: 'rgba(19, 40, 67, 1)', placeholder: 'column', value: '{{ this.data.attriValue || "" }}', id: 'u', input: 'currentElement.style[attri.value] = e.target.value;', top: 10 } />
        
        <button onclick={{
          this.data.mdDisplay = 'none';
          Canvas.data.html = out.innerHTML;
          localStorage.setItem("pxp-html", out.innerHTML);
          addClick(); }}>Done</button>
      </div>
      
       <!-- Create input modal for changing background of canvas -->
       <div id='modal' display={{ this.data.modalDisplay }}>
         <Text { text: 'Background', weight: 650, size: 17, color: 'rgba(19, 40, 67, 1)' } />
         
         <TextField { width: 63, height: 57, border: 'dodgerblue', color: 'rgba(19, 40, 67, 1)', placeholder: 'white', value: '{{ this.data.containerBG }}', id: 'cbg', input: 'canvasContainer.style.background = cbg.value;' } />
         
          <div class='btns'>
            <button onclick={{ this.data.modalDisplay = 'none' }}>Cancel</button>
            <button background-color='rgb(80, 157, 255)' onclick={{ saveCanvasBG(cbg.value); this.data.modalDisplay = 'none'; }}>Done</button>
          </div>
       </div>
       
       <svg id='main-c'>
        <!-- Create a foreignObject element to embed HTML content within -->
        <foreignObject x='0' y='0' width='100vw' height='100%' id='out' onclick={{ Highlighter.data.display='none'; }} filter={{ 'blur('+this.data.screenBlur+'px)' }}>{{ this.data.html }}</foreignObject>
       </svg>
      `,
  // Define the stylesheet for the Canvas component
  stylesheet: {
    '#modal': `
        width: 85%;
        height: 210px;
        position: fixed;
        top: 15vh;
        left: 10%;
        box-shadow: 2px 3px 16px rgba(0,0,0,0.1);
        text-align: center;
        border-radius: 20px;
        padding-block: 10px;
        box-sizing: border-box;
        background: white;
        font-family: Inter;
     `,
    // Style the SVG element
    'svg': `
        width: 100%;
        height: 70vh;
        background: white;
        padding: 0px;
        margin: 0px;
      `,

    '.modal': `
        width: 82%;
        height: 240px;
        position: fixed;
        top: 7vh;
        left: 10%;
        box-shadow: 2px 3px 16px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        text-align: center;
        padding-block: 15px;
        box-sizing: border-box;
        background: white;
        font-family: Inter;
      `,

    ".modal button": `
        width: 84%;
        height: 45px;
        border: none;
        background: rgba(80, 157, 255);
        color: white;
        border-radius: 15px;
        margin-top: 5px;
      `,

    '.modal input': `
       width: 84%;
       height: 18%;
       margin-top: 15px;
       border: 2px solid rgba(0,0,0,.1);
       border-radius: 10px;
       font-family: Inter;
       outline: none;
       color: rgba(19, 40, 67, 1);
       box-sizing: inherit;
       padding-left: 15px;
      `,

    'input:hover': `
      border-color: rgb(80, 157, 255);
    `,
    'input::placeholder': `
      color: rgba(0,0,0,0.3);
    `,
    '.modal .bx-x' : `
      position: absolute;
      top: 10px;
      right: 10px;
      color: rgba(19, 40, 67, 1);
      font-size: 20px;
    `,
    // Style the foreignObject element to allow vertical scrolling
    'foreignObject': 'overflow: scroll; padding-bottom: 50px;',
    'foreignObject *': 'font-family: serif',

    '#modal span': 'margin-bottom: 10px;',

    '#modal .btns': 'height: 30%;'
  },
  // Disable strict mode for the component, allowing HTML strings to be rendered directly
  useStrict: false
});

// Export the Canvas component as the default export
export default Canvas;