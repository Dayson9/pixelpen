// Import the subComponent class from QueFlow.
const { subComponent } = QueFlow;

// Create a new subComponent instance named Highlighter.
const Highlighter = new subComponent({
  // Define reactive data
  data: {
    // Horizontal offset from the parent container.
    offsetX: 0, 
    // Vertical offset from the parent container.
    offsetY: 75, 
    // Width of the highlighter element.
    width: 160, 
    // Height of the highlighter element.
    height: 80, 
    // Display state of the highlighter element.
    display: 'none' 
  },

  // Define the template for the Highlighter component.
  template: () => {
    // Return a string containing the HTML structure of the component.
    return `
      <div id='highlighter' width={{ this.data.width+'px' }} height={{ this.data.height+'px' }} left={{ this.data.offsetX+'px' }} top={{ this.data.offsetY+'px' }} display={{ this.data.display }}></div>
    `
  },

  // Define the stylesheet for the Highlighter component.
  stylesheet: {
    // Apply styles to the '#highlighter' element.
    '#highlighter': `
      background: transparent;
      border: 1px solid silver;
      outline: 1px solid white;
      position: absolute;
      top: 0;
      left: 0;
    `
  }
});

// Make the Highlighter component globally accessible.
globalThis['Highlighter'] = Highlighter;

// Export the Highlighter component as the default export.
export default Highlighter;