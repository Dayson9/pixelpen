const saveAsFile = () => {

}

const toggleMenu = () => {
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


const deleteElement = () => {
  currentElement = document.querySelector("[data-pxp=pxpEl]");
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
  const curr = document.querySelector("[data-pxp=pxpEl]");
  if (curr) {
    curr.removeAttribute("data-pxp");
  }

  const parent = curr?.parentElement;
  if (parent?.id !== "out") {
    parent.innerHTML += `${curr.outerHTML}`;
    Canvas.data.html = out.innerHTML;
  } else {
    Canvas.data.html = out.innerHTML + `${curr.outerHTML}`;
  }
  const children = out.querySelectorAll("*");
  children[children.length - 1].dataset.pxp = "pxpEl";
  currentElement = document.querySelector("[data-pxp=pxpEl]");

  updateHighlighter();
  addClick();
  localStorage.setItem("pxp-html", Canvas.data.html);
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
    if (currentElement.dataset.pxp)
      Highlighter.data.display = "block";
    Header.data.hideShowIcon = "bx-hide";
  }
}

const startCountDown = () => {
  NoticeModal.data.undoCounter = 7;
  clearInterval(countDownInterval);
  countDownInterval = setInterval(() => {
    if (NoticeModal.data.undoCounter === 1) {
      clearInterval(countDownInterval);
      NoticeModal.data.undoDisplay = 'none';
    } else {
      NoticeModal.data.undoCounter--;
    }
  }, 1000);
}


const openModal = (title, msg, actionMsg) => {
  if (currentElement.tagName) {
    NoticeModal.data.headingMsg = title;
    NoticeModal.data.noticeMsg = msg;
    NoticeModal.data.actionMsg = actionMsg;

    const btn = document.getElementById("action");

    NoticeModal.data.shown = true;

    switch (actionMsg) {
      case 'Delete':
        btn.onclick = () => {
          currentHTML = out.innerHTML;
          NoticeModal.data.undoDisplay = 'flex';
          NoticeModal.data.feedbackMsg = `[${currentElement.tagName}] element was deleted`;
          startCountDown();
          deleteElement();
          NoticeModal.data.shown = false;
          toggleMenu();
        }
        break;

      case 'Clear':
        btn.onclick = () => {
          currentHTML = Canvas.data.html;
          NoticeModal.data.undoDisplay = 'flex';
          NoticeModal.data.feedbackMsg = 'Canvas was cleared.'
          startCountDown();
          clearCanvas();
          NoticeModal.data.shown = false;
          toggleMenu();
        }
        break;

      case 'Clone':
        btn.onclick = () => {
          cloneElement();
          NoticeModal.data.shown = false;
          toggleMenu();
        }
        break;
    }
  }
}

const openElementMenu = (isInner) => {
  const all = document.querySelectorAll(".scrolldiv > span");
  if (isInner) {
    for (const child of all) {
      child.onclick = function() {
        if (currentElement.dataset.pxp) {
          currentElement.innerHTML += formatTag(this.innerText);
          Highlighter.data.display = "block";
          ElementMenu.data.display = "none";
          Canvas.data.html = out.innerHTML;
          appendNewDataset();
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

const undo = () => {
  Canvas.data.html = currentHTML;
  NoticeModal.data.undoDisplay = 'none';
  addClick();
  updateHighlighter();
  localStorage.setItem('pxp-html', Canvas.data.html);
}

const openHTU = () => {
  HowToUse.data.display = 'block';
  Canvas.data.screenBlur = 8;
  toggleMenu();
}