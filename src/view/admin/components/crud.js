import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { TextField } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableRow } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';

export function VaxtrackRead({row, disease, userid}) {
    const onDel = () => {
        disease();
        userid();
    }

    return (
        <TableRow key={row.id}>
                <TableCell>{row.userid}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.secnum}</TableCell>
                <TableCell>{row.clinic}</TableCell>
                <TableCell>{row.disease}</TableCell>
                <TableCell>{row.vaxshare}</TableCell>
                <TableCell>{row.startdate}</TableCell>
                <TableCell>{row.enddate}</TableCell>
            <TableCell>
                <>
                    <Button type="submit" onClick={onDel}><DeleteIcon/></Button>
                    <Button component={Link} to={"/admin/dashboard/vaxdetails/" + row.disease + "/" + row.userid}><InfoIcon/></Button>
                </>
            </TableCell>
        </TableRow>
    );
}

export function DetailsRead({row, onEdit, onDel}) {
    const delRow = () => {
        onEdit();
        onDel();
    }
    return (
        <TableRow>
            <TableCell>{row.vaxid}</TableCell>
            <TableCell>{row.disease}</TableCell>
            <TableCell>{row.vaccine}</TableCell>
            <TableCell>{row.dose}</TableCell>
            <TableCell>{row.clinic}</TableCell>
            <TableCell>{row.startdate}</TableCell>
            <TableCell>{row.notes}</TableCell>
            <TableCell>
                <>
                    <Button onClick={onEdit}><EditIcon/></Button>
                    <Button onClick={delRow}><DeleteIcon/></Button>
                </>
            </TableCell>
        </TableRow>
    );
}

export function VaccinesRead({row, onEdit, onDel}) {
    const delRow = () => {
        onEdit();
        onDel();
    }
    return (
        <TableRow>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.disease}</TableCell>
            <TableCell>{row.company}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell>{row.shots}</TableCell>
            <TableCell>{row.periods}</TableCell>
            <TableCell>{row.boosters}</TableCell>
            <TableCell>
                <>
                    <Button onClick={onEdit}><EditIcon/></Button>
                    <Button onClick={delRow}><DeleteIcon/></Button>
                </>
            </TableCell>
        </TableRow>
    );
}

export function DosesRead({row, onEdit, onDel}) {
    const delRow = () => {
        onEdit();
        onDel();
    }
    return (
        <TableRow>
            <TableCell>{row.vaxid}</TableCell>
            <TableCell>{row.dose}</TableCell>
            <TableCell>{row.routes}</TableCell>
            <TableCell>{row.sites}</TableCell>
            <TableCell>{row.needle}</TableCell>
            <TableCell>{row.age}</TableCell>
            <TableCell>
                <>
                    <Button onClick={onEdit}><EditIcon/></Button>
                    <Button onClick={delRow}><DeleteIcon/></Button>
                </>
            </TableCell>
        </TableRow>
    );
}

export function PatientsRead({row, onEdit, onDel}) {
    const delRow = () => {
        onEdit();
        onDel();
    }
    return (
        <TableRow>
            <TableCell>{row.userid}</TableCell>
            <TableCell>{row.firstname}</TableCell>
            <TableCell>{row.lastname}</TableCell>
            <TableCell>{row.age}</TableCell>
            <TableCell>{row.ssn}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.town}</TableCell>
            <TableCell>
                <>
                    <Button onClick={onEdit}><EditIcon/></Button>
                    <Button onClick={delRow}><DeleteIcon/></Button>
                </>
            </TableCell>
        </TableRow>
    );
}

export function VaxtrackCreate({isClicked, onCancle}) {
    const [pat, setPat] = useState([]);
    const [vax, setVax] = useState([]);
    const [clinic, setClinic] = useState(null);
    const [id, setId] = useState(0);
    const [vaxid, setVaxid] = useState(0);

    useEffect(() => {
        const getPat = Axios.get("http://localhost:3001/patients");
        const getVax = Axios.get("http://localhost:3001/vaxdos");
        
        Axios.all([getPat, getVax]).then(
            Axios.spread((...allData) => {
                setPat(allData[0].data);
                setVax(allData[1].data);
            })
        )
    },[])

    if (!isClicked) return null;

    const create = () => {
        Axios.post("http://localhost:3001/createVaxtrack", {
            userid: pat[id].userid,
            lastname: pat[id].lastname,
            age: pat[id].age,
            secnum: pat[id].ssn,
            vaxid: vax[vaxid].id,
            disease: vax[vaxid].disease,
            vaccine: vax[vaxid].title,
            dose: vax[vaxid].dose,
            vaxtot: vax[vaxid].vaxtot,
            clinic: clinic,
        })
    }
        return (
            <TableRow>
                <TableCell style={{minWidth: 130}}>
                    <NativeSelect onChange={(e) => setId(e.target.value)}>
                       {(pat || []).map((row, index) => (
                           <option key={row.id} value={index}>{row.userid}</option>
                       ))}
                    </NativeSelect>
                </TableCell>
                <TableCell>{pat[id].lastname}</TableCell>
                <TableCell>{pat[id].age}</TableCell>
                <TableCell>{pat[id].ssn}</TableCell>
                <TableCell><TextField required onChange={(e) => setClinic(e.target.value)}/></TableCell>
                <TableCell>
                    <NativeSelect onChange={(e) => setVaxid(e.target.value)}>
                    {(vax || []).map((row, index) => (
                           <option key={row.id} value={index}>{row.id}</option>
                       ))}
                    </NativeSelect>
                </TableCell>
                <TableCell>+1</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <Button type="submit" onClick={create}><CheckIcon/></Button>
                    <Button onClick={onCancle}><ClearIcon/></Button>
                </TableCell>
            </TableRow>
        );
}

