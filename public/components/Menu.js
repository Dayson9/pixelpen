const { subComponent } = QueFlow;

const Menu = new subComponent({
  data: {
    isOpened: false,
    translate: [0, 8, 0]
  },
  template: () => {
    return `
       <div class='ham' id='ham' onclick={{ toggleMenu(); }}>
        <div transform={{ "translateX("+this.data.translate[0]+"px)" }}></div>
        <div transform={{ "translateX("+this.data.translate[1]+"px)" }}></div>
        <div transform={{ "translateX("+this.data.translate[2]+"px)" }}></div>
       </div>
       
      <div id='slider' transform="translateX({{ this.data.isOpened ? -105 : 58 }}%)">
        <i class='bx bx-trash' onclick={{ openModal("Delete Element", "Are you sure you want to delete this element?", "Delete"); }}></i>
        <i class='bx bx-brush' onclick={{ openModal("Clear Canvas", "This action is irreversible?", "Clear"); }}></i>
        <i class='bx bx-copy' onclick={{ openModal("Clone Element", "Clone the selected element?", "Clone"); }}></i>
         <i class='bx bx-code-alt' onclick={{ openCodeView(); }}></i>
        <i class='bx bx-download' onclick={{ saveAsFile(); }}></i>
      </div>
    `
  },
  stylesheet: {
    "#ham": `
      flex-direction: column;
      align-items: center;
      padding-block: 6px;
      justify-content: space-evenly;
      padding-block: 6px;
    `,
    "#ham div": `
      width: 60%;
      height: 2px;
      background: white;
      border-radius: 2px;
      transition: .5s;
    `,

    "#slider": `
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
    "#slider i": `
      font-size: 1.2em;
    `,
    "@media (min-width: 768px)": {
      "#slider": `
        width: 30%;
      `
    }
  }
});

globalThis.Menu = Menu;

export default Menu;