const { Nugget } = QueFlow;

const Text = new Nugget({
  template: (props) => {
    return `<span font-size='{{ size }}px' font-weight='{{ weight }}' color='{{ color }}'${ props.font ? " font-family='{{ font }}'" : "" }${ props.click ? " onclick= '{{ click }}'" : ''}>{{ text }}</span>`
  },
  stylesheet: {
    span: `
      font-family: Inter;
      display: block;
    `
  }
})

const RowIcon = new Nugget({
  template: (props) => {
    if (props.isLowerIcons) {
      return `
      <div class='row'>
    ` + lowerIconInfos.map(({ iclass, click, text, prop, label }) => {
        const firstTwo = iclass?.slice(0, 2);
        if (!text) {
          return `
           <div onclick="${ click };">
             <i class='${ firstTwo === "fa" ? "fa "+iclass : "bx "+iclass }'></i>
            <span class='label'>${label}</span>
           </div>
        `
        } else {
          return `
              <div onclick="${ click };">
                <span>${text}</span>
                <span class='label'>${label}</span>
              </div>`
        }
      }).join("\n") + `</div>`;
    } else {
      return `<div class='row'>` +
        props.iconsClass.map(({ iclass, click }) => {
          const firstTwo = iclass.slice(0, 2);
          return `<i class='${ firstTwo === "fa" ? "fa "+iclass : "bx "+iclass }' onclick="${ click };"></i>`
        }).join("\n"); + `</div>`
    }
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
       <RowIcon { isLowerIcons: ${ data.isLowerIcons } } />       
      </div>
      `
  },
  stylesheet: {
    ".slider": `
        width: 100%;
        height: 60px;
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
    `,
    ".slider .label": `
        display: block;
        font-weight: 400;
        font-size: 9px;
    `,
    ".slider div:not(.row)": `
        width: 80px;
        text-align: center;
    `
  }
});


const TextField = new Nugget({
  template: (props) => {
    return `<textarea type='text' id='{{ id }}' width='{{ width }}%' height='{{ height }}px' color='{{ color }}' placeholder='{{ placeholder }}' value='{{ value }}'${props.input ? " oninput='{{ input }}'" : "" }>{{ value }}</textarea>`
  },
  stylesheet: {
    'textarea': `
      border: 2px solid white;
      border-radius: 20px;
      background: rgba(0,0,0,0.05);
      outline: none;
      padding-left: 12px;
      padding-top: 8px;
      font-weight: 200;
      color: black;
      font-family: 'Inter';
    `,

    "textarea:hover": `
      border-color: rgb(80, 157, 255);
    `
  }
});

const Button = new Nugget({
  template: (props) => {
    return `
      <button ${ props.w ? "width='{{ width }}%'" : "" } ${ props.h ? "height='{{ height }}px'" : "" } background-color='{{ bg }}' ${ props.border ? "border='2px solid {{ bg }}'" : "" } ${ props.click ? "onclick='{{ click }}'" : '' } >${ props.icon ? '<i class="{{ icon }}"></i>' : '' } {{ label }}</button>`
  },
  stylesheet: {
    'button': `
      border: 2px solid rgb(80, 157, 255);
      border-radius: 20px;
      font-weight: 700;
      color: white;
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
        <Text { text: "{{ title }}", weight: 600, size: 25, color: 'rgba(19, 40, 67, 1)' } /> 
        <TextField { width: 63, height: 57, border: 'dodgerblue', color: 'rgba(0,0,0,0.6)', placeholder: '${data.placeholder}', value: '${data.value}', id: '${data.id}' } />
        
        <Button { width: 60, height: 54, bg: 'rgb(80, 157, 255)', color: 'white', label: 'Done', icon: "bx bx-check", click: '${data.click}' } />
      </div>`

  },
  stylesheet: {
    ".modal": `
      width: 100%;
      height: 170px;
      border-radius: 10px;
      box-shadow: 2px 0px 16px rgba(0,0,0,0.1);
      position: fixed;
      bottom: 0px;
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


const VerticalScrollList = new Nugget({
  template: (props) => {
    return `<div class='scrolldiv'>` +
      props.list.map((item, index) => {
        return `<span ${ index === 0 ? "class='first'" : "" } onclick='appendNewElement("${item}")'>${item}</span><hr>`
      }).join("\n") + `</div>`
  },
  stylesheet: {
    ".scrolldiv": `
      width: 100%;
      height: 75%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      border-radius: inherit;
      padding-block: 10px;
      overflow-y: scroll;
      box-sizing: border-box;
    `,

    ".scrolldiv span": `
      color: rgb(80, 157, 255);
      width: 100%;
    `,

    ".scrolldiv hr": `
      width: 85%;
      color: rgba(0,0,0,0.1);
    `,

    ".scrolldiv .first": `
      margin-top: 870px;
    `
  }
});

const Paragraph = new Nugget({
  template: () => {
    return `<p>{{ text }}</p>`;
  }
});

const List = new Nugget({
  template: () => {
    return `<li>{{ text }}</li>`;
  }
});