//localStorage.clear();

const updateHighlighter = () => {
  const rect = currentElement.getBoundingClientRect();

  const w = rect.width,
    h = rect.height;

  Highlighter.data.offsetX = rect.x - 10;
  Highlighter.data.offsetY = rect.y - 10;
  Highlighter.data.width = w + 20;
  Highlighter.data.height = h + 20;
}

const updateElement = (title, placeholder, prop, isAttribute) => {

  Footer.data.modalDisplay = "flex";
  Footer.data.modalTitle = title;
  Footer.data.modalPlaceholder = placeholder;
  Footer.data.modalInputValue = currentElement.style[prop] ?? currentElement[prop];

  const input = document.getElementById("footer-input");

  if (isAttribute) {
    input.oninput = function() {
      currentElement[prop] = prop === "transform" && this.value.includes("translate") ? '' : this.value;
      updateHighlighter();
    }
  } else {
    input.oninput = function() {
      currentElement.style[prop] = prop === "transform" && this.value.includes("translate") ? '' : this.value;
      updateHighlighter();
    }
  }
}

const appendNewID = () => {
  const current = document.getElementById("pxp-current");
  if (current) {
    current.removeAttribute("id");
  }

  const children = out.querySelectorAll("*"),
    length = children.length;
  const curr = children[length - 1];

  curr.id = "pxp-current";
  currentElement = document.getElementById('pxp-current');
}

const appendNewElement = (tagName) => {
  const noClosingTags = ["img", "input", "video", "audio"];

  if (noClosingTags.includes(tagName)) {
    switch (tagName) {
      case 'img':
        Canvas.data.html += `
            <img src='#' alt='' width='200px' height='150px'/>`;
        break;
      case 'input':
        Canvas.data.html += `
            <input type='text'/>`;
        break;
    }
  } else {
    Canvas.data.html += `
    <${tagName}>${tagName.toUpperCase()}</${tagName}>`;
  }

  Highlighter.data.display = "block";
  ElementMenu.data.display = "none";

  appendNewID();
  updateHighlighter();
  addClick();

  localStorage.setItem("pxp-html", Canvas.data.html);
}

const addClick = () => {
  const children = out.querySelectorAll("*");
  children.forEach((el) => {
    el.onclick = function() {
      if (currentElement?.tagName) {
        currentElement.removeAttribute("id");
      }
      this.id = "pxp-current";
      localStorage.setItem("pxp-html", out.innerHTML);
      currentElement = document.getElementById('pxp-current');
      updateHighlighter();
      Highlighter.data.display = "block";
    }
  });
}

const reset = () => {
  Footer.data.modalDisplay = "none";
  localStorage.setItem("pxp-html", out.innerHTML);
  /**Canvas.data.html = out.innerHTML;
  addClick(); **/
}

const loadAssets = () => {
  const pxpHTML = localStorage.getItem("pxp-html");

  if (pxpHTML) {
    Canvas.data.html = pxpHTML;
    currentElement = document.getElementById("pxp-current");
    addClick();
    if (currentElement) {
      Highlighter.data.display = "block";
    }
    updateHighlighter();
  }
}


var currentElement = {};

const lowerIconInfos = [
  { iclass: "bx-text", click: "updateElement('InnerText', 'Hello World', 'textContent', true)", label: "InnerText" },
  { iclass: "bx-paint-roll", click: "updateElement('Color', 'crimson', 'color')", label: "Color" },
  { iclass: "bxs-square", click: "updateElement('Background', 'white', 'background')", label: "Background" },
  { iclass: "bx-move-horizontal", click: "updateElement('Width', '200px', 'width')", label: "Width" },
  { text: "↕️", click: "updateElement('Height', '150px', 'height')", label: "Height" },
  { iclass: "bx-square", click: "updateElement('Margin', '20px 10px', 'margin')", label: "Margin" },
  { iclass: "bxs-area", click: "updateElement('Padding', '0px 10px', 'padding')", label: "Padding" },
  { iclass: "bx-move", click: "updateElement('Transform', 'translateY(20px)', 'transform')", label: "Transform" },
  { iclass: "bx-menu-alt-left", click: "updateElement('Text-align', 'center', 'textAlign')", label: "Text Align" },
  { iclass: "bx-font-family", click: "updateElement('Font-family', 'sans-serif', 'fontFamily')", label: "Font family" },
  { text: "⚖", click: "updateElement('Font-weight', '400', 'fontWeight')", label: "Font Weight" },
  { iclass: "bx-font-size", click: "updateElement('Font-size', '15px', 'fontSize')", label: "Font size" },
  { iclass: "bx-border-all", click: "updateElement('Border', '2px solid teal', 'border')", label: "Border" },
  { iclass: "bx-border-radius", click: "updateElement('Border-radius', '5px', 'borderRadius')", label: "Border-radius" },
  { iclass: "bx-outline", click: "updateElement('Outline', '2px solid dodgerblue', 'outline')", label: "Outline" },
  { text: "◼", click: "updateElement('Box Shadow', '2px 0px 16px rgba(0,0,0,0.1)', 'boxShadow')", label: "Box Shadow" },
  { iclass: "bxs-paint", click: "updateElement('', '', '')" },
  { iclass: "bxs-pen", click: "updateElement('', '', '')" },
  { iclass: "bxs-square", click: "updateElement('', '', '')" },
  { iclass: "bxs-paint", click: "updateElement('', '', '')" }]