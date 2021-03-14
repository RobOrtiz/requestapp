import React, { useEffect, useState } from 'react';
import { Container, Row } from "../components/Grid";
import { Dropdown, FormBtn } from "../components/Form";
import Header from "../components/Header";
import API from "../utils/API";


function SelectDj() {
    const [ djList, setDjList ] = useState([]);
    
    useEffect(() => {
        getDjList();
    }, [])

    // API get request for user informatoin
    function getDjList() {
        API.getAllDjs()
        .then(res => {
            setDjList(res.data);
        })
        .catch(err => console.log(err))
    }

    function handleSubmit() {
        // Grab value of dropdown
        let djSelected = document.getElementById('dj-list').value;

        console.log(djSelected)

        let findDjId = djList.filter(dj => dj.djName === djSelected)
        let djId = findDjId[0]._id;

        window.location.replace(`/request/${djId}`)

    }

    return(
        <div className="request-page">
            <Header title="welcome customer" />
            <div className="center-container d-flex align-items-center">
                <Container>
                    <Row classes="justify-content-center">
                        <p className="request-title display-3 font-weight-bold text-center">SELECT A DJ</p>
                    </Row>
                    <Row classes="justify-content-center">
                        <Dropdown id="dj-list">
                            {djList
                                .map(dj => (
                                <option value={dj.djName} key={dj.djName}>{dj.djName}</option>
                            ))}
                        </Dropdown>
                    </Row>
                    <Row classes="justify-content-center">
                        <FormBtn className="btn btn-dark" onClick={handleSubmit}>GO TO THIS DJ'S EVENT</FormBtn>
                    </Row>
                </Container>
            </div>
      </div>
    )
}

export default SelectDj;