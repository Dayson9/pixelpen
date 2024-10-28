const { subComponent } = QueFlow;


const Footer = new subComponent({
  data: {
    modalDisplay: "flex",
    modalTitle: "InnerText",
    modalPlaceholder: 'Hello World',
    modalInputValue: ''
  },
  template: () => `
      <div id="container">
        <SlidingIcons { iconsClass: \`[
          { iclass: "bx-text", click: "updateElement('InnerText', 'Hello World', 'textContent', true)", prop: "textContent" },
          { iclass: "bx-paint", click: "updateElement('Color', 'crimson', 'color')", prop: "color"},
          { iclass: "bxs-square", click: "updateElement('Background', 'white', 'background')", prop: "background" },
          { text: "↕️", isInverted: true, click: "updateElement('Width', '200px', 'width')", prop: "width" },
          { text: "↕️", click: "updateElement('Height', '150px', 'height')", prop: "height" },
          { iclass: "bxs-paint", click: "updateElement('', '', '')" },
          { iclass: "bxs-pen", click: "updateElement('', '', '')" },
          { iclass: "bxs-square", click: "updateElement('', '', '')" },
          { iclass: "bxs-paint", click: "updateElement('', '', '')" },
          { iclass: "bxs-pen", click: "updateElement('', '', '')" },
          { iclass: "bxs-square", click: "updateElement('', '', '')" },
          { iclass: "bxs-paint", click: "updateElement('', '', '')" },
          { iclass: "bxs-pen", click: "updateElement('', '', '')" },
          { iclass: "bxs-square", click: "updateElement('', '', '')" },
          { iclass: "bxs-paint", click: "updateElement('', '', '')" },
          { iclass: "bxs-pen", click: "updateElement('', '', '')" },
          { iclass: "bxs-square", click: "updateElement('', '', '')" },
          { iclass: "bxs-paint", click: "updateElement('', '', '')" }]\` } />
        <InputModal { title: "{{ this.data.modalTitle }}", id: "footer-input", placeholder: "{{ this.data.modalPlaceholder }}", value: "{{ this.data.modalInputValue }}" } />
      </div>
  `,
  stylesheet: {
    "#container": `
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      background: rgba(80, 157, 255, 0.2);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      transform: translateY(-10px);
    `,
    ".slider": `
       transform: translateY(-2px);
    `
  }
});

globalThis["Footer"] = Footer;

export default Footer;