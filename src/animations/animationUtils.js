import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

import testUtils from "../testUtils/utils";

export function fade(component) {
  if (testUtils.isRunningTests()) {
    return component;
  }
  return (
    <CSSTransitionGroup
      transitionName="fade"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      {component}
    </CSSTransitionGroup>
  );
}
