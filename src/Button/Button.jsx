import React from "react";
import PropTypes, { object } from "prop-types";

import { ButtonTypes, ButtonSizes, ButtonThemes } from "./buttonTypes";
import Icon from "../Icon/Icon";
import IconTypes from "../Icon/iconTypes";

export default function Button(props) {
  const { onClickHander, disabled, icon, label } = props;
  return (
    <button
      className={getButtonClass()}
      onClick={e => onClickHander(e.target)}
      disabled={disabled}
    >
      {icon && <Icon icon={icon} />}
      {label}
    </button>
  );
}
Button.propsTypes = {
  type: PropTypes.oneOf(Object.values(ButtonTypes)),
  disabled: PropTypes.bool,
  onClickHander: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.values(ButtonSizes)),
  theme: PropTypes.oneOf(Object.values(ButtonThemes)),
  icon: PropTypes.oneOf(Object.values(IconTypes))
};

Button.defautProps = {
  type: ButtonTypes.PRIMARY,
  onClickHander: () => console.log("no click hander specified"),
  disabled: false,
  size: ButtonSizes.MEDIUM,
  theme: ButtonThemes.LIGHT,
  icon: IconTypes.NONE
};

function getButtonClass() {}
