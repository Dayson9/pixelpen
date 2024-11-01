//localStorage.clear(); // Uncomment this line to clear local storage, useful for testing

// This function updates the highlighter element's position and size based on the current element.
const updateHighlighter = () => {
  // Get the bounding rectangle of the current element.
  const rect = currentElement?.getBoundingClientRect();

  // Extract width, height, x and y coordinates from the bounding rectangle.
  const w = rect.width,
    h = rect.height;

  // Update the highlighter's data with calculated position and size.
  Highlighter.data.offsetX = rect.x - 10;
  Highlighter.data.offsetY = rect.y - 10;
  Highlighter.data.width = w + 20;
  Highlighter.data.height = h + 20;
}

// This function updates the modal with information about the selected element's properties.
const updateElement = (title, placeholder, prop, isAttribute) => {
  // Check if an element is selected.
  if (currentElement?.id) {
    // Set the modal's visibility and content.
    Footer.data.modalDisplay = "flex";
    Footer.data.modalTitle = title;
    Footer.data.modalPlaceholder = placeholder;
    // Set the modal input value to the element's property value.
    Footer.data.modalInputValue = currentElement.style[prop] ?? currentElement[prop];

    // Get the modal input element.
    const input = document.getElementById("footer-input");

    // Set up event listener for input changes based on whether it's an attribute or style.
    if (isAttribute) {
      input.oninput = function() {
        // Update the element's attribute with the input value, handling special cases like transforms.
        currentElement[prop] = prop === "transform" && this.value.includes("translate") ? '' : this.value;
        updateHighlighter(); // Update the highlighter after changing the attribute.
      }
    } else {
      input.oninput = function() {
        // Update the element's style with the input value, handling special cases like transforms.
        currentElement.style[prop] = prop === "transform" && this.value.includes("translate") ? '' : this.value;
        updateHighlighter(); // Update the highlighter after changing the style.
      }
    }
  }
}

// This function assigns an ID to the last child element of the "out" container, making it the "current" element.
const appendNewID = () => {
  // Remove the "pxp-current" ID from the current element if it exists.
  const current = document.getElementById("pxp-current");
  if (current) {
    current.removeAttribute("id");
  }

  // Get all child elements of the "out" container and select the last one.
  const children = out.querySelectorAll("*"),
    length = children.length;
  const curr = children[length - 1];

  // Assign the "pxp-current" ID to the last child element, making it the current element.
  curr.id = "pxp-current";
  currentElement = document.getElementById('pxp-current');
}

// This function formats a tag name into valid HTML markup, handling closing tags and special cases.
const formatTag = (tagName) => {
  // Define an array of tags that don't need closing tags.
  const noClosingTags = ["img", "input", "video", "audio"];

  let output = ''; // Initialize output variable.
  if (noClosingTags.includes(tagName)) { // Check if the tag is in the noClosingTags array.
    switch (tagName) { // Handle different tag types.
      case 'img':
        output = `<img src='#' alt='' width='200px' height='150px'/>`; // Default img tag with placeholder attributes.
        break;
      case 'input':
        output = `<input type='text'/>`; // Default input tag with text type.
        break;
    }
  } else {
    output = `<${tagName}>${tagName.toUpperCase()}</${tagName}>`; // Format tag with closing tag and uppercase text content.
  }

  return output; // Return the formatted HTML string.
}

// This function appends a new HTML element to the "out" container.
const appendNewElement = (tagName) => {
  // Add the formatted HTML tag to the Canvas data.
  Canvas.data.html += formatTag(tagName);

  // Update the visibility of the highlighter and element menu.
  Highlighter.data.display = "block";
  ElementMenu.data.display = "none";

  // Assign the ID to the new element, update the highlighter and add click event listeners.
  appendNewID();
  updateHighlighter();
  addClick();

  // Store the updated HTML in localStorage.
  localStorage.setItem("pxp-html", Canvas.data.html);
}

