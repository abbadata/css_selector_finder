import { getShortSelector, getLongSelector } from "./SelectorUtils";

export const removeElement = (element, selectedElements) => {
  let alreadyExists = selectedElements.some((elem, i) => {
    return elem.element === element;
  });
  if (alreadyExists) {
    let newSE = selectedElements.filter((elem, i) => {
      if (elem.element !== element) {
        return true;
      } else {
        return false;
      }
    });
    return { selectedElements: newSE, alreadyExists };
  } else {
    return { selectedElements, alreadyExists };
  }
};

const generateElementEntry = element => {
  return {
    element: element,
    elemtype: element.nodeName,
    text: element.innerText,
    html: element.innerHTML,
    shortselector: getShortSelector(element),
    longselector: getLongSelector(element)
  };
};

// returns a new selectedElements array
export const addElement = (element, selectedElements) => {
  let newSE = selectedElements.map((se, i) => {
    return { ...se };
  });
  newSE.push(generateElementEntry(element));
  return newSE;
};
