import { Button } from "antd";
import React from "react";

const BaseButton = ({ 
    icon, 
    text,
    children,
    className,
    ...props
}) => {
  return (
    <Button
      className={`base-button ` + className}
      {...props}
    >
        {icon && <span>{icon}</span>}
        {text && <span>{text}</span>}
        {children}
    </Button>
  );
};

export default BaseButton;
