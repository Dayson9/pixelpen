const { subComponent } = QueFlow;

const Menu = new subComponent({
  data: {
    isOpened: false,
    translate: [0, 8, 0]
  },
  template: () => {
    return `
       <div id='ham' onclick={{ openMenu(); }}>
        <div transform="translateX({{ this.data.translate[0] }}px)"></div>
        <div transform="translateX({{ this.data.translate[1] }}px)"></div>
        <div transform="translateX({{ this.data.translate[2] }}px)"></div>
       </div>
       
      <div id='slider' transform="translateX({{ this.data.isOpened ? -105 : 58 }}%)">
        <i class='bx bx-trash' onclick={{ deleteElement(); }}></i>
        <i class='bx bx-brush' onclick={{ clearCanvas(); }}></i>
        <i class='bx bx-copy' onclick={{ cloneElement(); }}></i>
        <i class='bx bx-download' onclick={{ saveAsFile(); }}></i>
      </div>
    `
  },
  stylesheet: {
    "#ham": `
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(34, 70, 116, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      padding-block: 6px;
      box-sizing: border-box;
    `,

    "#ham div": `
      width: 60%;
      height: 2px;
      background: white;
      border-radius: 2px;
      transition: .5s;
    `,
    
    "#slider" : `
      width: 50%;
      height: 50px;
      background: grey;
      position: absolute;
      top: 5px;
      border-radius: 50px;
      background: rgba(34, 70, 116, 1);
      transition: .5s;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    `,
    "#slider i" : `
      font-size: 1.2em;
    `,
    "@media (min-width: 768px)" : {
      "#slider" : `
        width: 30%;
      `
    }
  }
});

globalThis.Menu = Menu;

export default Menu;