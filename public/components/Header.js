import Menu from './Menu.js';
import NoticeModal from './NoticeModal.js';

const { subComponent } = QueFlow;

const Header = new subComponent({
  data: {
    hideShowIcon: "bx-hide"
  },
  template: () => `
    <div id='container'>
      <div class='left' color='white'>
        <Text { text: "PixelPen", weight: 600, size: 18, color: 'white', font: '"Bangers"' } /> 
      </div>
      <div class='right'>
        <div id='plus' onclick={{ openElementMenu(false); }}>
          <i class='bx bx-plus'></i>
        </div>
       <div class='ham' color='white' onclick={{ toggleHighlighter(); }}>
         <i class={{ "bx "+this.data.hideShowIcon }}></i>
       </div>
        <Menu/>
      </div>
      <NoticeModal/>
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
      width: 40%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background: rgba(34, 70, 116, .7);
      border-radius: 50px;
    `,
     ".left span" : `
      font-size: 18px;
     `
    ,
    ".right" : `
      width: 44%;
      padding-block: 5px;
      box-sizing: border-box;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-left: 40px;
    `,
    ".ham": `
       width: 50px;
       height: 50px;
       border-radius: 50%;
       background: rgba(34, 70, 116, 1);
       display: flex;
       align-items: center;
       justify-content: center;
       box-sizing: border-box;
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