const { subComponent } = QueFlow;

const Header = new subComponent({
  data: {
    
  },
  template: () => `
    <div id='container'>
      <div class='left'>
        <img src=''/>
        <i class='bx bx-plus'></i>
      </div>
      <div class='right'>
        <RowIcon { iconsClass: [ { iclass: "bx-home" }, { iclass: "bx-car" }, { iclass: "bx-pen" }] } />
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
      width: 65%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `,
    ".right" : `
      width: 50%;
      padding-inline: 12px;
      padding-block: 5px;
      box-sizing: border-box;
      color: white;
    `,
    ".left i" : `
      font-size: 35px;
      font-weight: 800;
      color: rgba(80, 157, 255);
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: white;
      padding: 4px 4px 0px;
      box-sizing: border-box;
    `
  }
});

globalThis["Header"] = Header;

export default Header;