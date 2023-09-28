import { Breadcrumb } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const BaseBreadcrumb = ({
    ...props
}) => {
  // const navigate = useNavigate();

  return (
    <div>
      {/* <span onClick={() => navigate(-1)}>
        <i className="fa-regular fa-circle-chevron-left"></i>
      </span> */}
      <Breadcrumb 
        separator={<i className="fa-solid fa-angle-right"></i>}
        {...props} 
      />
    </div>
  );
};

export default BaseBreadcrumb;
