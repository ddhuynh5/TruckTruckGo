import React from "react";
import { Breadcrumb } from "react-bootstrap";

function BreadCrumbs() {
  return (
    <div className="container">
      <Breadcrumb>
        <Breadcrumb.Item href="index.html">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="javascript:void(0)">User</Breadcrumb.Item>
        <Breadcrumb.Item active aria-current="page">
          BreadCrumbs
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumbs;





