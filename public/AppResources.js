//localStorage.clear(); // Uncomment this line to clear local storage, useful for testing

// This function updates the highlighter element's position and size based on the current element.
const updateHighlighter = () => {
  if (currentElement?.tagName) {
    // Get the bounding rectangle of the current element.
    const rect = currentElement.getBoundingClientRect();

    // Extract width, height from the bounding rectangle.
    const w = rect.width,
      h = rect.height;

    // Update the highlighter's data with calculated position and size.
    Highlighter.data.offsetX = rect.x - 3;
    Highlighter.data.offsetY = rect.y - 3;
    Highlighter.data.width = w + 4;
    Highlighter.data.height = h + 4;

    Header.data.hideShowIcon = "bx-hide";
  }
}


function gradientify(el, condition) {
  /* makes 'el' a gradient text based on whether  'condition' is true or false */
  if (condition) {
    el.style["-webkit-text-fill-color"] = "transparent";
    el.style.webkitBackgroundClip = "text";
  } else {
    el.style["-webkit-text-fill-color"] = "";
    el.style["-webkit-background-clip"] = "";
    el.style["background"] = "";
  }
}


// This function updates the modal with information about the selected element's properties.
const updateElement = (title, placeholder, prop, isAttribute) => {
  // Check if an element is selected.
  if (currentElement?.dataset.pxp) {
    // Set the modal's visibility and content.
    Footer.data.modalDisplay = "flex";
    Footer.data.modalTitle = title;
    Footer.data.modalPlaceholder = placeholder;
    // Set the modal input value to the element's property value.
    if (prop === "color") {
      Footer.data.modalInputValue = currentElement.style["color"] === "" && currentElement.style["background"].includes("linear-gradient") ? currentElement.style["background"] : currentElement.style[prop];
    } else {
      Footer.data.modalInputValue = isAttribute ? currentElement[prop] : currentElement.style[prop];
    }

    // Get the modal input element.
    const input = document.getElementById("footer-input");

    // Set up event listener for input changes based on whether it's an attribute or style.
    if (isAttribute) {
      input.oninput = function() {
        // Update the element's attribute with the input value, handling special cases like transforms.
        currentElement[prop] = this.value;
        updateHighlighter(); // Update the highlighter after changing the attribute.
      }
    } else {
      input.oninput = function() {
        if (prop === "color" && this.value.includes("linear-gradient")) {
          currentElement.style.background = this.value;
          gradientify(currentElement, true);
        } else {
          currentElement.style[prop] = this.value;
        }

        updateHighlighter(); // Update the highlighter after changing the style.
      }
    }
  }
}

// This function assigns an ID to the last child element of the "out" container, making it the "current" element.
const appendNewDataset = () => {
  // Remove the "pxp-current" ID from the current element if it exists.
  const current = out.querySelector("[data-pxp=pxpEl]");
  if (current) {
    current.removeAttribute("data-pxp");
  }

  // Get all child elements of the "out" container and select the last one.
  const children = out.querySelectorAll("*"),
    length = children.length;
  const curr = children[length - 1];

  // Assign the "pxp-current" ID to the last child element, making it the current element.
  curr.dataset.pxp = "pxpEl";
  currentElement = out.querySelector("[data-pxp=pxpEl");
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
  Canvas.data.html = Canvas.data.html + formatTag(tagName);


  // Update the visibility of the highlighter and element menu.
  Highlighter.data.display = "block";
  ElementMenu.data.display = "none";

  // Assign the ID to the new element, update the highlighter and add click event listeners.
  appendNewDataset();
  updateHighlighter();
  addClick();

  // Store the updated HTML in localStorage.
  localStorage.setItem("pxp-html", out.innerHTML);
}

// This function adds click event listeners to all child elements of the "out" container.
const addClick = () => {
  // Get all child elements of the "out" container.
  const children = out.querySelectorAll("*");
  children.forEach((el) => {
    // Add a click event listener to each child element.
    el.onclick = function(e) {
      e.stopPropagation(); // Prevent event from bubbling up.
      if (currentElement?.tagName) { // Remove the data-pxp attribute from the current element.
        currentElement.removeAttribute("data-pxp");
      }
      this.dataset.pxp = "pxpEl"; // Set the ID of the clicked element as "pxp-current".
      localStorage.setItem("pxp-html", out.innerHTML); // Update the HTML in localStorage.
      currentElement = document.querySelector("[data-pxp=pxpEl]"); // Update the current element.
      updateHighlighter(); // Update the highlighter.
      Highlighter.data.display = "block"; // Show the highlighter.
    }
  });
}

