"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ApocryphaCard.module.css";

export function ApocryphaCard({
  as: _Component = _Builtin.Block,

  link = {
    href: "#",
  },

  title = "Heading",
  username = "Username",
  avatar = "",

  userLink = {
    href: "#",
    target: "_blank",
  },

  key,
  date = "Witnessed:Date",
}) {
  return (
    <_Component className={_utils.cx(_styles, "item-card")} tag="div" id={key}>
      <_Builtin.Link
        className={_utils.cx(_styles, "item-card-link")}
        button={false}
        block="inline"
        options={link}
      >
        <_Builtin.Heading tag="h2">{title}</_Builtin.Heading>
      </_Builtin.Link>
      <_Builtin.Block
        className={_utils.cx(_styles, "item-card-date")}
        tag="div"
      >
        {date}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "divider")} tag="div" />
      <_Builtin.Link
        className={_utils.cx(_styles, "item-card-meta")}
        button={false}
        target="_blank"
        block="inline"
        options={userLink}
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "item-card-avatar")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src={avatar}
        />
        <_Builtin.Block tag="div">{username}</_Builtin.Block>
      </_Builtin.Link>
    </_Component>
  );
}
