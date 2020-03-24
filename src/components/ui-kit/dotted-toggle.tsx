import React from "react";

import './ui-kit.scss';

const DottedToggle = React.forwardRef((props: any, ref: any) => (
  <a
    href="#"
    className="dotted-toggle"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      props.onClick(e);
    }}
  >
    <span>
      &#9679;  &#9679;  &#9679;
    </span>
  </a>
));

export default DottedToggle;