import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import store from "../store";
import BottomPanel from "./BottomPanel";
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

it.skip("Render with nothing in selection", () => {
  act(() => {
    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>,
      container
    );
  });
  expect(container.innerHTML).toMatch(/Custom Selectors/);
});

it("Move bottom panel to the top and back down again", () => {
  act(() => {
    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>,
      container
    );
  });

  const moveUpElement = document.querySelector("#move-up-arrow");
  act(() => {
    moveUpElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(container.innerHTML).toMatch(/move-down-arrow/);

  const moveDownElement = document.querySelector("#move-down-arrow");
  act(() => {
    moveDownElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(container.innerHTML).toMatch(/move-up-arrow/);
});
