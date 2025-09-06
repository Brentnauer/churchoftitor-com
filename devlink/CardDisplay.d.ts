import * as React from "react";
import * as Types from "./types";

declare function CardDisplay(props: {
  as?: React.ElementType;
  slot?: Types.Devlink.Slot;
}): React.JSX.Element;