// This function adds click event listeners to all child elements of the "out" container.
const addClick = () => {
  // Get all child elements of the "out" container.
  const children = out.querySelectorAll("*");
  children.forEach((el) => {
    // Add a click event listener to each child element.
    el.onclick = function(e) {
      e.stopPropagation(); // Prevent event from bubbling up.
      if (currentElement?.tagName) { // Remove the ID from the previous current element.
        currentElement.removeAttribute("id");
      }
      this.id = "pxp-current"; // Set the ID of the clicked element as "pxp-current".
      localStorage.setItem("pxp-html", out.innerHTML); // Update the HTML in localStorage.
      currentElement = document.getElementById('pxp-current'); // Update the current element.
      updateHighlighter(); // Update the highlighter.
      Highlighter.data.display = "block"; // Show the highlighter.
    }
  });
}

// This function resets the modal and updates the localStorage with the current HTML.
const reset = () => {
  Footer.data.modalDisplay = "none"; // Hide the modal.
  localStorage.setItem("pxp-html", out.innerHTML); // Update the HTML in localStorage.
}

// This function loads assets from localStorage if they exist.
const loadAssets = () => {
  // Get the HTML from localStorage.
  const pxpHTML = localStorage.getItem("pxp-html");
  if (pxpHTML) {
    // Update the Canvas data with the HTML from localStorage.
    Canvas.data.html = pxpHTML;
    currentElement = document.getElementById("pxp-current"); // Get the current element if it exists.

    // Add click event listeners and update the highlighter if a current element exists.
    addClick();
    if (currentElement) {
      Highlighter.data.display = "block";
      updateHighlighter();
    }
  }
  // Hide the highlighter when the mouse moves or touches the "out" container.
  out.ontouchmove = () => Highlighter.data.display = "none";
  out.onmousemove = () => Highlighter.data.display = "none";
}

// This function formats CSS by adding line breaks after semicolons.
const formatCSS = (css) => css.replaceAll(";", ";\n");

// This function opens the CodeView component and generates HTML and CSS code.
const openCodeView = () => {
  // Show the CodeView component and toggle the menu.
  CodeView.data.show = true;
  toggleMenu();

  // Create a clone of the "out" container.
  const clone = out.cloneNode(true),
    all = clone.querySelectorAll("*"); // Get all child elements of the clone.

  let stylesheet = ""; // Initialize stylesheet variable.
  elCounter = 0; // Initialize element counter.
  all.forEach((child) => {

    // Remove the "pxp-current" ID if it exists.
    if (child.id == "pxp-current") {
      child.removeAttribute("id");
    }
    
    // Add a class based on the element index and generate CSS rules.
    const hasID = child.hasAttribute("id");
    child.classList.add("pxp-el" + elCounter);
    if (hasID) {
      stylesheet += `#${child.id} {\n${formatCSS(child.style.cssText)}\n}\n`;
    } else {
      stylesheet += `.pxp-el${elCounter++} {\n${formatCSS(child.style.cssText)}\n}`;
    }
    // Remove style and text content attributes from the cloned element.
    child.removeAttribute("style");
    child.removeAttribute("textContent");

  });

  // Set the HTML and CSS code in the CodeView component.
  CodeView.data.html.code = clone.innerHTML;
  CodeView.data.css.code = stylesheet;

  clone.remove(); // Remove the clone.
}

// This function opens the HTML view in the CodeView component.
const openHTML = () => {
  // Set the colors and animation properties for the HTML view.
  CodeView.data.html.color = "rgba(19, 40, 67, 1)";
  CodeView.data.css.color = "rgba(0,0,0,0.5)";

  CodeView.data.fluid.width = 7;
  setTimeout(() => {
    CodeView.data.fluid.x = 0;
    CodeView.data.fluid.width = 50;
    CodeView.data.isHTML = true; // Set the HTML view flag.
  }, 400);
}

