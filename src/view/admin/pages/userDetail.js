import React from "react";
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { BoxInfo } from "../components/styles";
import { DashboardTemplate } from "../Dashboard";

function UserDetailContent() {
    const { id } = useParams();
    const data = JSON.parse(sessionStorage.getItem("apiCustomer"))[id];
    return (
        <>
            <BoxInfo>
                <p><b>Name: </b>{data.firstname}</p>
                <p><b>Lastname: </b>{data.lastname}</p>
                <p><b>Email: </b>{data.email}</p>
                <p><b>City: </b>{data.cityid}</p>
                <p><b>Payment: </b>{data.payment}</p>
                <p><b>Balance: </b>{data.balance}</p>
            </BoxInfo>
            <EditIcon />
        </>
    );
}

export default function UserDetail() {
    return <DashboardTemplate component={UserDetailContent}/>;
  }