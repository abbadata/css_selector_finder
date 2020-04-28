import "rc-checkbox/assets/index.css";
import Checkbox from "rc-checkbox";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import EntryList from "./EntryList";

const InputLine = styled.div`
  display: flex;
`;
const Label = styled.div`
  display: inline-block;
  color: white;
  border: 1px solid #7892c2;
  background-color: #7892c2;
  padding: 2px;
  padding-right: 5px;
  text-align: left;
  flex-grow: 0;
`;

const RootLabel = styled.div`
  display: inline-block;
  color: black;
  padding: 2px;
  padding-right: 5px;
  padding-left: 15px;
  text-align: left;
  flex-grow: 0;
`;

const Value = styled.input`
  display: inline;
  padding: 2px;
  text-align: left;
  flex-grow: 1;
  width: 500px;
  background-color: #fff;
  border-width: 2px;
`;
const DisabledValue = styled.input`
  display: inline;
  padding: 2px;
  text-align: left;
  flex-grow: 1;
  width: 500px;
  background-color: #bbb;
  border-width: 2px;
`;

const Center = styled.div`
  text-align: left;
  padding-left: 3px;
  padding-right: 3px;
`;

const FilterDiv = styled.div`
  text-align: left;
  padding-left: 10px;
  font-weight: bold;
`;

