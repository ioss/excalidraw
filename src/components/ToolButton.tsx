import "./ToolIcon.scss";

import React from "react";

type ToolIconSize = "s" | "m";

type ToolButtonBaseProps = {
  icon?: React.ReactNode;
  "aria-label": string;
  "aria-keyshortcuts"?: string;
  label?: string;
  title?: string;
  name?: string;
  id?: string;
  size?: ToolIconSize;
  keyBindingLabel?: string;
};

type ToolButtonProps =
  | (ToolButtonBaseProps & { type: "button"; onClick?(): void })
  | (ToolButtonBaseProps & {
      type: "radio";

      checked: boolean;
      onChange?(): void;
    });

const DEFAULT_SIZE: ToolIconSize = "m";

export const ToolButton = React.forwardRef(function(
  props: ToolButtonProps,
  ref,
) {
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => innerRef.current);
  const sizeCn = `ToolIcon_size_${props.size || DEFAULT_SIZE}`;

  if (props.type === "button") {
    return (
      <button
        className={`ToolIcon_type_button ToolIcon ${sizeCn}`}
        title={props.title}
        aria-label={props["aria-label"]}
        type="button"
        onClick={props.onClick}
        ref={innerRef}
      >
        <div className="ToolIcon__icon" aria-hidden="true">
          {props.icon || props.label}
        </div>
      </button>
    );
  }

  return (
    <label className="ToolIcon" title={props.title}>
      <input
        className={`ToolIcon_type_radio ${sizeCn}`}
        type="radio"
        name={props.name}
        aria-label={props["aria-label"]}
        aria-keyshortcuts={props["aria-keyshortcuts"]}
        id={props.id}
        onChange={props.onChange}
        checked={props.checked}
        ref={innerRef}
      />
      <div className="ToolIcon__icon">
        {props.icon}
        {props.keyBindingLabel && (
          <span className="ToolIcon__keybinding">{props.keyBindingLabel}</span>
        )}
      </div>
    </label>
  );
});
