// Import subComponent from QueFlow
const { subComponent } = QueFlow;

// Create a 'How to Use' subcomponent
const HTU = new subComponent({
  data: {
    text: "Click on this plus icon to add an element",
    x: 30,
    y: 100
  },
  template: () => {
    return `
      <div id='container' left={{ this.data.x }} top={{ this.data.y }}> 
        <Text { text: "{{ this.data.text }}", size: 13, weight: 300, color: "black" } />
      </div>
    `
  },
  
  stylesheet: {
    "#container" : `
      width: 90%;
      height: 60px;
      position: fixed;
      background: transparent;
    `
  }
});

globalThis.HTU = HTU;

export default HTU;