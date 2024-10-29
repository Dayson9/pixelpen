const { subComponent } = QueFlow;


const Footer = new subComponent({
  data: {
    modalDisplay: "none",
    modalTitle: "InnerText",
    modalPlaceholder: 'Hello World',
    modalInputValue: ''
  },
  template: () => `
      <div id="container">
        <SlidingIcons { isLowerIcons: true } />
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
      position: fixed;
      bottom: -10px;
    `,
    ".slider": `
       transform: translateY(-2px);
    `
  }
});

globalThis["Footer"] = Footer;

export default Footer;