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


globalThis.saveAsFile = saveAsFile;
globalThis.openMenu = openMenu;


export default saveAsFile;