export function VaccinesCreate({data, isClicked, onCancle}) {
    const [disease, setDisease] = useState(null);
    const [company, setCompany] = useState(null);
    const [title, setTitle] = useState(null);
    const [amount, setAmount] = useState(null);
    const [shots, setShots] = useState(null);
    const [periods, setPeriods] = useState(null);
    const [boosters, setBoosters] = useState(null);
    if (!isClicked) return null;

    const id = "VA" + String(data[data.length - 1].vaxindex + 1).padStart(4, '0');

    
    const create = () => {
        Axios.post("http://localhost:3001/createVaccine", {
            id: id,
            disease: disease,
            company: company,
            title: title,
            amount: amount,
            shots: shots,
            periods: periods,
            boosters: boosters
        }).then(res => {
            console.log(res)
        })
    }
        return (
            <TableRow>
                <TableCell><p>{id}</p></TableCell>
                <TableCell><TextField required onChange={(e) => setDisease(e.target.value)}/></TableCell>
                <TableCell><TextField required onChange={(e) => setCompany(e.target.value)}/></TableCell>
                <TableCell><TextField required style={{minWidth: 85}} required onChange={(e) => setTitle(e.target.value)}/></TableCell>
                <TableCell><TextField required onChange={(e) => setAmount(e.target.value)}/></TableCell>
                <TableCell><TextField required type="number" defaultValue={1} onChange={(e) => setShots(e.target.value)}/></TableCell>
                <TableCell><TextField onChange={(e) => setPeriods(e.target.value)}/></TableCell>
                <TableCell><TextField onChange={(e) => setBoosters(e.target.value)}/></TableCell>
                <TableCell>
                    <Button type="submit" onClick={create}><CheckIcon/></Button>
                    <Button onClick={onCancle}><ClearIcon/></Button>
                </TableCell>
            </TableRow>
        );
}

export function DosesCreate({isClicked, onCancle}) {
    const [vax, setVax] =  useState([]);
    const [vaxid, setVaxid] = useState(0);

    useEffect(() => {
        const getVax = Axios.get("http://localhost:3001/vaccines");

        Axios.all([getVax]).then(
            Axios.spread((...allData) => {
                setVax(allData[0].data);
            })
        )
    },[])

    if (!isClicked) return null;

    const create = () => {
        Axios.post("http://localhost:3001/createDose", {
            vaxid: vax[vaxid].id,
        }).then(res => {
            console.log(res)
        })
    }
        return (
            <TableRow>
                <TableCell>
                    <NativeSelect onChange={(e) => setVaxid(e.target.value)}>
                    {(vax || []).map((row) => (
                           <option key={row.id} value={row.vaxindex - 1}>{row.id}</option>
                       ))}
                    </NativeSelect>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <Button type="submit" onClick={create}><CheckIcon/></Button>
                    <Button onClick={onCancle}><ClearIcon/></Button>
                </TableCell>
            </TableRow>
        );
}

export function PatientsCreate({data, isClicked, onCancle}) {
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [age, setAge] = useState(null);
    const [ssn, setSsn] = useState(null);
    const [phone, setPhone] = useState(null);
    const [town, setTown] = useState(null);

    if (!isClicked) return null;

    const id = "PA" + String(data[data.length - 1].id + 1).padStart(6, '0');
    
    const create = () => {
        Axios.post("http://localhost:3001/createPatient", {
            id: id,
            firstname: firstname,
            lastname: lastname,
            age: age,
            ssn: ssn,
            phone: phone,
            town: town
        }).then(res => {
            console.log(res)
        })
    }
        return (
            <TableRow>
                <TableCell><p>{id}</p></TableCell>
                <TableCell><TextField required onChange={(e) => setFirstname(e.target.value)}/></TableCell>
                <TableCell><TextField required onChange={(e) => setLastname(e.target.value)}/></TableCell>
                <TableCell><TextField required onChange={(e) => setAge(e.target.value)}/></TableCell>
                <TableCell><TextField required onChange={(e) => setSsn(e.target.value)}/></TableCell>
                <TableCell><TextField required onChange={(e) => setPhone(e.target.value)}/></TableCell>
                <TableCell><TextField required onChange={(e) => setTown(e.target.value)}/></TableCell>
                <TableCell>
                    <Button type="submit" onClick={create}><CheckIcon/></Button>
                    <Button onClick={onCancle}><ClearIcon/></Button>
                </TableCell>
            </TableRow>
        );
}

