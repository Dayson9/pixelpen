import Menu from './Menu.js'; // Import the Menu component
import NoticeModal from './NoticeModal.js'; // Import the NoticeModal component

const { subComponent } = QueFlow; // Import the subComponent class from QueFlow

// Define a new subComponent called Header
const Header = new subComponent("Header", {
  // Define reactive data
  data: {
    hideShowIcon: 'bx-hide' // property for toggling the menu icon class
  },
  // Define the template for the Header component
  template: () => `
    <div id='container'>
      <div class='left'>
        <Text { text: 'PixelPen', weight: 600, size: 18, color: 'white', font: '"Bangers"' } />
      </div>
      <div class='right'>
        <div class='plus' onclick={{ openElementMenu(false); }}>
          <i class='bx bx-plus'></i>
        </div>
       <div class='ham' color='white' onclick={{ toggleHighlighter(); }}>
         <i class={{ 'bx '+this.data.hideShowIcon }}></i>
       </div>
        <Menu/>
      </div>
      <NoticeModal/>
    </div>
    <HowToUse/>
  `,
  // Define the stylesheet for the Header component
  stylesheet: {
    '#container' : `
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      background: rgb(80, 157, 255);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `,
    '#container > *' : 'position: relative;',
    '.left, .right' : 'height: 100%;', // Set height for left and right sections
    '.left' : `
      width: 40%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background: rgba(34, 70, 116, .7);
      border-radius: 50px;
      margin-left: 5px;
      border: 2px solid rgba(34, 70, 116, 1);
    `,
     '.left span' : `
      font-size: 18px;
      letter-spacing: 4px;
     `
    ,
    '.right' : `
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
    '.ham': `
       width: 50px;
       height: 50px;
       border-radius: 50%;
       background: rgba(34, 70, 116, 1);
       display: flex;
       align-items: center;
       justify-content: center;
       box-sizing: border-box;
        `,
    '@media (min-width: 768px)' : {
      '.left' : 'width: 25%;',
      '#container' : 'height: 11vh;'
    }
  }
});

// Export the Header component
export default Header;