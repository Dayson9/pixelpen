import Menu from './Menu.js';
const { subComponent } = QueFlow;

const Header = new subComponent({
  data: {
    
  },
  template: () => `
    <div id='container'>
      <div class='left'>
        <img src=''/>
      </div>
      <div class='right'>
        <div id='plus'>
          <i class='bx bx-plus' onclick={{ ElementMenu.data.display="block" }}></i>
        </div>
        <Menu/>
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
      width: 40%;
      padding-inline: 12px;
      padding-block: 5px;
      box-sizing: border-box;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `,
    "#plus i" : `
      font-size: 35px;
      font-weight: 800;
      color: rgba(80, 157, 255);
    `,
    "#plus" : `
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    `
  }
});

globalThis["Header"] = Header;

export default Header;