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
  border: 1px solid #ccc;
  background: black;
  /*box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2); */
  padding: 2px;
  padding-right: 5px;
  text-align: left;
  flex-grow: 0;
`;
const Value = styled.input`
  display: inline;
  padding: 2px;
  text-align: left;
  flex-grow: 1;
  width: 400px;
  background-color: #fff;
  border-width: 2px;
`;
const DisabledValue = styled.input`
  display: inline;
  padding: 2px;
  text-align: left;
  flex-grow: 1;
  width: 400px;
  background-color: #bbb;
  border-width: 2px;
`;
const Status = styled.div`
  width: 100%;
  color: red;
  padding: 2px;
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

const SelectorChooser = () => {
  const selectorRoot = useSelector(
    (state) => state.PluginReducer.selectionState.selectorRoot
  );
  const tempSelectorRoot = useSelector(
    (state) => state.PluginReducer.selectionState.tempSelectorRoot
  );
  const selectorRootEditMode = useSelector(
    (state) => state.PluginReducer.selectionState.selectorRootEditMode
  );

  const generatedSelector = useSelector(
    (state) => state.PluginReducer.selectionState.generatedSelector
  );
  const isIdEnabled = useSelector(
    (state) => state.PluginReducer.finderState.isIdEnabled
  );
  const isClassEnabled = useSelector(
    (state) => state.PluginReducer.finderState.isClassEnabled
  );
  const isTagEnabled = useSelector(
    (state) => state.PluginReducer.finderState.isTagEnabled
  );
  const idFilter = useSelector(
    (state) => state.PluginReducer.finderState.idFilter
  );
  const classFilter = useSelector(
    (state) => state.PluginReducer.finderState.classFilter
  );
  const tagFilter = useSelector(
    (state) => state.PluginReducer.finderState.tagFilter
  );
  const seedMinLength = useSelector(
    (state) => state.PluginReducer.finderState.seedMinLength
  );
  const optimizedMinLength = useSelector(
    (state) => state.PluginReducer.finderState.optimizedMinLength
  );
  const errorMessage = useSelector(
    (state) => state.PluginReducer.finderState.errorMessage
  );
  const dispatch = useDispatch();

  function getErrorMessageHtml() {
    if (errorMessage !== "") {
      return <Status>{errorMessage}</Status>;
    }
    return "";
  }

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
        </div>
      );
    }
  }

  return (
    <div>
      <InputLine>
        <Label>Selector Root:</Label>
        {getSelectorRootHtml()}
      </InputLine>
      <InputLine>
        <Label>Custom Selector:</Label>
        <Value type="text" value={generatedSelector}></Value>
      </InputLine>
      <CustTable>
        <thead>
          <tr>
            <td></td>
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
            <td>Filter Out:</td>
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
      <input
        type="button"
        value="Generate Selector"
        onClick={() => dispatch({ type: "GENERATE_SELECTOR" })}
      ></input>
      <br></br>
      {getErrorMessageHtml()}
    </div>
  );
};

export default SelectorChooser;
