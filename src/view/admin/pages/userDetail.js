import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { BoxInfo } from "../components/styles";
import { DashboardTemplate } from "../Dashboard";
import axios from "axios";

function UserDetailContent() {
    const { id } = useParams();
    const data = JSON.parse(sessionStorage.getItem("apiCustomer"))[id];
    const [toggleEdit, setToggleEdit] = useState(false);

    const editData = (id) => {
        axios.put(`http://localhost:1337/v1/auth/customer/${id}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`, {
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
            },
            fistname: data.firtname,
        });
    }

    if (!toggleEdit) {
        return (
            <BoxInfo>
                <p><b>UserID: </b>{data.userid}</p>
                <p><b>Name: </b>{data.firstname}</p>
                <p><b>Lastname: </b>{data.lastname}</p>
                <p><b>Email: </b>{data.email}</p>
                <p><b>City: </b>{data.cityid}</p>
                <p><b>Payment: </b>{data.payment}</p>
                <p><b>Balance: </b>{data.balance}</p>
                <EditIcon onClick={() => setToggleEdit(true)}/>
            </BoxInfo>
        );        
    } else {
        return (
            <BoxInfo>
                <form onSubmit={() => {editData(data.id)}}>
                <p><b>UserID: </b>{data.userid}</p>
                    <p><b>Name: </b><input type="text" defaultValue={data.firstname}/></p>
                    <p><b>Lastname: </b><input type="text" defaultValue={data.lastname}/></p>
                    <p><b>Email: </b><input type="text" defaultValue={data.email}/></p>
                    <p><b>City: </b><input type="text" defaultValue={data.cityid}/></p>
                    <p><b>Payment: </b><input type="text" defaultValue={data.payment}/></p>
                    <p><b>Balance: </b><input type="text" defaultValue={data.balance}/></p>
                    <button type="submit">Submit</button>
                </form>
                <EditIcon onClick={() => setToggleEdit(false)}/>
            </BoxInfo>
        );
    }
    
}

export default function UserDetail() {
    return <DashboardTemplate component={UserDetailContent}/>;
  }