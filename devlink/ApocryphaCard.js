"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ApocryphaCard.module.css";

export function ApocryphaCard({
  as: _Component = _Builtin.Link,

  link = {
    href: "#",
  },

  title = "Heading",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "link-block")}
      button={false}
      block="inline"
      options={link}
    >
      <_Builtin.Heading className={_utils.cx(_styles, "heading")} tag="h2">
        {title}
      </_Builtin.Heading>
    </_Component>
  );
}
