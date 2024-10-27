const { Nugget } = QueFlow;

const RowIcon = new Nugget({
  template: (props) => {
    return `
      <div class='row'>
    ` + props.iconsClass.map(({ iclass, click, text, isInverted}) => {
      if (iclass) {
        const firstTwo = iclass.slice(0, 2);
        return `<i class='${ firstTwo === "fa" ? "fa "+iclass : "bx "+iclass }' onclick="${ click }"></i>`
      } else {
        return `<span${ isInverted ? ' transform="rotate(90deg)"' : ''} onclick="${ click }">${text}</span>`      
      }
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

const SlidingIcons = new Nugget({
  template: (data) => {
    return `
      <div class='slider'>
       <RowIcon { iconsClass: ${data.iconsClass} } />       
      </div>
      `
  },
  stylesheet: {
    ".slider": `
        width: 100%;
        height: 100%;
        overflow: scroll;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        padding-inline: 10px;
    `,
    ".slider i, .slider span": `
        font-weight: 700;
        font-size: 20px;
        margin-right: 35px;
        color: rgb(80, 157, 255);
    `
  }
});


const TextField = new Nugget({
  template: () => {
    return `<input type='text' id='{{ id }}' width='{{ width }}%' height='{{ height }}px' color='{{ color }}' placeholder='{{ placeholder }}' value='{{ value }}' />`
  },
  stylesheet: {
    'input': `
      border: 2px solid white;
      border-radius: 20px;
      background: rgba(0,0,0,0.05);
      outline: none;
      padding-left: 20px;
      font-weight: 600;
      color: black;
    `,

    "input:hover": `
      border-color: rgb(80, 157, 255);
    `
  }
});

const Button = new Nugget({
  template: (props) => {
    return `
      <button width='{{ width }}%' height='{{ height }}px' background-color='{{ bg }}' color='{{ color }}' border='2px solid {{ bg }}' ${ props.click ? "onclick='{{ click }}'" : '' } >${ props.icon ? '<i class="{{ icon }}"></i>' : '' } {{ label }}</button>`
  },
  stylesheet: {
    'button': `
      border: 2px solid rgb(80, 157, 255);
      border-radius: 20px;
      font-weight: 700;
      `,
    "button i": `
      font-weight: 700;
    `
  }
});

const InputModal = new Nugget({
  template: (data) => {
    return `
      <div class="modal" display={{ this.data.modalDisplay }}>
        <h2 color='rgba(19, 40, 67, 1)'>{{ title }}</h2>
        
        <TextField { width: 63, height: 57, border: 'dodgerblue', color: 'rgba(0,0,0,0.6)', placeholder: '${data.modalPlaceholder}', value: '${data.modalInputValue}', id: '${data.id}' } />
        
        <Button { width: 60, height: 54, bg: 'rgb(80, 157, 255)', color: 'white', label: 'Done', icon: "bx bx-check", click: 'this.data.modalDisplay="none"' } />
      </div>`

  },
  stylesheet: {
    ".modal": `
      width: 100%;
      height: 180px;
      border-radius: 10px;
      box-shadow: 2px 0px 16px rgba(0,0,0,0.1);
      position: absolute;
      bottom: 0vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: white;
    `,
    ".modal > *": `
      margin-block: 5px;
      transition: .5s;
      box-sizing: border-box;
    `
  }
});