export function DetailsUpdate({row, onCancle}) {
    const [notes, setNotes] = useState(row.notes);

    const update = () => {
        Axios.post("http://localhost:3001/updateDetails", {
            id: row.id,
            notes: notes
        })
    }

    return (
        <TableRow>
            <TableCell>{row.vaxid}</TableCell>
            <TableCell>{row.disease}</TableCell>
            <TableCell>{row.vaccine}</TableCell>
            <TableCell>{row.dose}</TableCell>
            <TableCell>{row.clinic}</TableCell>
            <TableCell>{row.startdate}</TableCell>
            <TableCell><textarea defaultValue={notes} onChange={(e) => setNotes(e.target.value)}/></TableCell>
            <TableCell>
                <Button type="submit" onClick={update}><CheckIcon/></Button>
                <Button onClick={onCancle}><ClearIcon/></Button>
            </TableCell>
        </TableRow>
    )
}

export function VaccinesUpdate({row, onCancle}) {
    const [disease, setDisease] = useState(row.disease);
    const [company, setCompany] = useState(row.company);
    const [title, setTitle] = useState(row.title);
    const [amount, setAmount] = useState(row.amount);
    const [shots, setShots] = useState(row.shots);
    const [periods, setPeriods] = useState(row.periods);
    const [boosters, setBoosters] = useState(row.boosters);
 
    const update = () => {
        Axios.post("http://localhost:3001/updateVaccine", {
            id: row.id,
            disease: disease,
            company: company,
            title: title,
            amount: amount,
            shots: shots,
            periods: periods,
            boosters: boosters
        }).then(res => {
            console.log(res)
        })
    }

    return (
        <TableRow>
             <TableCell><p>{row.id}</p></TableCell>
                <TableCell><TextField required defaultValue={row.disease} onChange={(e) => setDisease(e.target.value)}/></TableCell>
                <TableCell><TextField required defaultValue={row.company} onChange={(e) => setCompany(e.target.value)}/></TableCell>
                <TableCell><TextField required defaultValue={row.disease} onChange={(e) => setTitle(e.target.value)} style={{minWidth: 85}}/></TableCell>
                <TableCell><TextField defaultValue={row.amount} onChange={(e) => setAmount(e.target.value)}/></TableCell>
                <TableCell><TextField required defaultValue={row.shots} onChange={(e) => setShots(e.target.value)}/></TableCell>
                <TableCell><TextField defaultValue={row.periods} onChange={(e) => setPeriods(e.target.value)}/></TableCell>
                <TableCell><TextField defaultValue={row.boosters} onChange={(e) => setBoosters(e.target.value)}/></TableCell>
            <TableCell>
                <Button type="submit" onClick={update}><CheckIcon/></Button>
                <Button onClick={onCancle}><ClearIcon/></Button>
            </TableCell>
        </TableRow>
    )
}

