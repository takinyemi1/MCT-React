import React, { useEffect, useState } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import UserDataService from "../services/users.services.js";

const AddUser = ({ id, setUserID }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [school, setSchool] = useState("");
    const [classification, setClassification] = useState("");
    const [status, setStatus] = useState("Onboarded");
    const [onboardingDate, setOnboardingDate] = useState("");
    const [team, setTeam] = useState("");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" })

    // handle the date change and if the user selects a past date
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        // const today = new Date().toISOString().split("T")[0];

        // if (selectedDate < today) {
        //     alert("Please select a future date.");
        // } else {
        //     setOnboardingDate(selectedDate);
        // }
        setOnboardingDate(selectedDate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (firstName === "" || lastName === "" || school === "" || classification === "" || status === "" || onboardingDate === "" || team === "") {
            setMessage({ error: true, msg: "Please fill in all fields." });
            return;
        }

        const newUser = {
            firstName,
            lastName,
            school,
            classification,
            status,
            onboardingDate,
            team
        }

        console.log(newUser);

        try {
            if (id !== undefined && id !== "") {
                await UserDataService.updateUser(id, newUser);
                setUserID("");
                setMessage({ error: false, msg: "User information has been updated successfully!" });
            } else {
                await UserDataService.addUsers(newUser);
                setMessage({ error: false, msg: "User has been added successfully!" });
            }
        } catch (e) {
            setMessage({ error: true, msg: e.message });
            console.log("Error: ", e);
        }

        setFirstName("");
        setLastName("");
        setSchool("");
        setClassification("");
        setStatus("");
        setOnboardingDate("");
        setTeam("");
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await UserDataService.getUser(id);
            console.log("The record is: ", docSnap.data());

            setFirstName(docSnap.data().firstName);
            setLastName(docSnap.data().lastName);
            setSchool(docSnap.data().school);
            setClassification(docSnap.data().classification);
            setStatus(docSnap.data().status);
            setOnboardingDate(docSnap.data().onboardingDate);
            setTeam(docSnap.data().team);
        } catch (e) {
            setMessage({ error: true, msg: e.message });
        }
    }

    useEffect(() => {
        console.log("The ID here is: ", id)
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [id]);

    return (
        <>
            <div className="p-4 box">
                {message?.msg && (
                    <Alert
                        variant={message?.error ? "danger" : "success"}
                        dismissible
                        onClose={() => setMessage("")}
                        style=
                            {{color: message?.error ? "#bd1c19" : "#13610cff", 
                            backgroundColor: message?.error ? "#e6938e" : "#9ecc78",
                            borderRadius: "3px",
                            padding: "16px 20px",
                            position: "relative",
                        }}
                        className="custom-alert">
                        {" "}
                        {message?.msg}
                    </Alert>
                )}
                <br /><br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formAddUserFName">
                        <InputGroup>
                            <InputGroup.Text className="input-group-text" id="formAddUserFName">First Name</InputGroup.Text>
                            <Form.Control
                                className="input-field"
                                type="text"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAddUserLName">
                        <InputGroup>
                            <InputGroup.Text className="input-group-text" id="formAddUserLName">Last Name</InputGroup.Text>
                            <Form.Control
                                className="input-field"
                                type="text"
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select a School</Form.Label>
                        <Form.Select className="select-input-field" size="lg" aria-label="Not Selected" value={school} onChange={(e) => setSchool(e.target.value)}>
                            <option value="">Not Selected</option>
                            <option value="Virginia State University" onChange={(e) => setSchool(e.target.value)}>Virginia State University</option>
                            <option value="Virginia Commonwealth University" onChange={(e) => setSchool(e.target.value)}>Virginia Commonwealth University</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-3">Select your Classification</Form.Label>
                        <Form.Select className="select-input-field" size="lg" aria-label="Not Selected" value={classification} onChange={(e) => setClassification(e.target.value)}>
                            <option value="">Not Selected</option>
                            <option value="Freshman" >Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Graduate Student">Graduate Student</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select a Date</Form.Label>
                        <Form.Control
                            className="date-input-field"
                            type="date"
                            value={onboardingDate}
                            onChange={handleDateChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select a Team</Form.Label>
                        <Form.Select size="lg" className="select-input-field" value={team} onChange={(e) => setTeam(e.target.value)}>
                            <option value="">Not Selected</option>
                            <option value="Content Creation">Content Creation</option>
                            <option value="IT">IT</option>
                            <option value="Web Development">Web Development</option>
                        </Form.Select>
                    </Form.Group>
                    <br />

                    {/* button */}
                    <ButtonGroup aria-label="submit-btn" className="mb-3 onboarding-btns">
                        <Button
                            disabled={flag}
                            style={{ backgroundColor: "#61ba43" }}
                            onClick={(e) => {
                                setStatus("Onboarded");
                                setFlag(true);
                            }}
                        >
                            Onboarded
                        </Button>

                        <Button
                            disabled={!flag}
                            style={{ backgroundColor: "#dac838" }}
                            onClick={(e) => {
                                setStatus("Onboarding in Progress");
                                setFlag(false);
                            }}
                        >
                            Onboarding in Progress
                        </Button>

                        <Button
                            disabled={!flag}
                            style={{ backgroundColor: "#ad1818ff" }}
                            onClick={(e) => {
                                setStatus("Not Onboarded");
                                setFlag(false);
                            }}
                        >
                            Not Onboarded
                        </Button>
                    </ButtonGroup>
                    <br />

                    <div className="d-grid gap-2">
                        <Button type="submit" className="add-user-btn">
                            <span>Add User</span>
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddUser;