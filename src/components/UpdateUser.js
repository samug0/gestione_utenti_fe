import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/UpdateUser.css'
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser(props) {

    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        data_nascita: ""
    });
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDataNascita, setNewDataNascita] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/java/api/user/get/${id}`)
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
        
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
        
        
    };

    

    const handleDataNascitaChange = (e) => {
        setNewDataNascita(e.target.value);
        
    };

    const handleSubmit = e => {
        e.preventDefault();
        const updatedUser = {
            
            username: newUsername || user.username,
            email: newEmail || user.email,
            password: user.password,
            data_nascita: newDataNascita || user.data_nascita
        };
        axios.put(`http://localhost:8080/java/api/user/updateuser/${id}`, updatedUser)
            .then(response => {
                console.log(response.data);
                setUser(updatedUser);
                navigate("/")
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="username" value={newUsername || user.username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={newEmail || user.email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="text" name="password" value={user.password}  />
                </label>
                <br />
                <label>
                    Data di nascita:
                    <input type="date" name="data_nascita" value={newDataNascita || user.data_nascita} onChange={handleDataNascitaChange} />
                </label>
                <br />
              <button type="submit" className="btn btn-warning" >Aggiorna</button>
            </form>
          </div>
    )
};