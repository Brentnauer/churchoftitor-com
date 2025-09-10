"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Footer.module.css";

export function Footer({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "footer")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-block-2")}
          tag="div"
        >
          {
            "© 2036 – 2025 The Church of Titor. All rights reserved in this and adjacent timelines."
          }
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
