
const updateElement = (title, placeholder, prop, isAttribute) => {

  Footer.data.modalDisplay = "flex";
  Footer.data.modalTitle = title;
  Footer.data.modalPlaceholder = placeholder;
  Footer.data.modalInputValue = currentElement.style[prop] ?? currentElement[prop];

  const input = document.getElementById("footer-input");

  if (isAttribute) {
    input.oninput = function() {
      currentElement[prop] = this.value;
    }
  } else {
    input.oninput = function() {
      currentElement.style[prop] = this.value;
    }
  }
}

var currentElement = {};