// This function opens the CSS view in the CodeView component.
const openCSS = () => {
  // Set the colors and animation properties for the CSS view.
  CodeView.data.css.color = "rgba(19, 40, 67, 1)";
  CodeView.data.html.color = "rgba(0,0,0,0.5)";

  CodeView.data.fluid.width = 7;
  setTimeout(() => {
    CodeView.data.fluid.x = window.innerWidth <= 768 ? 100 : (window.innerWidth / 4) - 40; // Adjust x position for different screen sizes.
    CodeView.data.fluid.width = 50;
    CodeView.data.isHTML = false; // Set the CSS view flag.
  }, 400);
}

// This function copies text to the clipboard.
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text); // Copy text to clipboard.
  } catch (error) {
    alert(error.message); // Handle errors during clipboard copy.
  }
}

// Initialize variables.
var elCounter = 0, // Element counter for generating unique class names.
  currentElement = out = {}; // Initialize current element and out container.

// Define an array of information for the lower menu icons.
const lowerIconInfos = [
  { iclass: "bx-text", click: "updateElement('InnerText', 'Hello World', 'textContent', true)", label: "InnerText" }, // InnerText property
  { iclass: "bx-transfer", click: "openElementMenu(true)", label: "InnerHTML" }, // InnerHTML property
  { iclass: "bx-paint-roll", click: "updateElement('Color', 'crimson', 'color')", label: "Color" }, // Color property
  { iclass: "bxs-square", click: "updateElement('Background', 'white', 'background')", label: "Background" }, // Background property
  { iclass: "bx-move-horizontal", click: "updateElement('Width', '200px', 'width')", label: "Width" }, // Width property
  { text: "↕️", click: "updateElement('Height', '150px', 'height')", label: "Height" }, // Height property
  { iclass: "bx-square", click: "updateElement('Margin', '20px 10px', 'margin')", label: "Margin" }, // Margin property
  { iclass: "bxs-area", click: "updateElement('Padding', '0px 10px', 'padding')", label: "Padding" }, // Padding property
  { iclass: "bxs-cube", click: "updateElement('Box Sizing', 'border-box', 'boxSizing')", label: "Box-sizing" }, // Box-sizing property
  { iclass: "bx-move", click: "updateElement('Transform', 'translateY(20px)', 'transform')", label: "Transform" }, // Transform property
  { iclass: "bx-menu-alt-left", click: "updateElement('Text-align', 'center', 'textAlign')", label: "Text Align" }, // Text-align property
  { iclass: "bx-font-family", click: "updateElement('Font-family', 'sans-serif', 'fontFamily')", label: "Font family" }, // Font-family property
  { text: "⚖", click: "updateElement('Font-weight', '400', 'fontWeight')", label: "Font Weight" }, // Font-weight property
  { iclass: "bx-font-size", click: "updateElement('Font-size', '15px', 'fontSize')", label: "Font size" }, // Font-size property
  { iclass: "bx-border-all", click: "updateElement('Border', '2px solid teal', 'border')", label: "Border" }, // Border property
  { iclass: "bx-border-radius", click: "updateElement('Border-radius', '5px', 'borderRadius')", label: "Border-radius" }, // Border-radius property
  { iclass: "bx-outline", click: "updateElement('Outline', '2px solid dodgerblue', 'outline')", label: "Outline" }, // Outline property
  { text: "◼", click: "updateElement('Box Shadow', '2px 0px 16px rgba(0,0,0,0.1)', 'boxShadow')", label: "Box Shadow" }, // Box shadow property
  { text: "•••", click: "updateElement('ClassName', 'container', 'className', true)", label: "Class Name" }, // ClassName property
  { text: "#", click: "updateElement('ID', 'main', 'id')", label: "ID" }, // ID property
  { iclass: "bxs-square", click: "updateElement('', '', '')" },
  { iclass: "bxs-paint", click: "updateElement('', '', '')" }
];