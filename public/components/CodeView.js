const { subComponent } = QueFlow;

const CodeView = new subComponent({
  data: {
    html: {
     color: "rgba(19, 40, 67, 1)",
     code: ""
    },
    css: {
      color: "rgba(0,0,0,0.5)",
      code: ""
    },
    fluid: {
      x: 0,
      width: 50
    },
    show: false,
    isHTML: true
  },
  
  template: () => {
    return `
      <div id='container' display={{ this.data.show ? "block" : "none" }}>
        <span id='cancel' onclick={{ this.data.show = false; }}>×</span>
        <Text { text: "Code Preview", size: 20, weight: 600, color: "rgba(19, 40, 67, 1)" } />
       <div id='col'>
        <div id='row'>
          <Text { text: "HTML", size: 20, weight: 400, color: "{{ this.data.html.color }}", click: "openHTML()" } />
          <Text { text: "CSS", size: 20, weight: 400, color: "{{ this.data.css.color }}", click: "openCSS()" } />  
        </div>
        
        <div id='fluid'>
          <div width={{ this.data.fluid.width+"%" }} transform={{ "translateX("+this.data.fluid.x+"px)" }}></div>
        </div>
       </div>
       <div id='code'>
        <i class='bx bx-copy' onclick={{ copyToClipboard(code.innerText) }} id='copy'></i>
         <Text { text: "{{ this.data.isHTML ? this.data.html.code : this.data.css.code }}", size: 14, weight: 300, color: "rgba(19, 40, 67, 1)", family: "Monospace" } />
       </div>
      </div>
    `
  },
  
  stylesheet: {
    "#container" : `
        width: 80%;
        height: 370px;
        position: fixed;
        top: 7vh;
        left: 10%;
        box-shadow: 2px 3px 16px rgba(0, 0, 0, 0.1);
        text-align: center;
        border-radius: 20px;
        padding-block: 10px;
        box-sizing: border-box;
        background: white;
        font-family: Inter;
    `,
    
    "#row" : `
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
    `,
    
    "#col" : `
      width: 80%;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin: 15px auto;
    `,
    
    "#fluid" : `
      width: 83%;
      height: 6px;
      border-radius: 4px;
      background: rgba(0,0,0,0.2);
      box-sizing: border-box;
    `,
    
    "#fluid div" : `
      width: 50%;
      height: 100%;
      border-radius: inherit;
      background: rgb(80, 157, 255);
      transition: .4s;
    `,
    
    "#code": `
      width: 90%;
      height: 70%;
      border-radius: inherit;
      background: rgba(0,0,0,0.1);
      margin: 0px auto;
      overflow-y: scroll;
      text-align: left;
      padding-left: 20px;
      word-spacing: 10px;
    `,
    
    "#row span" : `
      transition: .9s;
    `,
    
    "#cancel" : `
      font-size: 28px;
      position: absolute;
      right: 10px;
      top: 5px;
      color: rgba(19, 40, 67, 1);
    `,
    
    "#copy" : `
      font-size: 25px;
      position: absolute;
      right: 12%;
      top: 30%;
      color: rgba(19, 40, 67, 1);      
    `,
    
    "@media (min-width: 768px)" : {
      "#container" : `
        width: 55%;
        left: 22.5%;
      `
    }
  }
});

globalThis.CodeView = CodeView;

export default CodeView;