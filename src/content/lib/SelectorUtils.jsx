import finder from "@medv/finder";

export const getShortSelector = (elem, root) => {
  console.log("getShortSelector root: ", root);
  const selector = finder(elem, {
    root: document.querySelector(root),
    className: name => {
      return !name.startsWith("abba-");
    }
  });
  return selector;
};

export const getLongSelector = (elem, root) => {
  const selector = finder(elem, {
    root: document.querySelector(root),
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
