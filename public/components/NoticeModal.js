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
      `
  },

  // Stylesheet for the modal and its elements
  stylesheet: {
    // Style for the modal container
    ".modal": `
        width: 80%;
        height: 150px;
        position: relative;
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