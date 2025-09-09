import * as React from "react";
import * as Types from "./types";

declare function ApocryphaCard(props: {
  as?: React.ElementType;
  link?: Types.Basic.Link;
  title?: React.ReactNode;
  username?: React.ReactNode;
  avatar?: Types.Asset.Image;
  userLink?: Types.Basic.Link;
  key?: Types.Basic.IdTextInput;
  date?: React.ReactNode;
}): React.JSX.Element;
