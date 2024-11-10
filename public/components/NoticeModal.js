// Import the subComponent class from QueFlow 
const { subComponent } = QueFlow;

// Define a new subcomponent called NoticeModal
const NoticeModal = new subComponent({
  // Define reactive data
  data: {
    // Heading message for the modal
    headingMsg: "",
    // Main message content for the modal
    noticeMsg: "",
    // Action button label for the modal
    actionMsg: "",
    // Countdown for undo message 
    undoCounter: 0,
    undoDisplay: "none",
    // Flag to control the modal visibility
    shown: false
  },
  // Template function for rendering the modal HTML structure
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
         <div id='undo' display={{ this.data.undoDisplay }}>
           <Text { text: "{{ this.data.undoCounter }}", weight: 800, size: 20, color: 'rgba(19, 40, 67, 1)' } />
           <Text { text: "Undo", weight: 300, size: 15, color: 'rgb(80, 157, 255)', click: \`{
           Canvas.data.html = currentHTML;
           this.data.undoDisplay = \\"none\\";
           addClick();
           updateHighlighter();
           localStorage.setItem(\\"pxp-html\\", Canvas.data.html);
           }\` } />
         </div>
      `
  },

  // Stylesheet for the modal and its elements
  stylesheet: {
    // Style for the modal container
    ".modal": `
        width: 80%;
        height: 150px;
        position: fixed;
        top: 15vh;
        left: 10%;
        box-shadow: 2px 3px 16px rgba(0,0,0,0.1);
        text-align: center;
        border-radius: 20px;
        padding-block: 10px;
        box-sizing: border-box;
        background: white;
        font-family: Inter;
     `,
     "#undo" : `
        width: 60%;
        height: 70px;
        border-radius: 15px;
        background: white;
        box-shadow: 2px 5px 16px rgba(0,0,0,0.1);
        position: fixed;
        bottom: 15vh;
        left: 20%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-inline: 20px;
        box-sizing: border-box;
     `,
    // Style for the Text Nugget inside the modal
    "span": `
        display: block;
        margin-block: 8px;
     `,
    // Media query for screen sizes larger than 768px
    "@media (min-width: 768px)": {
      ".modal": `
          width: 45%;
          height: 180px;
          left: 27.5%;
        `
    }
  }
});

// Make the NoticeModal component globally accessible
globalThis.NoticeModal = NoticeModal;

// Export the NoticeModal component
export default NoticeModal;