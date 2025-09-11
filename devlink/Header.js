"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Header.module.css";

export function Header({
  as: _Component = _Builtin.Block,
  text = "Church of Titor",
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "caution-stripe")}
        tag="div"
      />
      <_Builtin.NavbarWrapper
        className={_utils.cx(_styles, "navbar")}
        tag="div"
        config={{
          animation: "default",
          collapse: "medium",
          docHeight: false,
          duration: 400,
          easing: "ease",
          easing2: "ease",
          noScroll: false,
        }}
      >
        <_Builtin.NavbarContainer
          className={_utils.cx(_styles, "container")}
          tag="div"
        >
          <_Builtin.NavbarBrand
            className={_utils.cx(_styles, "brand")}
            options={{
              href: "https://www.churchoftitor.com",
            }}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-block")}
              tag="div"
            >
              {text}
            </_Builtin.Block>
          </_Builtin.NavbarBrand>
          <_Builtin.NavbarMenu
            className={_utils.cx(_styles, "nav-wrapper")}
            tag="nav"
            role="navigation"
          >
            <_Builtin.DropdownWrapper tag="div" delay={0} hover={false}>
              <_Builtin.DropdownToggle
                className={_utils.cx(_styles, "nav-dropdown")}
                tag="div"
              >
                <_Builtin.Icon
                  widget={{
                    type: "icon",
                    icon: "dropdown-toggle",
                  }}
                />
                <_Builtin.Block tag="div">{"Transmissions"}</_Builtin.Block>
              </_Builtin.DropdownToggle>
              <_Builtin.DropdownList tag="nav">
                <_Builtin.DropdownLink
                  options={{
                    href: "/transmissions",
                  }}
                >
                  {"About Transmissions"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/transmissions/posts",
                  }}
                >
                  {"Posts"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/transmissions/faxes",
                  }}
                >
                  {"Faxes"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/transmissions/irc",
                  }}
                >
                  {"IRCChat"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/transmissions/scans",
                  }}
                >
                  {"Scans"}
                </_Builtin.DropdownLink>
              </_Builtin.DropdownList>
            </_Builtin.DropdownWrapper>
            <_Builtin.DropdownWrapper tag="div" delay={0} hover={false}>
              <_Builtin.DropdownToggle
                className={_utils.cx(_styles, "nav-dropdown")}
                tag="div"
              >
                <_Builtin.Icon
                  widget={{
                    type: "icon",
                    icon: "dropdown-toggle",
                  }}
                />
                <_Builtin.Block tag="div">{"Codex"}</_Builtin.Block>
              </_Builtin.DropdownToggle>
              <_Builtin.DropdownList tag="nav">
                <_Builtin.DropdownLink
                  options={{
                    href: "/codex",
                  }}
                >
                  {"About the Codex"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/codex/webring",
                  }}
                >
                  {"Webring"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/codex/scripts",
                  }}
                >
                  {"Scripts"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/codex/stories",
                  }}
                >
                  {"Stories"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/codex/videos",
                  }}
                >
                  {"Videos"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/codex/gallery",
                  }}
                >
                  {"Gallery"}
                </_Builtin.DropdownLink>
              </_Builtin.DropdownList>
            </_Builtin.DropdownWrapper>
            <_Builtin.DropdownWrapper tag="div" delay={0} hover={false}>
              <_Builtin.DropdownToggle
                className={_utils.cx(_styles, "nav-dropdown")}
                tag="div"
              >
                <_Builtin.Icon
                  widget={{
                    type: "icon",
                    icon: "dropdown-toggle",
                  }}
                />
                <_Builtin.Block tag="div">{"Doctrine"}</_Builtin.Block>
              </_Builtin.DropdownToggle>
              <_Builtin.DropdownList tag="nav">
                <_Builtin.DropdownLink
                  options={{
                    href: "/doctrine/articles-divergence",
                  }}
                >
                  {"Articles of Divergence"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/doctrine/travelers-testament",
                  }}
                >
                  {"Traveler's Testament"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "/doctrine/doctrine-divergence",
                  }}
                >
                  {"Apologetics"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "#",
                  }}
                >
                  {"Rituals"}
                </_Builtin.DropdownLink>
              </_Builtin.DropdownList>
            </_Builtin.DropdownWrapper>
            <_Builtin.DropdownWrapper tag="div" delay={0} hover={false}>
              <_Builtin.DropdownToggle
                className={_utils.cx(_styles, "nav-dropdown")}
                tag="div"
              >
                <_Builtin.Icon
                  widget={{
                    type: "icon",
                    icon: "dropdown-toggle",
                  }}
                />
                <_Builtin.Block tag="div">{"Offerings"}</_Builtin.Block>
              </_Builtin.DropdownToggle>
              <_Builtin.DropdownList tag="nav">
                <_Builtin.DropdownLink
                  options={{
                    href: "#",
                  }}
                >
                  {"Donate"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  options={{
                    href: "#",
                  }}
                >
                  {"Shop"}
                </_Builtin.DropdownLink>
              </_Builtin.DropdownList>
            </_Builtin.DropdownWrapper>
            <_Builtin.Link
              className={_utils.cx(_styles, "button")}
              button={true}
              block=""
              options={{
                href: "/ascend",
              }}
            >
              {"Ascend"}
            </_Builtin.Link>
          </_Builtin.NavbarMenu>
          <_Builtin.NavbarButton tag="div">
            <_Builtin.Icon
              widget={{
                type: "icon",
                icon: "nav-menu",
              }}
            />
          </_Builtin.NavbarButton>
        </_Builtin.NavbarContainer>
      </_Builtin.NavbarWrapper>
    </_Component>
  );
}
