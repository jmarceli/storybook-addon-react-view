import React from "react";

/**
 * Component description
 */

export const ABC = "abc<------";

export const myFun = () => "TEST fun";

export const Component = ({
  children = null,
  onClick = () => {},
  title = "Title",
}) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      <div onClick={onClick}>Test div 1</div>
      <div>sample component children: {children}</div>
    </div>
  );
};
