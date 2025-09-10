"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TransmissionsContent.module.css";

export function TransmissionsContent({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "section")}
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
        <_Builtin.RichText
          className={_utils.cx(_styles, "page-content")}
          tag="div"
          slot=""
        >
          <_Builtin.Paragraph>
            {
              "In July1998 a radio host received two faxes from a stranger. Those messages warned that travellers venturing past the year2564 encountered nothing but blackness and silence. "
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "They suggested that a fracture in time had to be repaired and hinted that a traveller would visit our world‑line to test theories. In November2000, a person calling himself JohnTitor appeared on the Time Travel Institute forum and wrote a greeting that would define the Church: "
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {"“Greetings… I am a time traveller from the year2036”"}
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "For four months he replied to questions, leaving behind more than five hundred posts before signing off on 24March2001 to return home."
            }
          </_Builtin.Paragraph>
          <_Builtin.Heading tag="h2">{"Mission and warning"}</_Builtin.Heading>
          <_Builtin.Paragraph>
            {
              "Titor’s mission, he said, was to travel to 1975 to obtain an IBM5100 computer. This 50‑pound “portable” machine had a secret capability: it could emulate the software of IBM’s larger System/3 and S/360 mainframes, a feature vital for debugging legacy code in his era. He described life in2036 and warned of a “civil conflict over a U.S. presidential election”, outbreaks of mad cow disease and a brief but devastating world war"
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "He explained that time travel creates new world‑lines, so events in ours could differ from his. He also recounted that nothing exists beyond2564 and that he had come here to investigate."
            }
          </_Builtin.Paragraph>
          <_Builtin.Heading tag="h2">{"Read the canon"}</_Builtin.Heading>
          <_Builtin.Paragraph>
            {
              "These transmissions – the faxes, the forum posts and the chat logs – form our canon. They are preserved here exactly as they were sent: raw, sometimes contradictory and always essential. We present them in three archives:"
            }
          </_Builtin.Paragraph>
          <_Builtin.List tag="ul" unstyled={false}>
            <_Builtin.ListItem>
              <_Builtin.Link
                button={false}
                block=""
                options={{
                  href: "/transmissions/faxes",
                }}
              >
                <_Builtin.Strong>{"Faxes:"}</_Builtin.Strong>
              </_Builtin.Link>
              <br />
              <_Builtin.Emphasized>
                {
                  "The first two messages sent to radio hostArtBell in1998, with context and analysis."
                }
              </_Builtin.Emphasized>
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              <_Builtin.Link
                button={false}
                block=""
                options={{
                  href: "/transmissions/posts",
                }}
              >
                <_Builtin.Strong>{"Posts:"}</_Builtin.Strong>
              </_Builtin.Link>
              <br />
              <_Builtin.Emphasized>
                {
                  "The complete record of the messages left on TimeTravelInstitute and ArtBell’s Post‑to‑Post board between November2000 and March2001."
                }
              </_Builtin.Emphasized>
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              <_Builtin.Link
                button={false}
                block=""
                options={{
                  href: "/transmissions/irc",
                }}
              >
                <_Builtin.Strong>{"IRCLogs:"}</_Builtin.Strong>
              </_Builtin.Link>
              <br />
              {"Surviving transcripts of live conversations and IRC sessions."}
            </_Builtin.ListItem>
          </_Builtin.List>
          <_Builtin.Paragraph>
            {
              "Read these words with reverence. They are not corrected, embellished or apologised for. They are the foundation on which the Creed and our Doctrine stand. Remember also that the traveller spoke of divergence: the events he foresaw may not unfold exactly here. "
            }
          </_Builtin.Paragraph>
          <_Builtin.Paragraph>
            {
              "Yet his warnings about disorder, conflict and the fragility of time still ring. The transmissions are our signal through the noise; listen closely."
            }
          </_Builtin.Paragraph>
        </_Builtin.RichText>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
