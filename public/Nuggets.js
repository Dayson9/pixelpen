const { Nugget } = QueFlow;

const RowIcon = new Nugget({
  template: (props) => {
    return `
      <div class='row'>
    ` + props.class.map((item) => {
      const firstTwo = item.slice(0, 2);
      return `<i class='${ firstTwo === "fa" ? "fa "+item : "bx "+item }'>${ firstTwo }</i>`
    }).join("\n") + `</div>`;
  },
  stylesheet: {
    ".row": `
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
    `
  }
});