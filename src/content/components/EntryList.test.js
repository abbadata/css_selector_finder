import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EntryList from "./EntryList";
import { isExportDeclaration } from "typescript";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    listState: ["AAA", "BBB", "CCC"],
    onAddHandler: jest.fn(),
    onDeleteHandler: jest.fn(),
    enabled: true,
  };

  const enzymeWrapper = shallow(<EntryList {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("EntryList test", () => {
  it("render list of 3 strings", () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.find(".list-entry").length).toBe(3);
  });

  it("click a delete button on a list item", () => {
    const { enzymeWrapper, props } = setup();
    const deleteButton = enzymeWrapper.find(".delete-button").first();
    deleteButton.props().onClick();
    expect(props.onDeleteHandler.mock.calls.length).toBe(1);
  });

  it("click the add button", () => {
    const { enzymeWrapper, props } = setup();
    const addField = enzymeWrapper.find(".add-field");
    // setting value on controlled text input field
    addField.props().onChange({ target: { value: "DDD" } });
    const addButton = enzymeWrapper.find(".add-button");
    addButton.props().onClick();
    expect(props.onAddHandler.mock.calls.length).toBe(1);
    expect(props.onAddHandler.mock.calls[0][0]).toBe("DDD");
  });
});
