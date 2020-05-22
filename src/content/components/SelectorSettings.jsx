import "rc-checkbox/assets/index.css";
import Checkbox from "rc-checkbox";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import EntryList from "./EntryList";
import AttributeFilter from "./AttributeFilter";
import * as Types from "../Types";
import * as SelectionActions from "../actions/SelectionActions";
import * as FinderActions from "../actions/FinderActions";

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

const RootLabelDefault = styled.div`
  display: inline-block;
  color: black;
  padding: 2px;
  padding-right: 5px;
  padding-left: 15px;
  text-align: left;
  flex-grow: 0;
`;

const RootLabelNonDefault = styled.div`
  display: inline-block;
  color: black;
  padding: 2px;
  padding-right: 5px;
  padding-left: 15px;
  text-align: left;
  flex-grow: 0;
  background-color: rgb(139, 255, 168);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 15px,
    rgba(255, 255, 255, 0.5) 15px,
    rgba(255, 255, 255, 0.5) 30px
  );
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
const SelectorValue = styled.input`
  display: inline;
  padding: 2px;
  text-align: left;
  flex-grow: 1;
  width: 500px;
  background-color: #eedd82;
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

const SmallButton = styled.div`
  display: inline;
  color: white;
  border: 1px solid #ccc;
  background: #7892c2;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  padding-left: 2px;
  padding-right: 2px;
  text-align: left;
  flex-grow: 0;
  cursor: pointer;
`;

