const { subComponent } = QueFlow;

const Highlighter = new subComponent({
  data: {
    offsetX: 0,
    offsetY: 75,
    width: 160,
    height: 80,
    display: "none"
  },
  template: () => {
    return `
      <div id="highlighter" width={{ this.data.width+"px" }} height={{ this.data.height+"px" }} left={{ this.data.offsetX+"px" }} top={{ this.data.offsetY+"px" }} display={{ this.data.display }}></div>
    `
  },
  stylesheet: {
    "#highlighter" : `
      background: transparent;
      border: 1px solid silver;
      outline: 1px solid white;
      position: absolute;
      top: 0;
      left: 0;
    `
  }
});

globalThis["Highlighter"] = Highlighter;

export default Highlighter;