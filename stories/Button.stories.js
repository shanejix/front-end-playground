import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from '../src/Button/Button'
import {ButtonTypes} from '../src/Button/buttonTypes'


storiesOf('Button', module)
  .add('primary', () => (
    <Button
      type = {ButtonTypes.PRIMARY}
      label = 'Primary'
      onClick={action('clicked')}
    />
  ))
  .add('secondary', () => (
    <Button
      type={ButtonTypes.SECONDARY}
      label = 'Secondary'
      onClick={action('clicked')}
    />
  ))
  .add('tertiary', () => (
    <Button
      type ={ButtonTypes.TERTIARY}
      label='Tertiary'
      onClick={action('clicked')}
    />
  ))