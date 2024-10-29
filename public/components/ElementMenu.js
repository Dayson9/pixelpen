const { subComponent } = QueFlow;

const ElementMenu = new subComponent({
  data: {
    display: "none"
  },
  template: () => {
    return `
      <div id='container' display={{ this.data.display }}>
        <div class='header'>
          <p>Elements</p>
          <span class='cancel' onclick={{ this.data.display = "none" }}>×</span>
        </div>
        <VerticalScrollList { list: ["div", "h1", "h2", "h3", "h4", "h5", "h6", "button", "input", "p", "span", "i", "pre", "img" ] } />
        <TextField  { width: 63, height: 27, border: 'dodgerblue', color: 'rgba(0,0,0,0.6)', placeholder: 'img', id: '#', value: '#' } />
      </div>
    `
  },
  stylesheet: {
    "#container" : `
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
    ".header" : `
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
    ".header .cancel" : `
      font-size: 25px;
    `
  }
});

globalThis["ElementMenu"] = ElementMenu;

export default ElementMenu;