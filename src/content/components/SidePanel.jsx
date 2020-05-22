import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import FieldSummary from "./FieldSummary";
import FieldSelectionPicker from "./FieldSelectionPicker";
import FieldSelectionRoot from "./FieldSelectionRoot";
import FieldSelector from "./FieldSelector";
import * as Types from "../Types";

const FieldOptions = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2147483647;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 200px;
  width: 300px;
  background-color: white;
  overflow: auto;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.6);
`;

const HeaderDiv = styled.div`
  width: 100%;
  text-align: left;
  background-color: white;
  box-shadow: 0px 5px 5px #333333;
  padding-bottom: 5px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  background-image: linear-gradient(to right, #dddddd, white);
`;

const HeaderText = styled.div`
  color: black;
  font-weight: bold;
  font-size: 150%;
  text-align: left;
  vertical-align: top;
  display: inline-block;
  margin-left: 10px;
  margin-top: 5px;
`;

const AbbaLogo = styled.div`
  background-size: 64px 64px;
  width: 64px;
  height: 64px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEu0lEQVR4Xu1aTUhbWRg9GX8mikJi/RnNrlMc6saCi4iC7qSKpLpIoQrihGoRasUiXXXZaUMXFaqbagmimEVnIRHRjauAgotCV4pO7S51TJyJjBnJqBnLd+G+uYkvee8lZmLpfZv83Hu/vO9855x7c+8zOZ3Oc+TwcrvdOfx1wCQBkAyQEpAeYNSFmpub0d7ejvz8fPj9fiwvL8eF6OvrQ11dnWrYaDQKr9eLnZ0d1j5VVgbLmzeqfSMOB0LPn+O8qOhC++SkFePjVty79xeePv0DZnN6dUzLBMUEA4EAJiYmdANAHcPhMGZmZrC/v58SAOp7+OAB/nzyJC7+4WEeRkcr4fcX4ebNE7x+vY/r10+N1pH1NwxAbW0tenp6cHZ2xgKYzWasrKxgbW1NuQEO0ObmJmZnZ5Xv+VhiDh/DGfDZ60XUblf6Fnz8iGqXC7GKCvz+9i1iVqvS5vOV4PHjSoyOhhkL6PXhw/D/A0BHRwdaWlpAyR0cHCjvxUS1AKA75TLQAiDa0BAng2jUhGfPriEQKMCLFyFMTlrY+/HxICyWmGEQDDNgeHgYVVVVrIKhUIixQUyI3qfyAGoXfSOVB5zZbNjzeHB644aS2KdPBXj0qAq3b//Nqs7Z8OpVEHfuRLILADe/o6MjRcM8WTEpLQBIPokSSHbn/9y6FScBbn7v3n1GQ0MU3A9sttO0zNAQA1IlJpphMgkQc/r7+2G1WpmESDbJJJAXDuOH+/fx/YcP4P4gml8iYOmaoW4AxJtXq5ZY1WQAiPLggCUDgPqWvXzJpsiQ240jpxPv35tx925NUpqnY4a6AVCjP7+TxISzxYBE+vPf58ygz0bNUDcAZH42m02hrlgGDg6xgNy9sbEx6UKIxqXjAb+FK5n5VVTEVJPk4Bg1Q10AqM3fIgCiPMgMy8vLkwIgJk8xUs0CogGKc7/anM/lYXRlqAsAw3OLgQFyP0BuiMgdIUUwJycnmJ+fx/b2NlwuF8h7tC76V0n/Q3p7e1FYWKjV/UL7lfMADgLNLN8MAFRFj8cTVx3OgPX1dSwuLiptDocDTU1N7PPCwgI2NjbixvH2xJh2ux3d3d1XjwEjIyNs7UB/qqqrq8ETVpNAJBLB3Nwcurq6WF+69EggFatyLgGqGG2M8OpQklNTU+js7GQS2Nvbw/T0NI6Pj1nCxcXFGBgY0ASAxwkGg0rV1UDNOQBETbo4AGK1ampqGBi0siTa62UAj2GxWFjcK80AqsrS0hIGBwdRUlLCKE1+QN+XlpZekMfq6mpSBlCiJJG2tjb4fD6FRWLMRGPNOQNoJSgaVn19PWjjlE+FtOvETbC1tRVbW1uMCVwG4tRJTFIzwcSYIghXAgDDk/clDpAAyLNBeTYozwZTnin98vOvl2g5lx8q76fdjIJqmqAEQDJASiAjjWV7sPQAaYJyFshIZabd3d2U64DY9o8Z/UC2B2fsARIAyQApgdTPl53/m20ZZxbf9F1G4zVNMKPoX8FgCYDWLPAVFDGjW5QMGBsbS+8h24xw/2/w0NDQJUVKL4zmhkh6YfWPkk+IyCdE5BMi+vWShZ7SA+TJkDwZkidDOV0IyXWAXAfIdUAWZnf9IeU64FtfB3wBlGWF7pUlW3EAAAAASUVORK5CYII=)
    top left no-repeat;
  margin-left: 5px;
  margin-top: 5px;
  padding: 0;
  display: inline-block;
  border: 1px solid;
`;

const MoveArrow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-size: 12px 12px;
  width: 12px;
  height: 12px;
  margin: 0;
  padding: 2px;
`;

const CenteredDiv = styled.div`
  margin-top: 50px;
  text-align: center;
  width: 100%;
`;

const MainDiv = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const ExitButton = styled.a`
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
  padding: 12px 37px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #283966;

  &:hover {
    background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
    background-color: #476e9e;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const SidePanel = ({ handleExit }) => {
  const vertPanelPosition = useSelector((state) => state.ui.vertPanelPosition);
  const horizPanelPosition = useSelector(
    (state) => state.ui.horizPanelPosition
  );
  const selectedElements = useSelector(
    (state) => state.selection.selectedElements
  );
  const vertPanelDiv = useSelector((state) => state.ui.vertPanelDiv);

  const dispatch = useDispatch();
  const panelRef = useRef();

  useEffect(() => {
    dispatch({
      type: "SET_VERT_PANEL_DIV",
      payload: { element: panelRef.current },
    });
  }, [vertPanelDiv]);

  function getMovePanel() {
    if (vertPanelPosition === Types.VERTPANEL_POS_RIGHT) {
      return (
        <MoveArrow id="move-left-arrow" onClick={moveToLeft}>
          {"\u25C0 "}
        </MoveArrow>
      );
    } else if (vertPanelPosition === Types.VERTPANEL_POS_LEFT) {
      return (
        <MoveArrow id="move-right-arrow" onClick={moveToRight}>
          {"\u25B6 "}
        </MoveArrow>
      );
    }
  }
  function moveToRight(e) {
    dispatch({
      type: "SET_VERT_PANEL_POSITION",
      payload: {
        element: panelRef.current,
        position: Types.VERTPANEL_POS_RIGHT,
      },
    });
  }
  function moveToLeft(e) {
    dispatch({
      type: "SET_VERT_PANEL_POSITION",
      payload: {
        element: panelRef.current,
        position: Types.VERTPANEL_POS_LEFT,
      },
    });
  }
  function getFieldOptionsHtml() {
    if (selectedElements.length === 3) {
      return <div>Please select an element.</div>;
    } else if (selectedElements.length <= 1) {
      return (
        <div>
          <FieldSelector></FieldSelector>
          <FieldSelectionRoot></FieldSelectionRoot>
          <FieldSummary selectedElements={selectedElements}></FieldSummary>
          <FieldSelectionPicker
            selectedElements={selectedElements}
          ></FieldSelectionPicker>
        </div>
      );
    } else {
      return <div>Selected More Than One Element</div>;
    }
  }

  return (
    <FieldOptions ref={panelRef}>
      {getMovePanel()}
      <HeaderDiv>
        <AbbaLogo></AbbaLogo>
        <HeaderText>
          CSS Selector<br></br>Finder
        </HeaderText>
      </HeaderDiv>
      <MainDiv>
        {getFieldOptionsHtml()}
        <CenteredDiv>
          <ExitButton
            onClick={() => {
              handleExit();
            }}
          >
            Exit
          </ExitButton>
        </CenteredDiv>
      </MainDiv>
    </FieldOptions>
  );
};

export default SidePanel;
