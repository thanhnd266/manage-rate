import { Button } from "antd";
import React from "react";

const BaseButton = ({ 
    icon, 
    text,
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
    </Button>
  );
};

export default BaseButton;