const SelectorSettings = () => {
  const finderSettings = useSelector((state) => state.finder.settings);
  const selectorRoot = useSelector(
    (state) => state.selection.selectionState.selectorRoot
  );
  const selectorRootElement = useSelector(
    (state) => state.selection.selectionState.selectorRootElement
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
  const isAttributeEnabled = useSelector(
    (state) => state.finder.settings.isAttributeEnabled
  );

  const idFilter = useSelector((state) => state.finder.settings.idFilter);
  const classFilter = useSelector((state) => state.finder.settings.classFilter);
  const tagFilter = useSelector((state) => state.finder.settings.tagFilter);
  const attributeFilter = useSelector(
    (state) => state.finder.settings.attributeFilter
  );
  const seedMinLength = useSelector(
    (state) => state.finder.settings.seedMinLength
  );
  const optimizedMinLength = useSelector(
    (state) => state.finder.settings.optimizedMinLength
  );
  const threshhold = useSelector((state) => state.finder.settings.threshhold);
  const maxNumberOfTries = useSelector(
    (state) => state.finder.settings.maxNumberOfTries
  );
  const dispatch = useDispatch();

  function getIdFilterHtml() {
    if (isIdEnabled) {
      return (
        <td>
          <FilterDiv>ID:</FilterDiv>
          <EntryList
            listState={idFilter}
            onDeleteHandler={(value) => {
              dispatch({
                type: FinderActions.DELETE_FINDER_ID_FILTER,
                payload: { value },
              });
            }}
            onAddHandler={(value) => {
              dispatch({
                type: FinderActions.ADD_FINDER_ID_FILTER,
                payload: { value },
              });
            }}
          ></EntryList>
        </td>
      );
    }
  }

  function getClassFilterHtml() {
    if (isClassEnabled) {
      return (
        <td>
          <FilterDiv>Class:</FilterDiv>
          <EntryList
            listState={classFilter}
            onDeleteHandler={(value) => {
              dispatch({
                type: FinderActions.DELETE_FINDER_CLASS_FILTER,
                payload: { value },
              });
            }}
            onAddHandler={(value) => {
              dispatch({
                type: FinderActions.ADD_FINDER_CLASS_FILTER,
                payload: { value },
              });
            }}
          ></EntryList>
        </td>
      );
    }
  }
  function getTagFilterHtml() {
    if (isTagEnabled) {
      return (
        <td>
          <FilterDiv>Tag:</FilterDiv>
          <EntryList
            listState={tagFilter}
            onDeleteHandler={(value) => {
              dispatch({
                type: FinderActions.DELETE_FINDER_TAG_FILTER,
                payload: { value },
              });
            }}
            onAddHandler={(value) => {
              dispatch({
                type: FinderActions.ADD_FINDER_TAG_FILTER,
                payload: { value },
              });
            }}
          ></EntryList>
        </td>
      );
    }
  }

  function getAttributeFilterHtml() {
    if (isAttributeEnabled) {
      return (
        <td>
          <FilterDiv>Attribute:</FilterDiv>
          <AttributeFilter
            listState={attributeFilter}
            onDeleteHandler={(value) => {
              dispatch({
                type: FinderActions.DELETE_FINDER_ATTRIBUTE_FILTER,
                payload: { value },
              });
            }}
            onAddHandler={(name, value) => {
              dispatch({
                type: FinderActions.ADD_FINDER_ATTRIBUTE_FILTER,
                payload: { name, value },
              });
            }}
          ></AttributeFilter>
        </td>
      );
    }
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
                type: SelectionActions.CHANGE_SELECTOR_ROOT,
                payload: { value: e.target.value },
              })
            }
          ></Value>
          <input
            type="button"
            value="Save"
            onClick={() => {
              dispatch({ type: SelectionActions.SAVE_TEMP_SELECTOR_ROOT });
            }}
          ></input>
          <input
            type="button"
            value="Cancel"
            onClick={() => {
              dispatch({ type: SelectionActions.CANCEL_TEMP_SELECTOR_ROOT });
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
            readOnly
          ></DisabledValue>
          <input
            type="button"
            value="Edit"
            onClick={() => {
              dispatch({ type: SelectionActions.ENABLE_SELECTOR_ROOT_EDIT });
            }}
          ></input>
          <input
            type="button"
            value="Reset"
            onClick={() => {
              dispatch({ type: SelectionActions.RESET_SELECTOR_ROOT });
            }}
          ></input>
        </div>
      );
    }
  }

  function getRootSelectorLabel() {
    if (selectorRoot == Types.DEFAULT_SELECTOR_ROOT) {
      return <RootLabelDefault>Selector Root:</RootLabelDefault>;
    } else {
      return <RootLabelNonDefault>Selector Root:</RootLabelNonDefault>;
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
                    type: SelectionActions.GENERATE_SELECTOR,
                    payload: {
                      finderSettings: finderSettings,
                      rootElement: selectorRootElement,
                    },
                  })
                }
              >
                Generate
              </GenButton>
            </td>
            <td>
              <InputLine>
                <Label>Selector:</Label>
                <SelectorValue
                  type="text"
                  value={generatedSelector}
                  size={150}
                  readOnly
                ></SelectorValue>
                <input
                  type="button"
                  value="Copy to Clipboard"
                  onClick={() => {
                    dispatch({
                      type: SelectionActions.COPY_SELECTOR_TO_CLIPBOARD,
                    });
                  }}
                ></input>
                <input
                  type="button"
                  value="Use As Selector Root"
                  onClick={() => {
                    dispatch({ type: SelectionActions.USE_AS_SELECTOR_ROOT });
                  }}
                ></input>
              </InputLine>
              <InputLine>
                {getRootSelectorLabel()}
                {getSelectorRootHtml()}
              </InputLine>
            </td>
          </tr>
        </tbody>
      </CustTable>
      <CustTable>
        <tbody>
          <tr>
            <td>
              Use IDs:
              <Checkbox
                checked={isIdEnabled}
                onChange={(e) =>
                  dispatch({
                    type: FinderActions.SET_FINDER_ID_ENABLED,
                    payload: { enabled: e.target.checked },
                  })
                }
              ></Checkbox>
              <br></br>
              Use Class Names:
              <Checkbox
                checked={isClassEnabled}
                onChange={(e) =>
                  dispatch({
                    type: FinderActions.SET_FINDER_CLASS_ENABLED,
                    payload: { enabled: e.target.checked },
                  })
                }
              ></Checkbox>
              <br></br>
              Use Tags:
              <Checkbox
                checked={isTagEnabled}
                onChange={(e) =>
                  dispatch({
                    type: FinderActions.SET_FINDER_TAG_ENABLED,
                    payload: { enabled: e.target.checked },
                  })
                }
              ></Checkbox>
              <br></br>
              Use Custom Attribute:
              <Checkbox
                checked={isAttributeEnabled}
                onChange={(e) =>
                  dispatch({
                    type: FinderActions.SET_FINDER_ATTRIBUTE_ENABLED,
                    payload: { enabled: e.target.checked },
                  })
                }
              ></Checkbox>
            </td>
            {getIdFilterHtml()}
            {getClassFilterHtml()}
            {getTagFilterHtml()}
            {getAttributeFilterHtml()}
            <td>
              <FilterDiv>
                Seed Min Length:
                <input
                  type="text"
                  size={5}
                  value={seedMinLength}
                  onChange={(e) =>
                    dispatch({
                      type: FinderActions.SET_FINDER_SEED_MIN_LENGTH,
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
                      type: FinderActions.SET_FINDER_OPTIMIZED_MIN_LENGTH,
                      payload: { value: e.target.value },
                    })
                  }
                ></input>
                <br></br>
                Threshhold:
                <input
                  type="text"
                  size={5}
                  value={threshhold}
                  onChange={(e) =>
                    dispatch({
                      type: FinderActions.SET_FINDER_THRESHHOLD,
                      payload: { value: e.target.value },
                    })
                  }
                ></input>
                <br></br>
                Max Number of Tries:
                <input
                  type="text"
                  size={5}
                  value={maxNumberOfTries}
                  onChange={(e) =>
                    dispatch({
                      type: FinderActions.SET_FINDER_MAX_NUMBER_OF_TRIES,
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
