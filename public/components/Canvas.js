// Import the subComponent constructor from QueFlow
const { subComponent } = QueFlow;

// Create a new subComponent instance named 'Canvas'
const Canvas = new subComponent({
  // Define the initial data for the Canvas component
  data: {
    // An empty string to store the HTML content to be rendered
    html: ""
  },
  // Define the template for the Canvas component
  template: () => `
       <svg>
        <!-- Create a foreignObject element to embed HTML content within the SVG -->
        <foreignObject x="0" y="0" width="100vw" height="100%" id='out' onclick={{ Highlighter.data.display='none'; }}>{{ this.data.html }}</foreignObject>
       </svg>
      `,
  // Define the stylesheet for the Canvas component
  stylesheet: {
    // Style the SVG element
    "svg": `
        width: 100%;
        height: 70vh;
        background: white;
        padding: 0px;
        margin: 0px;
      `,
    // Style the foreignObject element to allow vertical scrolling
    "foreignObject": "overflow-y: scroll",
    // Style all child elements of the foreignObject to ensure consistent box sizing
    "foreignObject *": `
        box-sizing: border-box;
      `
  },
  // Disable strict mode for the component
  useStrict: false
});

// Make the Canvas component globally accessible
globalThis["Canvas"] = Canvas;

// Export the Canvas component as the default export
export default Canvas;


/**
<br>Explanation of the code and comments:<br>

* <br>Import `subComponent`:<br> The code imports the `subComponent` constructor from the `QueFlow` library. This constructor is used to create custom components.
* <br>Create `Canvas` component:<br> A new `subComponent` instance is created named `Canvas`.
* <br>Define `data`:<br> The `data` property defines the initial data for the `Canvas` component. The `html` property stores an empty string, which will be used to hold the HTML content to be rendered within the SVG.
* <br>Define `template`:<br> The `template` property defines the HTML structure of the `Canvas` component. It creates an SVG element and a `foreignObject` element inside it.
    * `foreignObject` is used to embed HTML content within the SVG.
    * `x`, `y`, `width`, and `height` attributes position and size the `foreignObject` to fill the entire viewport.
    * `id='out'` assigns an ID to the `foreignObject` for later reference.
    * `onclick={{ Highlighter.data.display='none'; }}` adds an onclick event handler to the `foreignObject`. This handler sets the `display` property of a `Highlighter` component to `none` when the `foreignObject` is clicked.
    * `{{ this.data.html }}` inserts the HTML content stored in the `html` data property into the `foreignObject`.
* <br>Define `stylesheet`:<br> The `stylesheet` property defines the CSS styles for the `Canvas` component.
    * `svg` styles the SVG element with a width of 100%, a height of 70vh, a white background, and removes padding and margins.
    * `foreignObject` adds vertical scrolling to the `foreignObject` element.
    * `foreignObject *` applies box-sizing: border-box to all child elements of the `foreignObject`.
* <br>Define `useStrict`:<br> The `useStrict` property is set to `false` to disable strict mode for the component. Strict mode is used for debugging and can be disabled if not needed.
* <br>Make `Canvas` global:<br> The code makes the `Canvas` component globally accessible by assigning it to the `globalThis["Canvas"]` property. This allows other parts of the application to access the `Canvas` component.
* <br>Export `Canvas`:<br> The code exports the `Canvas` component as the default export, making it available for use in other modules.

<br>Overall, the code defines a `Canvas` component that can be used to render HTML content within an SVG element.<br> The `foreignObject` element allows embedding HTML content within the SVG, and the CSS styles ensure that the content is displayed correctly. The onclick event handler on the `foreignObject` element is used to hide a `Highlighter` component when the `foreignObject` is clicked. **/