"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ApocryphaCard({
  as: _Component = _Builtin.Link,

  link = {
    href: "#",
  },

  title = "Heading",
}) {
  return (
    <_Component button={false} block="inline" options={link}>
      <_Builtin.Heading tag="h2">{title}</_Builtin.Heading>
      <_Builtin.Paragraph>
        {
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
        }
      </_Builtin.Paragraph>
    </_Component>
  );
}
