import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import UserDataService from "../services/users.services.js";

const UserList = ({getUserID}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const data = await UserDataService.getAllUsers();
        console.log(data.docs);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const deleteHandler = async (id) => {
        try {
            await UserDataService.deleteUser(id);
            getUsers();
        } catch (err) {
            console.error("Failed to delete:", err.message);
        }
    }

    return (
        <>
            <div className="mb-2">
                <Button className="refresh-btn" onClick={getUsers}>🔃</Button>
            </div>
            <br />
            {/* <pre>{ JSON.stringify(users, undefined, 2)}</pre> */}
            <div>
                <Table striped bordered hover responsive="md" className="text-center align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>School</th>
                            <th>Classification</th>
                            <th>Status</th>
                            <th>Onboarding Date</th>
                            <th>Team</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((doc, index) => {
                            return (
                                <tr key={doc.id}>
                                    <td>{index + 1}</td>
                                    <td>{doc.firstName}</td>
                                    <td>{doc.lastName}</td>
                                    <td>{doc.school}</td>
                                    <td>{doc.classification}</td>
                                    <td
                                        style={{ backgroundColor: 
                                            doc?.status === "Onboarded" ? "#61ba43" : 
                                            doc?.status === "Onboarding in Progress" ? "#dac838" : 
                                            doc?.status === "Not Onboarded" ? "#ad1818ff" : "",
                                            
                                            color: 
                                                doc?.status === "Onboarded" ? "white" : 
                                                doc?.status === "Onboarding in Progress" ? "#000000" : 
                                                doc?.status === "Not Onboarded" ? "white" : "" 
                                        }}
                                    >{doc.status}</td>
                                    <td>{doc.onboardingDate}</td>
                                    <td>{doc.team}</td>
                                    <td>
                                        <div className="action-btns">
                                            <Button 
                                                className="edit-btn" 
                                                onClick={(e) => getUserID(doc.id)}>
                                                Edit
                                            </Button>
                                            <Button 
                                                className="delete-btn"
                                                onClick={() => deleteHandler(doc.id)}>
                                                Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default UserList;