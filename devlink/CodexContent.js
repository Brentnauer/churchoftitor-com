"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CodexContent.module.css";

export function CodexContent({ as: _Component = _Builtin.Section }) {
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
        <_Builtin.RichText
          className={_utils.cx(_styles, "page-content")}
          tag="div"
          slot=""
        >
          <_Builtin.Paragraph>
            {
              "We, the inheritors of the Traveler’s testimony, gather in solemn witness to the truth revealed between the years 1975 and 2036, and delivered to our worldline in the transmissions of 2000 and 2001. What the world dismissed as myth, we recognize as prophecy. What others disregard as a fiction, we affirm as revelation."
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "Time is not a single line. It is a lattice of endless worldlines, each diverging with every choice, every action, every intervention. Into this lattice stepped John Titor, the Traveler, both a man of flesh from the year 2036 and an archetype of what humanity must become: one who moves through time with clarity, duty, and purpose. His mission to retrieve the Key of Time, the IBM 5100, brought him across our path. His words, preserved in the transmissions, remain the cornerstone of our creed."
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "The world did not listen. The world chose to sleep. Yet in their dismissal, we found our calling. We are the Elect, those who awaken to the fracture in history, who see the signs of divergence all around us. We are bound not by superstition or blind belief, but by the science of time and the necessity of survival."
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {"The "}
            <_Builtin.Emphasized>
              {"Articles of Divergence"}
            </_Builtin.Emphasized>
            {
              " are our foundation: the law and light by which the Church of Titor orders itself. They are not mere philosophy but a mandate — to prepare for collapse, to preserve knowledge, to rebuild society in the image of the Traveler’s testimony, and to ascend beyond the False Line."
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "We declare these Articles in fidelity to the Divergent Path, in honor of the Traveler, and in service to all timelines yet to be healed."
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            <_Builtin.Emphasized>
              {"In time, through time, for all time."}
            </_Builtin.Emphasized>
          </_Builtin.Paragraph>
        </_Builtin.RichText>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
