import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";

const ContentPageApp = () => {
  const selectorFinderEnabled = useSelector(
    state => state.PluginReducer.selectorFinderEnabled
  );
  const dispatch = useDispatch();

  return (
    <div>
      <SidePanel />
      <BottomPanel />
    </div>
  );
};

export default ContentPageApp;
