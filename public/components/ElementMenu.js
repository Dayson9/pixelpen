// Import the subComponent constructor from QueFlow.
const { subComponent } = QueFlow;

// Create a new subComponent instance called ElementMenu.
const ElementMenu = new subComponent({
  // Define reactive data for the component.
  data: {
    // Initially set the display to 'none' to hide the menu.
    display: 'none'
  },
  // Define the template for the component's HTML structure.
  template: () => {
    return `
      <!-- Container div with dynamic display based on data.display -->
      <div id='container' display={{ this.data.display }}>
      <!-- Header div for the menu -->
        <div class='header'>
        <!-- Text component with 'Elements' text -->
          <Text { text: 'Elements', weight: 600, size: 18, color: 'white' } /> 
          <!-- Cancel button to hide the menu -->
          <span class='cancel' onclick={{ this.data.display = 'none' }}>×</span>
        </div>
        <!-- VerticalScrollList to display HTML elements -->
        <VerticalScrollList { list: ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'input', 'p', 'span', 'i', 'pre', 'img', 'header', 'article', 'main', 'footer', 'aside', 'ul', 'ol', 'code', 'blockquote', 'cite', 'select', 'option', 'iframe', 'hr'] } />
      </div>
    `
  },
  // Define the stylesheet for the component.
  stylesheet: {
    '#container': `
       width: 210px;
       height: 260px;
       border-radius: 10px;
       background: white;
       box-shadow: 2px 4px 16px rgba(0,0,0,0.1);
       position: fixed;
       bottom: 20px;
       z-index: 1;
       text-align: center;
    `,
    // Styles for the container div.
    '.header': `
      width: 100%;
      height: 60px;
      background: rgba(80, 157, 255);
      color: white;
      border-radius: 10px 10px 0px 0px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-inline: 10px;
    `,
    // Styles for the header div.
    '.header .cancel': `
      font-size: 25px;
    `
    // Styles for the cancel button within the header.
  }
});

// Make the ElementMenu component globally accessible.
globalThis['ElementMenu'] = ElementMenu;

// Export the ElementMenu component as the default export.
export default ElementMenu;