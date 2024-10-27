const updateElement = (title, placeholder, prop, isAttribute) => {

  Footer.data.modalDisplay = "flex";
  Footer.data.modalTitle = title;
  Footer.data.modalPlaceholder = placeholder;
  const value = isAttribute ? currentElement[prop] : currentElement.style[prop];
  Footer.data.modalInputValue = value != "undefined" ? value : '';

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