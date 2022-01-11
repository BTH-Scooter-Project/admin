import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { BoxInfo } from "../components/styles";
import { DashboardTemplate } from "../Dashboard";
import axios from "axios";

export function UserDetailContent({test = false, testid = -1}) {
    const history = useHistory();
    let { id } = useParams();
    const data = JSON.parse(sessionStorage.getItem("apiCustomer"))[id];
    const [toggleEdit, setToggleEdit] = useState(false);
    const [firstname, setFirstname] = useState(data.firstname);
    const [lastname, setLastname] = useState(data.lastname);
    const [cityid, setCityid] = useState(data.cityid);
    const [payment, setPayment] = useState(data.payment);
    const [balance, setBalance] = useState(data.balance);

    const editData = (userid) => {
        axios.put(`http://localhost:1337/v1/auth/customer/${userid}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`, {
            firstname: firstname,
            lastname: lastname,
            cityid: cityid,
            payment: payment,
            balance: balance,
            }, {
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
            }
        });
        history.push("/dashboard/user");
    }

    if (!toggleEdit) {
        return (
            <BoxInfo>
                <p><b>UserID: </b>{data.userid}</p>
                <p><b>Name: </b>{firstname}</p>
                <p><b>Lastname: </b>{lastname}</p>
                <p><b>Email: </b>{data.email}</p>
                <p><b>City: </b>{data.cityid}</p>
                <p><b>Payment: </b>{cityid}</p>
                <p><b>Balance: </b>{balance}</p>
                <EditIcon onClick={() => setToggleEdit(true)}/>
            </BoxInfo>
        );        
    } else {
        return (
            <BoxInfo>
                <form onSubmit={() => editData(data.userid)}>
                    <p><b>UserID: </b>{data.userid}</p>
                    <p><b>Name: </b><input type="text" defaultValue={firstname} onChange={(e) => setFirstname(e.target.value)}/></p>
                    <p><b>Lastname: </b><input type="text" defaultValue={lastname} onChange={(e) => setLastname(e.target.value)}/></p>
                    <p><b>Email: </b>{data.email}</p>
                    <p><b>City: </b><input type="text" defaultValue={cityid} onChange={(e) => setCityid(e.target.value)}/></p>
                    <p><b>Payment: </b><input type="text" defaultValue={payment} onChange={(e) => setPayment(e.target.value)}/></p>
                    <p><b>Balance: </b><input type="text" defaultValue={balance} onChange={(e) => setBalance(e.target.value)}/></p>
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