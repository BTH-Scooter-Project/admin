import React from "react";
import { useParams } from "react-router-dom";

import { DashboardTemplate } from "../Dashboard";

function UserDetailContent() {
    const { id } = useParams();
    const data = JSON.parse(sessionStorage.getItem("apiCustomer"))[id];
    return (
        <>
            <p>Name: {data.firstname}</p>
            <p>Lastname: {data.lastname}</p>
            <p>Email: {data.email}</p>
            <p>City: {data.cityid}</p>
            <p>Payment: {data.payment}</p>
            <p>Balance: {data.balance}</p>
        </>
    );
}

export default function UserDetail() {
    return <DashboardTemplate component={UserDetailContent}/>;
  }