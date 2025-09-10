"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WebringContent.module.css";

export function WebringContent({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "section")}
      tag="section"
      grid={{
        type: "section",
      }}
    >
      <_Builtin.BlockContainer
        tag="div"
        grid={{
          type: "container",
        }}
      >
        <_Builtin.HtmlEmbed value="%3Ca%20class%3D%22twitter-timeline%22%20data-width%3D%22800%22%20data-height%3D%22600%22%20data-theme%3D%22dark%22%20href%3D%22https%3A%2F%2Ftwitter.com%2FCERN%3Fref_src%3Dtwsrc%255Etfw%22%3ETweets%20by%20CERN%3C%2Fa%3E%20%3Cscript%20async%20src%3D%22https%3A%2F%2Fplatform.twitter.com%2Fwidgets.js%22%20charset%3D%22utf-8%22%3E%3C%2Fscript%3E" />
      </_Builtin.BlockContainer>
    </_Component>
  );
}
