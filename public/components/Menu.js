// Import the subComponent class from QueFlow
const { subComponent } = QueFlow;

// Define the Menu component
const Menu = new subComponent("Menu", {
  // Define the reactive data
  data: {
    // Flag to indicate whether the menu is open or not
    isOpened: false,
    // Translation values for the menu icon
    translate: [0, 8, 0]
  },
  // Template function to return the HTML structure of the component
  template: () => {
    return `
       <div class='ham' id='ham' onclick={{ toggleMenu(); }}>
        <div transform={{ 'translateX('+this.data.translate[0]+'px)' }}></div>
        <div transform={{ 'translateX('+this.data.translate[1]+'px)' }}></div>
        <div transform={{ 'translateX('+this.data.translate[2]+'px)' }}></div>
       </div>
       
      <div id='slider' transform='translateX({{ this.data.isOpened ? -105 : 58 }}%)'>
        <i class='bx bx-trash' onclick={{ openModal('Delete Element', 'Are you sure you want to delete this element?', 'Delete'); }}></i>
        <i class='bx bx-brush' onclick={{ openModal('Clear Canvas', 'This action is irreversible?', 'Clear'); }}></i>
        <i class='bx bx-copy' onclick={{ openModal('Clone Element', 'Clone the selected element?', 'Clone'); }}></i>
         <i class='bx bx-code-alt' onclick={{ openCodeView(); }}></i>
        <i class='bx bx-download' onclick={{ saveAsFile(); }}></i>
        <i class='bx bx-question-mark' onclick={{ openHTU(); }}></i>
      </div>
    `
  },
  // Stylesheet object to define the CSS styles for the component
  stylesheet: {
    // Styles for the hamburger menu container
    '#ham': `
      flex-direction: column;
      align-items: center;
      padding-block: 6px;
      justify-content: space-evenly;
      padding-block: 6px;
    `,
    // Styles for each line of the hamburger menu
    '#ham div': `
      width: 60%;
      height: 2px;
      background: white;
      border-radius: 2px;
      transition: .5s;
    `,
    // Styles for the sliding menu container
    '#slider': `
      width: 60%;
      height: 50px;
      background: grey;
      position: fixed;
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
    '#slider i': `
      font-size: 1.2em;
    `,
    // Media query for larger screens
    '@media (min-width: 768px)': {
      // Adjust width of sliding menu for larger screens
      '#slider': `
        width: 30%;
      `
    }
  }
});

// Export the Menu component as default
export default Menu;