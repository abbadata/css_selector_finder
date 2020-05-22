import finder from "@medv/finder";
import * as Types from "../Types";

export const getSelector = (elem, options) => {
  let rootelem = document.body;
  if (options.root) {
    //rootelem = document.querySelector(options.root);
    rootelem = options.root;
  }
  const selector = finder(elem, {
    root: options.root ? options.root : document.body,
    seedMinLength: options.seedMinLength,
    optimizedMinLength: options.optimizedMinLength,
    threshold: options.threshhold,
    maxNumberOfTries: options.maxNumberOfTries,
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
    attr: (name, value) => {
      if (!options.isAttributeEnabled) {
        return false;
      } else {
        return options.attributeFilter.some((entry) => {
          let m = entry.match(/"([^=]+)"\s=\s"(.*)"/s);
          if (m) {
            if (
              m[1].toUpperCase() === name.toUpperCase() &&
              (m[2] === "*" || m[2].toUpperCase() === value.toUpperCase())
            ) {
              return true;
            }
            return false;
          }
        });
      }
    },
  });
  return selector;
};

export const markSelectedElement = (selector) => {
  let elem =
    typeof selector == "object" ? selector : document.querySelector(selector);
  if (elem) {
    elem.classList.add(Types.CLASS_SELECTED_ELEMENT);
  }
};

export const unmarkSelectedElement = (selectorElement) => {
  if (selectorElement) {
    selectorElement.classList.remove(Types.CLASS_SELECTED_ELEMENT);
  }
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
  let elems = [];
  try {
    elems = document.querySelectorAll(selector);
  } catch (error) {}
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
