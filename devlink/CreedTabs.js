"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CreedTabs.module.css";

export function CreedTabs({ as: _Component = _Builtin.TabsWrapper }) {
  return (
    <_Component current="Tab 3" easing="ease" fadeIn={300} fadeOut={100}>
      <_Builtin.TabsMenu tag="div">
        <_Builtin.TabsLink data-w-tab="Tab 1" block="inline">
          <_Builtin.Block tag="div">{"BASIC"}</_Builtin.Block>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink data-w-tab="Tab 2" block="inline">
          <_Builtin.Block tag="div">{"Shell (POSIX)"}</_Builtin.Block>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink data-w-tab="Tab 3" block="inline">
          <_Builtin.Block tag="div">{"C"}</_Builtin.Block>
        </_Builtin.TabsLink>
      </_Builtin.TabsMenu>
      <_Builtin.TabsContent tag="div">
        <_Builtin.TabsPane tag="div" data-w-tab="Tab 1">
          <_Builtin.Block tag="div">
            {"10 REM --- CHURCH OF TITOR / CREED.BAS ---"}
            <br />
            {
              '20 EXILE$="2036→1975→2000": VESSEL$="GE-C204": INTERP$="IBM-5100": VIGIL$="Nov-02"'
            }
            <br />
            {
              "30 DIVERGENCE=1.7 : REM percent; gravity-field delta vs origin (nonlinear; may reconverge)"
            }
            <br />
            {
              '40 VGL$="Variable Gravity Lock: sample gravity; backtrack if drift"'
            }
            <br />
            {
              '50 ACCURACY$="C204 accuracy ~50–60y per jump"; RATE$="~10y/hour @100% power"'
            }
            <br />
            {'60 PRINT "EXILE:";EXILE$'}
            <br />
            {'70 PRINT "VESSEL:";VESSEL$;" INTERPRETER:";INTERP$'}
            <br />
            {'80 PRINT "DIVERGENCE(%):";DIVERGENCE;" VIGIL:";VIGIL$'}
            <br />
            {'90 PRINT "VGL:";VGL$'}
            <br />
            {'95 PRINT "C204 LIMITS:";ACCURACY$;" ";RATE$'}
            <br />
            {"100 IF DIVERGENCE>0 THEN GOSUB 900"}
            <br />
            {'110 PRINT "RULE: forward travel on this line != home future"'}
            <br />
            {
              '120 PRINT "RETURN PATH: back to 1975 before arrival, then forward to 2036"'
            }
            <br />
            {'130 PRINT "STATUS: CORRECTION PENDING": END'}
            <br />
            {
              '900 PRINT "ACTION: PRESERVE CODEX (transmissions, faxes, IRC, contradictions)"'
            }
            <br />
            {"910 RETURN"}
          </_Builtin.Block>
        </_Builtin.TabsPane>
        <_Builtin.TabsPane tag="div" data-w-tab="Tab 2">
          <_Builtin.Block tag="div">
            {"10 REM --- CHURCH OF TITOR / CREED.BAS ---"}
            <br />
            {
              '20 EXILE$="2036→1975→2000": VESSEL$="GE-C204": INTERP$="IBM-5100": VIGIL$="Nov-02"'
            }
            <br />
            {
              "30 DIVERGENCE=1.7 : REM percent; gravity-field delta vs origin (nonlinear; may reconverge)"
            }
            <br />
            {
              '40 VGL$="Variable Gravity Lock: sample gravity; backtrack if drift"'
            }
            <br />
            {
              '50 ACCURACY$="C204 accuracy ~50–60y per jump"; RATE$="~10y/hour @100% power"'
            }
            <br />
            {'60 PRINT "EXILE:";EXILE$'}
            <br />
            {'70 PRINT "VESSEL:";VESSEL$;" INTERPRETER:";INTERP$'}
            <br />
            {'80 PRINT "DIVERGENCE(%):";DIVERGENCE;" VIGIL:";VIGIL$'}
            <br />
            {'90 PRINT "VGL:";VGL$'}
            <br />
            {'95 PRINT "C204 LIMITS:";ACCURACY$;" ";RATE$'}
            <br />
            {"100 IF DIVERGENCE>0 THEN GOSUB 900"}
            <br />
            {'110 PRINT "RULE: forward travel on this line != home future"'}
            <br />
            {
              '120 PRINT "RETURN PATH: back to 1975 before arrival, then forward to 2036"'
            }
            <br />
            {'130 PRINT "STATUS: CORRECTION PENDING": END'}
            <br />
            {
              '900 PRINT "ACTION: PRESERVE CODEX (transmissions, faxes, IRC, contradictions)"'
            }
            <br />
            {"910 RETURN"}
          </_Builtin.Block>
        </_Builtin.TabsPane>
        <_Builtin.TabsPane tag="div" data-w-tab="Tab 3">
          <_Builtin.Block
            className={_utils.cx(_styles, "language-basic")}
            tag="div"
          >
            {"10 REM --- CHURCH OF TITOR / CREED.BAS ---"}
            <br />
            {
              '20 EXILE$="2036→1975→2000": VESSEL$="GE-C204": INTERP$="IBM-5100": VIGIL$="Nov-02"'
            }
            <br />
            {
              "30 DIVERGENCE=1.7 : REM percent; gravity-field delta vs origin (nonlinear; may reconverge)"
            }
            <br />
            {
              '40 VGL$="Variable Gravity Lock: sample gravity; backtrack if drift"'
            }
            <br />
            {
              '50 ACCURACY$="C204 accuracy ~50–60y per jump"; RATE$="~10y/hour @100% power"'
            }
            <br />
            {'60 PRINT "EXILE:";EXILE$'}
            <br />
            {'70 PRINT "VESSEL:";VESSEL$;" INTERPRETER:";INTERP$'}
            <br />
            {'80 PRINT "DIVERGENCE(%):";DIVERGENCE;" VIGIL:";VIGIL$'}
            <br />
            {'90 PRINT "VGL:";VGL$'}
            <br />
            {'95 PRINT "C204 LIMITS:";ACCURACY$;" ";RATE$'}
            <br />
            {"100 IF DIVERGENCE>0 THEN GOSUB 900"}
            <br />
            {'110 PRINT "RULE: forward travel on this line != home future"'}
            <br />
            {
              '120 PRINT "RETURN PATH: back to 1975 before arrival, then forward to 2036"'
            }
            <br />
            {'130 PRINT "STATUS: CORRECTION PENDING": END'}
            <br />
            {
              '900 PRINT "ACTION: PRESERVE CODEX (transmissions, faxes, IRC, contradictions)"'
            }
            <br />
            {"910 RETURN"}
          </_Builtin.Block>
        </_Builtin.TabsPane>
      </_Builtin.TabsContent>
    </_Component>
  );
}
