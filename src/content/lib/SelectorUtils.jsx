import finder from "@medv/finder";

export const getSelector = (elem, options) => {
  let rootelem = document.body;
  if (options.root) {
    rootelem = document.querySelector(options.root);
  }
  const selector = finder(elem, {
    root: rootelem,
    idName: name => {
      if (!options.isIdEnabled) {
        return false;
      } else {
        return options.idFilter.every(nm => {
          return nm !== name;
        });
      }
    },
    className: name => {
      if (name.startsWith("abba-")) {
        return false;
      }
      if (!options.isClassEnabled) {
        return false;
      } else {
        return options.classFilter.every(nm => {
          return nm !== name;
        });
      }
    },
    tagName: name => {
      if (!options.isTagEnabled) {
        return false;
      } else {
        return options.tagFilter.every(nm => {
          return nm !== name;
        });
      }
    }
  });
  return selector;
};

export const getShortSelector = (elem, root) => {
  let rootelem = null;
  rootelem = document.querySelector(root);
  const selector = finder(elem, {
    root: rootelem,
    className: name => {
      return !name.startsWith("abba-");
    }
  });
  return selector;
};

export const getLongSelector = (elem, root) => {
  let rootelem = null;
  rootelem = document.querySelector(root);
  const selector = finder(elem, {
    root: rootelem,
    className: name => {
      return !name.startsWith("abba-");
    },
    seedMinLength: 5,
    optimizedMinLength: 5
  });
  return selector;
};

export const markTempSelector = selector => {
  let elems = document.querySelectorAll(selector);
  let selList = [];
  elems.forEach(elem => {
    elem.classList.add("abba-temp-selected-element");
    selList.push({ element: elem });
  });
  return selList;
};

export const unmarkTempSelector = selectedList => {
  selectedList.forEach(item => {
    item.element.classList.remove("abba-temp-selected-element");
  });
};

export const verifySelector = selector => {
  try {
    let elem = document.querySelector(selector);
  } catch (e) {
    return false;
  }
  return true;
};
