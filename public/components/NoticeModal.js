const { subComponent } = QueFlow;

const NoticeModal = new subComponent({
  data: {
    headingMsg: "",
    noticeMsg: "",
    actionMsg: "",
    shown: false
  },
  template: () => {
    return `
      <div class='modal' display={{ this.data.shown ? "block" : "none" }}>
         <Text { text: "{{ this.data.headingMsg }}", weight: 650, size: 17, color: 'rgba(19, 40, 67, 1)' } />
        <Text { text: "{{ this.data.noticeMsg }}", weight: 400, size: 15, color: 'rgba(0,0,0,0.7)' } /> 
        <div class='btns'>
          <button onclick={{ this.data.shown = false }}>Cancel</button>
          <button background-color='rgb(80, 157, 255)' id='action'>{{ this.data.actionMsg }}</button>
        </div>
      </div>
    `
  },
  
  stylesheet: {
   ".modal" : `
      width: 80%;
      height: 150px;
      position: fixed;
      top: 10vh;
      left: 10%;
      box-shadow: 2px 3px 16px rgba(0,0,0,0.1);
      text-align: center;
      border-radius: 20px;
      padding-block: 10px;
      box-sizing: border-box;
      background: white;
      font-family: Inter;
   `,
   "span" : `
      display: block;
      margin-block: 8px;
   `,
  ".btns" : `
    width: 80%;
    height: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    justify-content: space-around;
  `,
  
  ".btns button" : `
    width: 100px;
    height: 35px;
    border: none;
    border-radius: 15px;
    background: rgba(0,0,0,.3);
    color: white;
  `
  }
});

globalThis.NoticeModal = NoticeModal;

export default NoticeModal;