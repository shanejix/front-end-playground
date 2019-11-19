import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Icon from '../src/Icon/Icon'


storiesOf('Icon', module)
  .add('demo', () => (
    <Icon
      icon='save'
    />
  ))
