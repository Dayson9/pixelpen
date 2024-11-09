// Import the subComponent constructor from QueFlow
const { subComponent } = QueFlow;

// Create a new subComponent instance named 'Canvas'
const Canvas = new subComponent({
  // Define reactive data for the Canvas component
  data: {
    // An empty string to store the HTML content to be rendered
    html: "",
    containerBG: localStorage.getItem("pxp-canvas-bg") || "white",
    modalDisplay: "none",
    screenBlur: 7
  },
  // Define the template for the Canvas component
  template: () => `
       <div id='plus' onclick={{ this.data.modalDisplay = "block" }}  position='fixed' left='10px' bottom='12vh' background='rgba(34, 70, 116, .5)'>
         <i class='bx bx-paint-roll' color='white'></i>
       </div>
       <!-- Create input modal for changing background of canvas -->
       <div id='modal' display={{ this.data.modalDisplay }}>
         <Text { text: "Background", weight: 650, size: 17, color: 'rgba(19, 40, 67, 1)' } />
         
         <TextField { width: 63, height: 57, border: 'dodgerblue', color: 'rgba(0,0,0,0.6)', placeholder: 'white', value: '{{ this.data.containerBG }}', id: 'cbg', input: "canvasContainer.style.background = cbg.value;" } />
         
          <div class='btns'>
            <button onclick={{ this.data.modalDisplay = 'none' }}>Cancel</button>
            <button background-color='rgb(80, 157, 255)' onclick={{ saveCanvasBG(cbg.value); this.data.modalDisplay = 'none'; }}>Done</button>
          </div>
       </div>
       
       <svg id='main-c'>
        <!-- Create a foreignObject element to embed HTML content within -->
        <foreignObject x="0" y="0" width="100vw" height="100%" id='out' onclick={{ Highlighter.data.display='none'; }} filter={{ "blur("+this.data.screenBlur+"px)" }}>{{ this.data.html }}</foreignObject>
       </svg>
      `,
  // Define the stylesheet for the Canvas component
  stylesheet: {
    "#modal": `
        width: 80%;
        height: 190px;
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
    "svg": `
        width: 100%;
        height: 70vh;
        background: white;
        padding: 0px;
        margin: 0px;
      `,
    // Style the foreignObject element to allow vertical scrolling
    "foreignObject": "overflow-y: scroll; padding-bottom: 50px;",
    // Style all child elements of the foreignObject to ensure consistent box sizing
    "foreignObject *": `
        box-sizing: border-box;
      `,
      
    "#modal span" : "margin-bottom: 10px;",
    
    "#modal .btns" : "height: 30%;"
  },
  // Disable strict mode for the component, allowing HTML strings to be rendered directly
  useStrict: false
});

// Make the Canvas component globally accessible
globalThis["Canvas"] = Canvas;

// Export the Canvas component as the default export
export default Canvas;