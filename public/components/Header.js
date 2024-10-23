const { subComponent } = QueFlow;

const Header = new subComponent({
  data: {
    
  },
  template: () => `
    <div id='container'>
      <div class='left'></div>
      <div class='right'>
        <RowIcon { class: ["fa-house", "bx-jet", "fa-cloth"] } />
        <RowIcon { class: ["fa-house", "bx-jet", "fa-cloth"] } />
      </div>
    </div>
  `,
  stylesheet: {
    "#container" : `
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      background: rgb(80, 157, 255);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `,
    ".left, .right" : "height: 100%;",
    ".left" : `
      width: 20%;
    `,
    ".right" : `
      width: 70%;
      padding-inline: 5px;
      padding-block: 5px;
      box-sizing: border-box;
      background: silver;
    `,
    ".row" : `
      
    `
  }
});

globalThis["Header"] = Header;

export default Header;