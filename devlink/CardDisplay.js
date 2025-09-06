"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CardDisplay.module.css";

export function CardDisplay({ as: _Component = _Builtin.Section, slot }) {
  return (
    <_Component
      className={_utils.cx(_styles, "section")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "card-display")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        {slot}
      </_Builtin.BlockContainer>
    </_Component>
  );
}
