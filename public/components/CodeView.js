// Import the subComponent function from the QueFlow library.
const { subComponent } = QueFlow;

// Create a new CodeView component using the subComponent function.
const CodeView = new subComponent({
  // Define the initial data for the component.
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
    // Flag to show or hide the code view.
    show: false,
    // Flag to indicate whether HTML or CSS code is currently displayed.
    isHTML: true
  },

  // Define the template for the component.
  template: () => {
    return `
      <div id='container' display={{ this.data.show ? "block" : "none" }}>
        <span id='cancel' onclick={{ this.data.show = false; }}>×</span>
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
      width: 90%;
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
/**

<br>Explanation:<br>

* <br>Import subComponent:<br> The code starts by importing the `subComponent` function from the `QueFlow` library. This function is used to create reusable UI components.
* <br>Create CodeView:<br> A new `CodeView` component is created using the `subComponent` function.
* <br>Data:<br> The `data` property defines the initial state of the component's data. This includes:
    * `html`: Data for HTML code, including its color and content.
    * `css`: Data for CSS code, including its color and content.
    * `fluid`: Data for the slider that controls the view between HTML and CSS.
    * `show`: A flag to control the visibility of the code view.
    * `isHTML`: A flag to indicate whether the current view is HTML or CSS.
* <br>Template:<br> The `template` property defines the HTML structure of the component. This includes:
    * A container element (`#container`) that holds the entire code view.
    * A cancel button (`#cancel`) to close the code view.
    * A title (`Code Preview`) using the `Text` component.
    * A row (`#row`) containing HTML and CSS labels with clickable text elements.
    * A fluid slider (`#fluid`) to switch between HTML and CSS views.
    * A code display area (`#code`) to show the selected code.
    * Copy button (`#copy`) to copy the displayed code to the clipboard.
* <br>Stylesheet:<br> The `stylesheet` property defines the CSS styles for the component. This includes styles for all the elements within the component, including layout, colors, and animations.
* <br>Global Scope:<br> The `globalThis.CodeView = CodeView` line attaches the `CodeView` component to the global scope, making it accessible from anywhere in the application.
* <br>Export:<br> The `export default CodeView` line exports the `CodeView` component as the default export, allowing it to be imported and used in other parts of the application.

<br>Key Points:<br>

* The code uses a combination of HTML, CSS, and JavaScript to create a dynamic and interactive code view component.
* The `subComponent` function provides a convenient way to create reusable components with data, templates, and styles.
* The component uses a fluid slider to seamlessly switch between HTML and CSS views.
* The code includes media queries to adjust the layout of the component for different screen sizes.
* The component provides functionality to copy the displayed code to the clipboard using the `copyToClipboard()` function.

This code provides a well-structured and commented example of how to create a reusable code view component using the QueFlow library. It demonstrates how to use the `subComponent` function, manage component data, define templates, and apply styles. **/