// This function resets the modal and updates the localStorage with the current HTML.
const reset = () => {

  Footer.data.modalDisplay = "none"; // Hide the modal.
  let html = out.innerHTML.replaceAll('-webkit-background-clip:;', '');
  html = html.replace('-webkit-text-fill-color: transparent;', '-webkit-text-fill-color: transparent; -webkit-background-clip: text;');

  html = html.replace(') text;', '); -webkit-background-clip: text;');

  Canvas.data.html = html;

  localStorage.setItem("pxp-html", out.innerHTML); // Update the HTML in localStorage.

  currentElement = out.querySelector("[data-pxp=pxpEl]");

  updateHighlighter();
  addClick();
}

// This function loads assets from localStorage if they exist.
const loadAssets = () => {
  // Get the HTML and canvas background from localStorage.
  const pxpHTML = localStorage.getItem("pxp-html"),
    canvasBG = localStorage.getItem("pxp-canvas-bg");
  if (pxpHTML) {
    // Update the Canvas data with the HTML from localStorage.
    let html = pxpHTML.replaceAll('-webkit-background-clip:;', '');

    html = html.replace(' text;', '; -webkit-background-clip: text;');

    Canvas.data.html = html;

    currentElement = document.querySelector("[data-pxp=pxpEl]"); // Get the current element if it exists.

    const all = out.querySelectorAll("*");

    // Add click event listeners and update the highlighter if a current element exists.
    addClick();
    if (currentElement) {
      Highlighter.data.display = "block";
      updateHighlighter();
    }
  }
  // If canvas background is previously saved.
  if (canvasBG) {
    canvasContainer.style.background = canvasBG;
  }

  // Hide the highlighter when the mouse moves or touches the "out" container.
  out.ontouchmove = () => {
    Highlighter.data.display = "none";
    Header.data.hideShowIcon = "bx-show";
  }

  out.onmousemove = () => {
    Highlighter.data.display = "none";
    Header.data.hideShowIcon = "bx-show";
  }
}

// This function formats CSS by adding line breaks after semicolons.
const formatCSS = (css) => css.replaceAll(";", ";\n");

