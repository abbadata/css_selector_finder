import finder from "@medv/finder";
import * as Types from "../Types";

export const getSelector = (elem, options) => {
  let rootelem = document.body;
  if (options.root) {
    rootelem = document.querySelector(options.root);
  }
  const selector = finder(elem, {
    root: rootelem,
    idName: (name) => {
      if (!options.isIdEnabled) {
        return false;
      } else {
        return options.idFilter.every((nm) => {
          return nm !== name;
        });
      }
    },
    className: (name) => {
      if (name.startsWith(Types.CLASS_PREFIX)) {
        return false;
      }
      if (!options.isClassEnabled) {
        return false;
      } else {
        return options.classFilter.every((nm) => {
          return nm !== name;
        });
      }
    },
    tagName: (name) => {
      if (!options.isTagEnabled) {
        return false;
      } else {
        return options.tagFilter.every((nm) => {
          return nm !== name;
        });
      }
    },
  });
  return selector;
};

export const markRootSelector = (selector) => {
  let elem = document.querySelector(selector);
  if (elem) {
    elem.classList.add(Types.CLASS_ROOT_ELEMENT);
  }
};

export const unmarkRootSelector = (selectorElement) => {
  if (selectorElement) {
    selectorElement.classList.remove(Types.CLASS_ROOT_ELEMENT);
  }
};

export const markTempSelector = (selector) => {
  let elems = document.querySelectorAll(selector);
  let selList = [];
  elems.forEach((elem) => {
    elem.classList.add(Types.CLASS_TEMP_SELECTED_ELEMENT);
    selList.push({ element: elem });
  });
  return selList;
};

export const unmarkTempSelector = (selectedList) => {
  if (selectedList !== null) {
    selectedList.forEach((item) => {
      item.element.classList.remove(Types.CLASS_TEMP_SELECTED_ELEMENT);
    });
  }
};

export const verifySelector = (selector) => {
  try {
    let elem = document.querySelector(selector);
  } catch (e) {
    return false;
  }
  return true;
};

export const copyTextToClipboard = (text) => {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

export const isDescendant = (parent, child) => {
  var node = child.parentNode;
  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};
