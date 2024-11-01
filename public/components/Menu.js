// Import the subComponent function from QueFlow library
const { subComponent } = QueFlow;

// Define the Menu component
const Menu = new subComponent({
  // Define the initial data for the component
  data: {
    // Flag to indicate whether the menu is open or not
    isOpened: false,
    // Initial translation values for the hamburger menu
    translate: [0, 8, 0]
  },
  // Template function to return the HTML structure of the component
  template: () => {
    return `
       <div class='ham' id='ham' onclick={{ toggleMenu(); }}>
        <div transform={{ "translateX("+this.data.translate[0]+"px)" }}></div>
        <div transform={{ "translateX("+this.data.translate[1]+"px)" }}></div>
        <div transform={{ "translateX("+this.data.translate[2]+"px)" }}></div>
       </div>
       
      <div id='slider' transform="translateX({{ this.data.isOpened ? -105 : 58 }}%)">
        <i class='bx bx-trash' onclick={{ openModal("Delete Element", "Are you sure you want to delete this element?", "Delete"); }}></i>
        <i class='bx bx-brush' onclick={{ openModal("Clear Canvas", "This action is irreversible?", "Clear"); }}></i>
        <i class='bx bx-copy' onclick={{ openModal("Clone Element", "Clone the selected element?", "Clone"); }}></i>
         <i class='bx bx-code-alt' onclick={{ openCodeView(); }}></i>
        <i class='bx bx-download' onclick={{ saveAsFile(); }}></i>
      </div>
    `
  },
  // Stylesheet object to define the CSS styles for the component
  stylesheet: {
    // Styles for the hamburger menu container
    "#ham": `
      flex-direction: column;
      align-items: center;
      padding-block: 6px;
      justify-content: space-evenly;
      padding-block: 6px;
    `,
    // Styles for each line of the hamburger menu
    "#ham div": `
      width: 60%;
      height: 2px;
      background: white;
      border-radius: 2px;
      transition: .5s;
    `,

    // Styles for the sliding menu container
    "#slider": `
      width: 50%;
      height: 50px;
      background: grey;
      position: absolute;
      top: 5px;
      border-radius: 50px;
      background: rgba(34, 70, 116, 1);
      transition: .5s;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    `,
    // Styles for the icons within the sliding menu
    "#slider i": `
      font-size: 1.2em;
    `,
    // Media query for larger screens
    "@media (min-width: 768px)": {
      // Adjust width of sliding menu for larger screens
      "#slider": `
        width: 30%;
      `
    }
  }
});

// Make the Menu component accessible globally
globalThis.Menu = Menu;

// Export the Menu component as default
export default Menu;

/**
<br>Explanation:<br>

- <br>Import subComponent:<br> This line imports the `subComponent` function from the `QueFlow` library, which is used to create reusable components.
- <br>Create Menu component:<br> This line creates a new instance of the `subComponent` function, passing in an object that defines the properties of the Menu component.
- <br>Data object:<br> This object contains the initial data for the component, including `isOpened` flag and the initial translation values for the hamburger menu.
- <br>Template function:<br> This function returns the HTML structure of the component, including the hamburger menu and the sliding menu.
- <br>Stylesheet object:<br> This object contains the CSS styles for the component, including styles for the hamburger menu container, each line of the hamburger menu, the sliding menu container, and the icons within the sliding menu.
- <br>Media query:<br> This media query adjusts the width of the sliding menu for larger screens.
- <br>Global access:<br> This line makes the Menu component accessible globally by assigning it to the `globalThis` object.
- <br>Export Menu:<br> This line exports the Menu component as the default export of the module.

<br>In addition to the comments above, here are some other important points to note:<br>

- The code uses a `transform` attribute to control the translation of the hamburger menu lines.
- The sliding menu uses a conditional `transform` attribute to position it either off-screen or visible based on the `isOpened` flag.
- The `openModal`, `openCodeView`, and `saveAsFile` functions are assumed to be defined elsewhere in the project.

Overall, this code defines a reusable menu component that can be used in any web application that requires a hamburger menu and a sliding menu. **/