// Import the subComponent constructor from QueFlow.
const { subComponent } = QueFlow;

// Create a new subComponent instance named 'Footer'.
const Footer = new subComponent("Footer", {
  // Define the reactive data
  data: {
    modalDisplay: 'none', 
    modalTitle: 'InnerText',
    modalPlaceholder: 'Hello World',
    modalInputValue: ''
  },
  // Define the template for the Footer component.
  template: () => `
      <div id='container' z-index='2'>
        <SlidingIcons { isLowerIcons: true } />
        <InputModal
          { title: '{{ this.data.modalTitle }}', 
          id: 'footer-input', 
          placeholder: '{{ this.data.modalPlaceholder }}', 
          value: '{{ this.data.modalInputValue }}', 
          click: 'reset();' } />
      </div>
  `,
  // Define the stylesheet for the Footer component.
  stylesheet: {
    // Style for the container element.
    '#container': `
      width: 100%;
      height: 52px;
      box-sizing: border-box;
      background: rgba(80, 157, 255, 0.2);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      transform: translateY(-10px);
      position: fixed;
      bottom: -10px
    `,
    // Style for the slider element.
    '.slider': `
       transform: translateY(-2px);
    `,
    '@media (min-width: 768px)': {
      '#container' : 'height: 10vh'
    }
  }
});

// Export the Footer component as the default export.
export default Footer;