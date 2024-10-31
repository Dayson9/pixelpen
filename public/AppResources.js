//localStorage.clear();

const updateHighlighter = () => {
  const rect = currentElement?.getBoundingClientRect();

  const w = rect.width,
    h = rect.height;

  Highlighter.data.offsetX = rect.x - 10;
  Highlighter.data.offsetY = rect.y - 10;
  Highlighter.data.width = w + 20;
  Highlighter.data.height = h + 20;
}

const updateElement = (title, placeholder, prop, isAttribute) => {
  if (currentElement?.id) {
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

const formatTag = (tagName) => {
  const noClosingTags = ["img", "input", "video", "audio"];

  let output = '';
  if (noClosingTags.includes(tagName)) {
    switch (tagName) {
      case 'img':
        output = `
            <img src='#' alt='' width='200px' height='150px'/>`;
        break;
      case 'input':
        output = `
            <input type='text'/>`;
        break;
    }
  } else {
    output = `
    <${tagName}>${tagName.toUpperCase()}</${tagName}>`;
  }

  return output;
}

const appendNewElement = (tagName) => {
  Canvas.data.html += formatTag(tagName);

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
    el.onclick = function(e) {
      e.stopPropagation();
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
}

const loadAssets = () => {
  const pxpHTML = localStorage.getItem("pxp-html");
  if (pxpHTML) {
    Canvas.data.html = pxpHTML;
    currentElement = document.getElementById("pxp-current");

    addClick();
    if (currentElement) {
      Highlighter.data.display = "block";
      updateHighlighter();
    }
  }
  out.ontouchmove = () => updateHighlighter();

  out.onmousemove = () => updateHighlighter();

}

const formatCSS = (css) => css.replaceAll(";", ";\n ");

const openCodeView = () => {
  CodeView.data.show = true;
  toggleMenu();

  const clone = out.cloneNode(true),
    all = clone.querySelectorAll("*");

  let stylesheet = "";
  elCounter = 0;
  all.forEach((child) => {
    child.classList.add("pxp-el" + elCounter);
    stylesheet += `\n.pxp-el${elCounter} {\n ${formatCSS(child.style.cssText)}\n}\n`
    child.removeAttribute("style");
    child.removeAttribute("textContent");
    if (child.id == "pxp-current") {
      child.removeAttribute("id");
    }
    elCounter++;
  });

  CodeView.data.html.code = clone.innerHTML;
  CodeView.data.css.code = stylesheet;

  clone.remove();
}

const openHTML = () => {
  CodeView.data.html.color = "rgba(19, 40, 67, 1)";
  CodeView.data.css.color = "rgba(0,0,0,0.5)";


  CodeView.data.fluid.width = 7;
  setTimeout(() => {
    CodeView.data.fluid.x = 0;
    CodeView.data.fluid.width = 50;
    CodeView.data.isHTML = true;
  }, 400);
}

const openCSS = () => {
  CodeView.data.css.color = "rgba(19, 40, 67, 1)";
  CodeView.data.html.color = "rgba(0,0,0,0.5)";

  CodeView.data.fluid.width = 7;
  setTimeout(() => {
    CodeView.data.fluid.x = window.innerWidth <= 768 ? 100 : (window.innerWidth / 4) - 40;
    CodeView.data.fluid.width = 50;
    CodeView.data.isHTML = false
  }, 400);
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    alert(error.message);
  }
}

var elCounter = 0,
  currentElement = out = {};

const lowerIconInfos = [
  { iclass: "bx-text", click: "updateElement('InnerText', 'Hello World', 'textContent', true)", label: "InnerText" },
  { iclass: "bx-transfer", click: "openElementMenu(true)", label: "InnerHTML" },
  { iclass: "bx-paint-roll", click: "updateElement('Color', 'crimson', 'color')", label: "Color" },
  { iclass: "bxs-square", click: "updateElement('Background', 'white', 'background')", label: "Background" },
  { iclass: "bx-move-horizontal", click: "updateElement('Width', '200px', 'width')", label: "Width" },
  { text: "↕️", click: "updateElement('Height', '150px', 'height')", label: "Height" },
  { iclass: "bx-square", click: "updateElement('Margin', '20px 10px', 'margin')", label: "Margin" },
  { iclass: "bxs-area", click: "updateElement('Padding', '0px 10px', 'padding')", label: "Padding" },
  { iclass: "bxs-cube", click: "updateElement('Box Sizing', 'border-box', 'boxSizing')", label: "Box-sizing" },
  { iclass: "bx-move", click: "updateElement('Transform', 'translateY(20px)', 'transform')", label: "Transform" },
  { iclass: "bx-menu-alt-left", click: "updateElement('Text-align', 'center', 'textAlign')", label: "Text Align" },
  { iclass: "bx-font-family", click: "updateElement('Font-family', 'sans-serif', 'fontFamily')", label: "Font family" },
  { text: "⚖", click: "updateElement('Font-weight', '400', 'fontWeight')", label: "Font Weight" },
  { iclass: "bx-font-size", click: "updateElement('Font-size', '15px', 'fontSize')", label: "Font size" },
  { iclass: "bx-border-all", click: "updateElement('Border', '2px solid teal', 'border')", label: "Border" },
  { iclass: "bx-border-radius", click: "updateElement('Border-radius', '5px', 'borderRadius')", label: "Border-radius" },
  { iclass: "bx-outline", click: "updateElement('Outline', '2px solid dodgerblue', 'outline')", label: "Outline" },
  { text: "◼", click: "updateElement('Box Shadow', '2px 0px 16px rgba(0,0,0,0.1)', 'boxShadow')", label: "Box Shadow" },
  { text: "•••", click: "updateElement('ClassName', 'container', 'className', true)", label: "Class Name" },
  { iclass: "bxs-pen", click: "updateElement('', '', '')" },
  { iclass: "bxs-square", click: "updateElement('', '', '')" },
  { iclass: "bxs-paint", click: "updateElement('', '', '')" }]