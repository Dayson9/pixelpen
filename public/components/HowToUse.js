const { subComponent } = QueFlow;

const HowToUse = new subComponent('HowToUse', {
  template: () => {
    return `
      <div id='htu'>
        <h2>How to use</h2>
        
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
    `
  }
});

export default HowToUse;