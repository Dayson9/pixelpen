const saveAsFile = () => {

}

const openMenu = () => {
  const first = () => {
    setTimeout(() => {
      Menu.data.translate[0] = 8;
      Menu.data.translate[1] = 0;
    }, 0);
  }
  const second = () => {
    setTimeout(() => {
      Menu.data.translate[0] = 0;
      Menu.data.translate[2] = 8;
    }, 200);
  }

  const third = () => {
    setTimeout(() => {
      Menu.data.translate[2] = 0;
      Menu.data.translate[1] = 8;
      Menu.data.translate[0] = 0;
    }, 400);
  }

  const fourth = () => {
    setTimeout(() => {
      Menu.data.translate[1] = -8;
      Menu.data.translate[0] = 8;
    }, 200);
  }

  const fifth = () => {
    setTimeout(() => {
      Menu.data.translate[2] = 8;
    }, 400);
  }

  const sixth = () => {
    setTimeout(() => {
      Menu.data.translate[2] = 0;
      Menu.data.translate[1] = 0;
      Menu.data.translate[0] = 0;
    }, 0);
  }

  if (Menu.data.isOpened) {
    first();
    second();
    third();
    Menu.data.isOpened = false;
  } else {
    fourth();
    fifth();
    sixth();
    Menu.data.isOpened = true;
  }
}

//localStorage.clear();


const deleteElement = () => {
  currentElement = document.getElementById("pxp-current");
  if (currentElement) {
    currentElement.remove();
    Highlighter.data.display = "none";
  }

  Canvas.data.html = out.innerHTML;
  currentElement = {};
  localStorage.setItem("pxp-html", Canvas.data.html);
  addClick();
}

const cloneElement = () => {
  const curr = document.getElementById("pxp-current");
  if (curr) {
    curr.removeAttribute("id");
  }

  const parent = curr?.parentElement;
  if (parent?.id !== "out") {
    parent.innerHTML += `${curr.outerHTML}`;
    Canvas.data.html = out.innerHTML;
  } else {
    Canvas.data.html = out.innerHTML + `${curr.outerHTML}`;
  }
  const children = out.querySelectorAll("*");
  children[children.length - 1].id = "pxp-current";
  currentElement = document.getElementById("pxp-current");

  updateHighlighter();
  addClick();
}

const clearCanvas = () => {
  Canvas.data.html = "";
  localStorage.clear();
  Highlighter.data.display = "none";
}

const toggleHighlighter = () => {
  if (Highlighter.data.display === "block") {
    Highlighter.data.display = "none";
    Header.data.hideShowIcon = "bx-show";
  } else {
    if (currentElement.id)
      Highlighter.data.display = "block";
    Header.data.hideShowIcon = "bx-hide";
  }
}


const openModal = (title, msg, actionMsg) => {
  NoticeModal.data.headingMsg = title;
  NoticeModal.data.noticeMsg = msg;
  NoticeModal.data.actionMsg = actionMsg;

  const btn = document.getElementById("action");

  NoticeModal.data.shown = true;

  switch (actionMsg) {
    case 'Delete':
      btn.onclick = () => {
        deleteElement();
        NoticeModal.data.shown = false;
      }
      break;

    case 'Clear':
      btn.onclick = () => {
        clearCanvas();
        NoticeModal.data.shown = false;
      }
      break;

    case 'Clone':
      btn.onclick = () => {
        cloneElement();
        NoticeModal.data.shown = false;
      }
      break;
  }
}

const openElementMenu = (isInner) => {
  const all = document.querySelectorAll(".scrolldiv > span");
  if (isInner) {
    for (const child of all) {
      child.onclick = function() {
        if (currentElement.id) {
          currentElement.innerHTML += formatTag(this.innerText);
          Highlighter.data.display = "block";
          ElementMenu.data.display = "none";
          Canvas.data.html = out.innerHTML;
          appendNewID();
          updateHighlighter();
          addClick();

          localStorage.setItem("pxp-html", out.innerHTML);

        }
      }
    }
  } else {
    for (const child of all) {
      child.onclick = function() {
        appendNewElement(this.innerText);
      }
    }
  }

  ElementMenu.data.display = 'block';
}

globalThis.saveAsFile = saveAsFile;
globalThis.openMenu = openMenu;
globalThis.deleteElement = deleteElement;
globalThis.cloneElement = cloneElement;
globalThis.clearCanvas = clearCanvas;
globalThis.toggleHighlighter = toggleHighlighter;
globalThis.openModal = openModal;
globalThis.openElementMenu = openElementMenu;

export default saveAsFile;