const CustTable = styled.table`
  border-spacing: 0px;
`;
const GenButton = styled.a`
  box-shadow: 0px 0px 0px 2px #9fb4f2;
  background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
  background-color: #7892c2;
  border-radius: 10px;
  border: 1px solid #4e6096;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 19px;
  padding: 7px 32px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #283966;
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
    background-color: #476e9e;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const SelectorSettings = () => {
  const finderSettings = useSelector((state) => state.finder.settings);
  const selectorRoot = useSelector(
    (state) => state.selection.selectionState.selectorRoot
  );
  const tempSelectorRoot = useSelector(
    (state) => state.selection.selectionState.tempSelectorRoot
  );
  const selectorRootEditMode = useSelector(
    (state) => state.selection.selectionState.selectorRootEditMode
  );

  const generatedSelector = useSelector(
    (state) => state.selection.selectionState.generatedSelector
  );
  const isIdEnabled = useSelector((state) => state.finder.settings.isIdEnabled);
  const isClassEnabled = useSelector(
    (state) => state.finder.settings.isClassEnabled
  );
  const isTagEnabled = useSelector(
    (state) => state.finder.settings.isTagEnabled
  );
  const idFilter = useSelector((state) => state.finder.settings.idFilter);
  const classFilter = useSelector((state) => state.finder.settings.classFilter);
  const tagFilter = useSelector((state) => state.finder.settings.tagFilter);
  const seedMinLength = useSelector(
    (state) => state.finder.settings.seedMinLength
  );
  const optimizedMinLength = useSelector(
    (state) => state.finder.settings.optimizedMinLength
  );
  const dispatch = useDispatch();

  function getSelectorRootHtml() {
    if (selectorRootEditMode) {
      return (
        <div>
          <Value
            type="text"
            value={tempSelectorRoot}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_SELECTOR_ROOT",
                payload: { value: e.target.value },
              })
            }
          ></Value>
          <input
            type="button"
            value="Save"
            onClick={() => {
              dispatch({ type: "SAVE_TEMP_SELECTOR_ROOT" });
            }}
          ></input>
          <input
            type="button"
            value="Cancel"
            onClick={() => {
              dispatch({ type: "CANCEL_TEMP_SELECTOR_ROOT" });
            }}
          ></input>
        </div>
      );
    } else {
      return (
        <div>
          <DisabledValue
            type="text"
            value={selectorRoot}
            disabled={true}
          ></DisabledValue>
          <input
            type="button"
            value="Edit"
            onClick={() => {
              dispatch({ type: "ENABLE_SELECTOR_ROOT_EDIT" });
            }}
          ></input>
          <input
            type="button"
            value="Reset"
            onClick={() => {
              dispatch({ type: "RESET_SELECTOR_ROOT" });
            }}
          ></input>
        </div>
      );
    }
  }

  return (
    <div>
      <CustTable>
        <tbody>
          <tr>
            <td>
              <GenButton
                onClick={() =>
                  dispatch({
                    type: "GENERATE_SELECTOR",
                    payload: {
                      finderSettings: finderSettings,
                      rootElement: selectorRoot,
                    },
                  })
                }
              >
                Generate
              </GenButton>
            </td>
            <td>
              <InputLine>
                <Label>Custom Selector:</Label>
                <Value type="text" value={generatedSelector} size={150}></Value>
                <input
                  type="button"
                  value="Copy to Clipboard"
                  onClick={() => {
                    dispatch({ type: "COPY_SELECTOR_TO_CLIPBOARD" });
                  }}
                ></input>
                <input
                  type="button"
                  value="Use As Selector Root"
                  onClick={() => {
                    dispatch({ type: "USE_AS_SELECTOR_ROOT" });
                  }}
                ></input>
              </InputLine>
              <InputLine>
                <RootLabel>Selector Root:</RootLabel>
                {getSelectorRootHtml()}
              </InputLine>
            </td>
          </tr>
        </tbody>
      </CustTable>
      <CustTable>
        <thead>
          <tr>
            <td></td>
            <td>
              <Center>
                Use IDs in Selectors:
                <Checkbox
                  checked={isIdEnabled}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FINDER_ID_ENABLED",
                      payload: { enabled: e.target.checked },
                    })
                  }
                ></Checkbox>
              </Center>
            </td>
            <td></td>
            <td>
              <Center>
                Use Class in Selectors:
                <Checkbox
                  checked={isClassEnabled}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FINDER_CLASS_ENABLED",
                      payload: { enabled: e.target.checked },
                    })
                  }
                ></Checkbox>
              </Center>
            </td>
            <td></td>
            <td>
              <Center>
                Use Tags in Selectors:
                <Checkbox
                  checked={isTagEnabled}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FINDER_TAG_ENABLED",
                      payload: { enabled: e.target.checked },
                    })
                  }
                ></Checkbox>
              </Center>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FilterDiv>ID:</FilterDiv>
            </td>
            <td>
              <EntryList
                enabled={isIdEnabled}
                listState={idFilter}
                onDeleteHandler={(value) => {
                  dispatch({
                    type: "DELETE_FINDER_ID_FILTER",
                    payload: { value },
                  });
                }}
                onAddHandler={(value) => {
                  dispatch({
                    type: "ADD_FINDER_ID_FILTER",
                    payload: { value },
                  });
                }}
              ></EntryList>
            </td>
            <td>
              <FilterDiv>Class:</FilterDiv>
            </td>
            <td>
              <EntryList
                enabled={isClassEnabled}
                listState={classFilter}
                onDeleteHandler={(value) => {
                  dispatch({
                    type: "DELETE_FINDER_CLASS_FILTER",
                    payload: { value },
                  });
                }}
                onAddHandler={(value) => {
                  dispatch({
                    type: "ADD_FINDER_CLASS_FILTER",
                    payload: { value },
                  });
                }}
              ></EntryList>
            </td>
            <td>
              <FilterDiv>Tag:</FilterDiv>
            </td>
            <td>
              <EntryList
                enabled={isTagEnabled}
                listState={tagFilter}
                onDeleteHandler={(value) => {
                  dispatch({
                    type: "DELETE_FINDER_TAG_FILTER",
                    payload: { value },
                  });
                }}
                onAddHandler={(value) => {
                  dispatch({
                    type: "ADD_FINDER_TAG_FILTER",
                    payload: { value },
                  });
                }}
              ></EntryList>
            </td>
            <td>
              <FilterDiv>
                Seed Min Length:
                <input
                  type="text"
                  size={5}
                  value={seedMinLength}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FINDER_SEED_MIN_LENGTH",
                      payload: { value: e.target.value },
                    })
                  }
                ></input>
                <br></br>
                Optimized Min Length:
                <input
                  type="text"
                  size={5}
                  value={optimizedMinLength}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FINDER_OPTIMIZED_MIN_LENGTH",
                      payload: { value: e.target.value },
                    })
                  }
                ></input>
              </FilterDiv>
            </td>
          </tr>
        </tbody>
      </CustTable>
    </div>
  );
};

export default SelectorSettings;