const { subComponent } = QueFlow;

const HowToUse = new subComponent('HowToUse', {
  data: {
    display: localStorage.getItem('how-to-use') ? 'none' : 'block'
  },
  template: () => {
    return `
      <div id='htu' display={{ this.data.display }}>
        <h2>How to use</h2>
        <i class='bx bx-x' onclick={{ this.data.display = 'none'; Canvas.data.screenBlur = 0; }}></i>
        <div class='content'>
        <ul>
          <List { text: "To start, click on the '+' icon, a dropdown list would appear with some elements on it. Click on any element to add it to the canvas." } />
          
          <List { text: "Clicking on an element in the white Canvas selects it, which makes a line (selector) appear around it, before it can be styled." } />
          
          <List { text: "Beside the plus icon at the top bar, there's an eye icon. Clicking on it shows/hides the selector." } />
          
          <List { text: "Beside the eye icon, there's a menu. When clicked, it opens a slider containing these icons 'delete', 'erase', 'copy', 'code', download', and 'how-to-use(?)' respectively. Experiment with any of them to see them in action." } />
          
          <List { text: "To view the code of what you've designed so far. Open the slider menu and tap on the '&lt;/&gt;' icon." } />
          
          <List { text: "The bottom row contains some icons and their respective labels, click on any of them to style the selected element." } />
          
          <List { text: "Just above the 'innerText' icon on the bottom row lies two icons above each other, the first icon when clicked opens a modal which can be used to edit the CSS styles of an element, while the other one when clicked, opens a modal which can be used to edit the 'background' attribute of the canvas." } />
          </ul>
        </div>
      </div>
    `
  },

  stylesheet: {
    '#htu': `
      width: ${window.innerWidth <= 768 ? '80%' : '25%'};
      height: 370px;
      background: white;
      text-align: center;
      z-index: 3;
      border-radius: 10px;
      padding-top: 2px;
      padding-bottom: 10px;
      box-sizing: border-box;
      box-shadow: 2px 3px 16px rgba(0,0,0,0.1);
      position: absolute;
      top: 7vh;
      left: ${window.innerWidth <= 768 ? '10%' : '37.5%'};
      color: rgba(19, 40, 67, 1);
    `,
    
    '#htu > .content' : `
      width: 95%;
      height: 80%;
      margin: 0 auto;
      overflow-y: scroll;
      font-size: 14px;
      box-sizing: border-box;
      text-align: left;
    `,
    
    '#htu i' : `
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 25px;
    `,
    
    ".content ul" : `
      width: 100%;
      height: 100%;
      transform: translateX(-4%);
      box-sizing: inherit;
    `
  }
});

export default HowToUse;