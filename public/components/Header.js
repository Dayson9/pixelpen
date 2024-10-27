const { subComponent } = QueFlow;

const Header = new subComponent({
  data: {
    
  },
  template: () => `
    <div id='container'>
      <div class='left'></div>
      <div class='right'>
        <RowIcon { iconsClass: [ { iclass: "bx-bus" }, { iclass: "bx-car" }, { iclass: "bx-pen" }] } />
        <RowIcon { iconsClass: [{ iclass: "bx-edit" }, { iclass: "bx-rocket" }, { iclass: "bx-bell" }] } />
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
      width: 50%;
      padding-inline: 12px;
      padding-block: 5px;
      box-sizing: border-box;
      color: white;
    `,
    ".row" : `
      
    `
  }
});

globalThis["Header"] = Header;

export default Header;