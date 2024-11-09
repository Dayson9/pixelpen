// Import the subComponent constructor from QueFlow.
const { subComponent } = QueFlow;

// Create a new CodeView component using the subComponent function.
const CodeView = new subComponent({
  // Define the reactive data for the component.
  data: {
    // Data for HTML code.
    html: {
      // Color of the HTML text.
      color: "rgba(19, 40, 67, 1)",
      // HTML code to be displayed.
      code: ""
    },
    // Data for CSS code.
    css: {
      // Color of the CSS text.
      color: "rgba(0,0,0,0.5)",
      // CSS code to be displayed.
      code: ""
    },
    // Data for the fluid slider.
    fluid: {
      // X-position of the slider.
      x: 0,
      // Width of the slider.
      width: 50
    },
    // Opacity of the toast message
    toastOpacity: 0,
    // Flag to show or hide the code view.
    show: false,
    // Flag to indicate whether HTML or CSS code is currently displayed.
    isHTML: true
  },

  // Define the template for the component.
  template: () => {
    return `
      <div id='container' display={{ this.data.show ? "block" : "none" }}>
        <span id='cancel' onclick={{ Canvas.data.screenBlur = 0; this.data.show = false; }}>×</span>
        <Text { text: "Code Preview", size: 20, weight: 600, color: "rgba(19, 40, 67, 1)" } />
       <div id='col'>
        <div id='row'>
          <Text { text: "HTML", size: 20, weight: 400, color: "{{ this.data.html.color }}", click: "openHTML()" } />
          <Text { text: "CSS", size: 20, weight: 400, color: "{{ this.data.css.color }}", click: "openCSS()" } />  
        </div>
        
        <div id='fluid'>
          <div width={{ this.data.fluid.width+"%" }} transform={{ "translateX("+this.data.fluid.x+"px)" }}></div>
        </div>
       </div>
       <div id='code'>
        <i class='bx bx-copy' onclick={{ copyToClipboard(code.innerText) }} id='copy'></i>
         <Text { text: "{{ this.data.isHTML ? this.data.html.code : this.data.css.code }}", size: 14, weight: 300, color: "rgba(19, 40, 67, 1)", family: "Monospace" } />
       </div>
       <div class='toast' opacity={{ this.data.toastOpacity }} transition={{ ".5s" }}>
         <Text { text: "Copied", color: "white", size: 12, weight: 300 } />
       </div>
      </div>
    `
  },

  // Define the stylesheet for the component.
  stylesheet: {
    // Styles for the container element.
    "#container" : `
        width: 80%;
        height: 370px;
        position: fixed;
        top: 7vh;
        left: 10%;
        box-shadow: 2px 3px 16px rgba(0, 0, 0, 0.1);
        text-align: center;
        border-radius: 20px;
        padding-block: 10px;
        box-sizing: border-box;
        background: white;
        font-family: Inter;
        z-index: 2;
    `,

    // Styles for the row element.
    "#row" : `
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
    `,

    // Styles for the column element.
    "#col" : `
      width: 80%;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin: 15px auto;
    `,

    // Styles for the fluid slider element.
    "#fluid" : `
      width: 83%;
      height: 6px;
      border-radius: 4px;
      background: rgba(0,0,0,0.2);
      box-sizing: border-box;
    `,

    // Styles for the slider bar.
    "#fluid div" : `
      width: 50%;
      height: 100%;
      border-radius: inherit;
      background: rgb(80, 157, 255);
      transition: .4s;
    `,

    // Styles for the code display area.
    "#code": `
      width: 82%;
      height: 70%;
      border-radius: inherit;
      background: rgba(0,0,0,0.1);
      margin: 0px auto;
      overflow-y: scroll;
      text-align: left;
      padding-left: 20px;
      word-spacing: 2px;
    `,

    // Styles for the row elements (HTML and CSS).
    "#row span" : `
      transition: .9s;
    `,

    // Styles for the cancel button.
    "#cancel" : `
      font-size: 28px;
      position: absolute;
      right: 10px;
      top: 5px;
      color: rgba(19, 40, 67, 1);
    `,

    // Styles for the copy button.
    "#copy" : `
      font-size: 25px;
      position: absolute;
      right: 12%;
      top: 30%;
      color: rgba(19, 40, 67, 1);      
    `,
    ".toast" : `
      max-width: 70px;
      height: auto;
      padding-inline: 2px;
      padding-block: 4px;
      background: rgb(20, 30, 50);
      border-radius: 20px;
      margin: -50px auto;
    `,

    // Media query for screen sizes larger than 768 pixels.
    "@media (min-width: 768px)" : {
      // Styles for the container element on larger screens.
      "#container" : `
        width: 55%;
        left: 22.5%;
      `
    }
  }
});

// Attach the CodeView component to the global scope.
globalThis.CodeView = CodeView;

// Export the CodeView component as the default export.
export default CodeView;