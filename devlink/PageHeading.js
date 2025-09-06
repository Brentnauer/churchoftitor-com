"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PageHeading.module.css";

export function PageHeading({
  as: _Component = _Builtin.Section,
  title = "Heading",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "page-heading")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "page-header-inner")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(_styles, "page-heading-title")}
          tag="h2"
        >
          {title}
        </_Builtin.Heading>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
