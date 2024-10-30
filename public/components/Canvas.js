const { subComponent } = QueFlow;

const Canvas = new subComponent({
  data: {
    html: ""
  },
  template: () => `
     <svg>
      <foreignObject x="0" y="0" width="100vw" height="100%" id='out'>{{ this.data.html }}</foreignObject>
     </svg>
    `,
  stylesheet: {
    "svg" : `
      width: 100%;
      height: 70vh;
      background: white;
      padding: 0px;
      margin: 0px;
    `,
    
    "foreignObject *" : `
      box-sizing: border-box;
      overflow-y: scroll;
    `
  },
  useStrict: false
});

globalThis["Canvas"] = Canvas;

export default Canvas;