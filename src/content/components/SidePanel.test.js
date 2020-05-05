import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import store from "../store";
import SidePanel from "./SidePanel";
import { Provider } from "react-redux";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Render with nothing in selection", () => {
  act(() => {
    render(
      <Provider store={store}>
        <SidePanel />
      </Provider>,
      container
    );
  });
  expect(container.textContent).toMatch(/Please select an element/);
});

it("Move side panel to left and back to right", () => {
  act(() => {
    render(
      <Provider store={store}>
        <SidePanel />
      </Provider>,
      container
    );
  });

  // click the left-arrow div and make sure the output has the right-arrow div
  const moveLeftElement = document.querySelector("#move-left-arrow");
  act(() => {
    moveLeftElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(container.innerHTML).toMatch(/move-right-arrow/);

  // click the right-arrow div and make sure the output has the left-arrow div
  const moveRightElement = document.querySelector("#move-right-arrow");
  act(() => {
    moveRightElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(container.innerHTML).toMatch(/move-left-arrow/);
});
