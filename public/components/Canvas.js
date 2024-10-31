const { subComponent } = QueFlow;

const Canvas = new subComponent({
  data: {
    html: ""
  },
  template: () => `
     <svg>
      <foreignObject x="0" y="0" width="100vw" height="100%" id='out' onclick={{ Highlighter.data.display='none'; }}>{{ this.data.html }}</foreignObject>
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
    "foreignObject" : "overflow-y: scroll",
    "foreignObject *" : `
      box-sizing: border-box;
    `
  },
  useStrict: false
});

globalThis["Canvas"] = Canvas;
export default Canvas;