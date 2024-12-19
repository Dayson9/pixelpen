const { subComponent } = QueFlow;

const HowToUse = new subComponent('HowToUse', {
  data: {
    display: localStorage.getItem('how-to-use') ? 'none' : 'block'
  },
  template: () => {
    return `
      <div id='htu' display={{ this.data.display }}>
        <h2>How to use</h2>
        <div class='content'>
          <Paragraph { text: "To start, click on the '+' icon, a dropdown list would appear with some elements on it" } />
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
      padding-block: 2px;
      box-sizing: border-box;
      box-shadow: 2px 3px 16px rgba(0,0,0,0.1);
      position: absolute;
      top: 10vh;
      left: ${window.innerWidth <= 768 ? '10%' : '37.5%'};
    `,
    
    '#htu > .content' : `
      width: 95%;
      height: 90%;
      margin: 0 auto;
      overflow-y: scroll;
    `
  }
});

export default HowToUse;