// This function opens the CodeView component and generates HTML and CSS code.
const openCodeView = () => {
  // Show the CodeView component and toggle the menu.
  CodeView.data.show = true;
  // Blur the Canvas container 
  Canvas.data.screenBlur = 8;
  toggleMenu();

  // Create a clone of the "out" container.
  const clone = out.cloneNode(true),
    all = clone.querySelectorAll("*"); // Get all child elements of the clone.

  let arr = [];
  let stylesheet = ""; // Initialize stylesheet variable.
  elCounter = 0; // Initialize element counter.
  all.forEach((child, index) => {

    // Remove the "pxp-current" ID if it exists.
    if (child.dataset.pxp == "pxpEl") {
      child.removeAttribute("data-pxp");
    }

    arr.push({ css: child.style.cssText });

    child.removeAttribute("textContent");
    child.removeAttribute("style");

  });

  var className = "",
    finalArr = [];

  const pushToArr = (style, indx) => {
    let index1 = parseInt(indx[0]);
    let index2 = parseInt(indx[1]);

    if (finalArr.length !== 0) {
      for (var index in finalArr) {
        index = parseInt(index);
        const { css, indexes } = finalArr[index];

        if (style === css) {
          const ind = finalArr[index].indexes;
          if (ind.indexOf(index1) === -1) {
            finalArr[index].indexes.push(index1);
          }
          if (ind.indexOf(index2) === -1) {
            finalArr[index].indexes.push(index2);
          }
          break;
        } else {
          if (index + 1 === finalArr.length)
            finalArr.push({
              css: style,
              indexes: [...indx]
            });
        }
      }
    } else {
      finalArr[0] = {
        css: style,
        indexes: [index1, index2]
      };
    }
  }


  for (const i in arr) {
    const firstCss = arr[i].css;
    for (const j in arr) {
      const css = arr[j].css;
      const isLast = j + 1 === arr.length,
        secondCss = arr[j].css;

      if (isLast) {
        pushToArr(css, [i, j]);
      } else {
        if (firstCss === secondCss) {
          pushToArr(css, [i, j]);
          break;
        }
      }
    }
  }

  const removeDuplicates = (array) => {
    let output = [];

    for (const num of array) {
      if (!output.includes(num)) {
        output.push(num);
      }
    }
    return output;
  }


  for (let { css, indexes } of finalArr) {
    indexes = removeDuplicates(indexes);
    if (indexes.length === 1) {
      const ind = parseInt(indexes[0]);
      const el = all[ind];
      if (el?.hasAttribute("id")) {
        if (css !== "") {
          stylesheet += `\n#${el.id} {\n${formatCSS(css).replaceAll(" text;", ';\n-webkit-background-clip: text;')}}\n`;
        }
      } else {
        if (css !== "" && el.className.indexOf("pxp-el") === -1) {
          el.classList.add(`pxp-el${elCounter}`);
        }

        stylesheet += `\n.pxp-el${elCounter} {\n${formatCSS(css).replaceAll(" text;", ';\n-webkit-background-clip: text;')}}\n`;
      }
    } else {
      for (let ind in indexes) {
        ind = parseInt(ind);
        index = indexes[ind];
        const el = all[index];

        if (el && css !== "" && el.className.indexOf("pxp-el") === -1) {
          el.classList.add(`pxp-el${elCounter}`);
        }

        if (ind === 0 && css !== "") {
          stylesheet += `\n.pxp-el${elCounter} {\n${formatCSS(css).replaceAll(" text;", ';\n-webkit-background-clip: text;')}}\n`;
        }

      }
    }
    elCounter++;
  }

  // Set  the HTML and CSS code in the CodeView component.
  CodeView.data.html.code = clone.innerHTML.replace(/<\/[^>]+>/g, (match) => match + "\n");
  CodeView.data.css.code = `${canvasContainer.style.background !== "" ? "\nbody {\nheight: 100vh;\nmargin: 0;\npadding: 0;\nbackground: "+canvasContainer.style.background+";\n}\n" : ""}\n* {\nbox-sizing: border-box;\n}\n${stylesheet}`;

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
    CodeView.data.fluid.x = window.innerWidth <= 768 ? 100 : (window.innerWidth / 4) - 40; // Adjust x positions.
    CodeView.data.fluid.width = 50;
    CodeView.data.isHTML = false; // Set the CSS view flag.
  }, 400);
}

// This function copies text to the clipboard.
const copyToClipboard = async (text) => {
  try {
    // Copy text to clipboard.
    await navigator.clipboard.writeText(text);
    // Show 'Copied' message
    CodeView.data.toastOpacity = 1;
    // After 2 seconds, hide it back
    setTimeout(() => CodeView.data.toastOpacity = 0, 2000);
  } catch (error) {
    alert(error.message); // Handle errors during clipboard copy.
  }
}


// Function for saving canvas background 
const saveCanvasBG = (value) => localStorage.setItem("pxp-canvas-bg", value);


// Initialize variables.
var currentHTML = '',
  countDownInterval, elCounter = 0, // Element counter for generating unique class names.
  currentElement = out = canvasContainer = {},
  attri; // Initialize current element and out container.

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
  { iclass: "bx-rectangle", click: "updateElement('Display', 'flex', 'display')", label: "Display" },
  { iclass: "bx-rectangle", click: "updateElement('Flex Direction', 'row', 'flexDirection')", label: "Flex-direction" },
  { iclass: "bx-filter", click: "updateElement('Filter', 'blur(4px)', 'filter')", label: "Filter" },
  { iclass: "bx-filter", click: "updateElement('Backdrop filter', 'brightness(70%)', 'backdropFilter')", label: "Backdrop Filter" },
  { iclass: "bx-link", click: "updateElement('SRC', 'image.jpeg', 'src', true)", label: "SRC" },
  { iclass: "bx-circle", click: "updateElement('Clip-path', 'polygon(20% 30%)', 'clipPath')", label: "Clip-path" }
];