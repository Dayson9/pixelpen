const { subComponent } = QueFlow;

const Canvas = new subComponent({
  data: {

  },
  template: () => `
     <svg>
      <foreignObject x="0" y="0" width="100vw" height="100%">
        <h1 width='240px' height='150px' background='slateblue'>Hello</h1>
      </foreignObject>
     </svg>
    `,
  stylesheet: {
    "svg" : `
      width: 100%;
      height: 70vh;
      background: white;
      padding: 0px;
      margin: 0px;
    `
  }
});

globalThis["Canvas"] = Canvas;

export default Canvas;