export function DosesUpdate({row, onCancle}) {
    const [dose, setDose] = useState(row.dose);
    const [routes, setRoutes] = useState(row.routes);
    const [sites, setSites] = useState(row.sites);
    const [needle, setNeedle] = useState(row.needle);
    const [age, setAge] = useState(row.age);

    const update = () => {
        Axios.post("http://localhost:3001/updateDose", {
            id: row.id,
            dose: dose,
            routes: routes,
            sites: sites,
            needle: needle,
            age: age
        }).then(res => {
            console.log(res)
        })
    }
        return (
            <TableRow>
                <TableCell>{row.vaxid}</TableCell>
                <TableCell><TextField required defaultValue={dose} onChange={(e) => setDose(e.target.value)}/></TableCell>
                <TableCell><TextField required defaultValue={routes} onChange={(e) =>setRoutes(e.target.value)}/></TableCell>
                <TableCell><TextField required defaultValue={sites} onChange={(e) => setSites(e.target.value)}/></TableCell>
                <TableCell><TextField required defaultValue={needle} onChange={(e) => setNeedle(e.target.value)}/></TableCell>
                <TableCell><TextField type="number" required defaultValue={age} onChange={(e) => setAge(e.target.value)}/></TableCell>

                <TableCell>
                    <Button type="submit" onClick={update}><CheckIcon/></Button>
                    <Button onClick={onCancle}><ClearIcon/></Button>
                </TableCell>
            </TableRow>
        );
}
export function PatientsUpdate({row, onCancle}) {
    const [firstname, setFirstname] = useState(row.firstname);
    const [lastname, setLastname] = useState(row.lastname);
    const [age, setAge] = useState(row.age);
    const [ssn, setSSN] = useState(row.ssn);
    const [phone, setPhone] = useState(row.phone);
    const [town, setTown] = useState(row.town);

    const update = () => {
        Axios.post("http://localhost:3001/updatePatient", {
            userid: row.userid,
            firstname: firstname,
            lastname: lastname,
            age: age,
            ssn: ssn,
            phone: phone,
            town: town
        }).then(res => {
            console.log(res)
        })
    }

    return (
        <TableRow>
            <TableCell>{row.userid}</TableCell>
            <TableCell><TextField defaultValue={firstname} onChange={(e) => setFirstname(e.target.value)}/></TableCell>
            <TableCell><TextField defaultValue={lastname} onChange={(e) => setLastname(e.target.value)}/></TableCell>
            <TableCell><TextField defaultValue={age} onChange={(e) => setAge(e.target.value)}/></TableCell>
            <TableCell><TextField defaultValue={ssn} onChange={(e) => setSSN(e.target.value)}/></TableCell>
            <TableCell><TextField defaultValue={phone} onChange={(e) => setPhone(e.target.value)}/></TableCell>
            <TableCell><TextField defaultValue={town} onChange={(e) => setTown(e.target.value)}/></TableCell>
            <TableCell>
                <Button type="submit" onClick={update}><CheckIcon/></Button>
                <Button onClick={onCancle}><ClearIcon/></Button>
            </TableCell>
        </TableRow>
    )
}

export function VaxtrackDelete({row, disease, userid}) {
    const onCancle = () => {
        disease();
        userid();
    }

    const remove = () => {
        Axios.post("http://localhost:3001/deleteVaxtrack", {
            disease: row.disease,
            userid: row.userid
        }).then(res => {
            console.log(res)
        })
    }

    return (
       <TableRow>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell><p style={{fontSize: 20}}>Are you sure?</p></TableCell>
           <TableCell>
                <Button type="submit" onClick={remove}><CheckIcon/></Button>
                <Button onClick={onCancle}><ClearIcon/></Button>
            </TableCell>
       </TableRow>
    )
}

export function DetailsDelete({id, onEdit, onDel}) {
    const onCancle = () => {
        onEdit();
        onDel();
    }
    const remove = () => {
        Axios.post("http://localhost:3001/delete", {
            table: "VaxTrack",
            id: id
        }).then(res => {
            console.log(res)
        })
    }

    return (
       <TableRow>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell><p style={{fontSize: 20}}>Are you sure?</p></TableCell>
           <TableCell>
                <Button type="submit" onClick={remove}><CheckIcon/></Button>
                <Button onClick={onCancle}><ClearIcon/></Button>
            </TableCell>
       </TableRow>
    )
}

export function VaccinesDelete({id, onEdit, onDel}) {
    const delRow = () => {
        onEdit();
        onDel();
    }

    const remove = () => {
        Axios.post("http://localhost:3001/delete", {
            table: "Vaccine",
            id: id
        }).then(res => {
            console.log(res)
        })
    }

    return (
       <TableRow>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell><p style={{fontSize: 20}}>Are you sure?</p></TableCell>
           <TableCell>
                <Button type="submit" onClick={remove}><CheckIcon/></Button>
                <Button onClick={delRow}><ClearIcon/></Button>
            </TableCell>
       </TableRow>
    )
}

export function DosesDelete({id, onEdit, onDel}) {
    const delRow = () => {
        onEdit();
        onDel();
    }

    const remove = () => {
        Axios.post("http://localhost:3001/delete", {
            table: "Dosage",
            id: id,
        }).then(res => {
            console.log(res)
        })
    }

    return (
       <TableRow>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell><p style={{fontSize: 20}}>Are you sure?</p></TableCell>
           <TableCell>
                <Button type="submit" onClick={remove}><CheckIcon/></Button>
                <Button onClick={delRow}><ClearIcon/></Button>
            </TableCell>
       </TableRow>
    )
}

export function PatientsDelete({id, onEdit, onDel}) {
    const delRow = () => {
        onEdit();
        onDel();
    }

    const remove = () => {
        Axios.post("http://localhost:3001/deletePatient", {
            userid: id,
        }).then(res => {
            console.log(res)
        })
    }

    return (
       <TableRow>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell></TableCell>
           <TableCell><p style={{fontSize: 20}}>Are you sure?</p></TableCell>
           <TableCell>
                <Button type="submit" onClick={remove}><CheckIcon/></Button>
                <Button onClick={delRow}><ClearIcon/></Button>
            </TableCell>
       </TableRow>
    )
}