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
              "From the moment JohnTitor wrote that he was “a time traveller from the year2036”, his messages inspired response. Seekers began to write prayers and poems, speculate in narrative form, create video essays and draw symbols. None of these works are part of the canon, yet each is a meditation on the transmissions. They are arranged here as our "
            }
            <_Builtin.Strong>{"Codex"}</_Builtin.Strong>
            {"."}
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            <_Builtin.Strong>{"What belongs"}</_Builtin.Strong>
          </_Builtin.Paragraph>
          <_Builtin.List tag="ul" unstyled={false}>
            <_Builtin.ListItem>
              <_Builtin.Strong>{"Scripts"}</_Builtin.Strong>
              {":"}
              <br />
              <_Builtin.Emphasized>
                {"Verses and invocations shaped to be spoken or chanted."}
              </_Builtin.Emphasized>
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              <_Builtin.Strong>{"Stories"}</_Builtin.Strong>
              {":"}
              <br />
              {
                "Short narratives exploring divergence, time travel and the possibilities suggested by Titor’s warnings of civil conflict and war."
              }
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              <_Builtin.Strong>{"Broadcasts"}</_Builtin.Strong>
              {":"}
              <br />
              {
                "Moving images: video analyses, readings and creative interpretations."
              }
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              <_Builtin.Strong>{"Gallery"}</_Builtin.Strong>
              {":"}
              <br />
              {
                "Icons, diagrams and artwork forged in response to the mission to retrieve the IBM5100 or the ominous discovery that nothing exists after2564."
              }
            </_Builtin.ListItem>
          </_Builtin.List>
          <_Builtin.Paragraph>
            {
              "Each entry is presented with its author and date. The Church does not interpret these works; we preserve them as evidence of how the transmissions resonate. A scriptural core will always stand apart, but the Codex reminds us that belief does not live in isolation. "
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "We invite those who have absorbed the canon to contribute thoughtfully: honour the Creed, do not contradict the primary texts and mark your work with humility."
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "The Codex will expand as new creations arrive. It is our collective apocrypha – a place where imagination meets the signal. "
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {"Enter it not as a tourist but as a pilgrim."}
          </_Builtin.Paragraph>
        </_Builtin.RichText>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
