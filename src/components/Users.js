import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate()

  
    useEffect(() => {
      axios.get("http://localhost:8080/java/api/users")
        .then(response => {
          setUsers(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    



    const handleUpdate = (id) => {
      console.log(id)
      setSelectedUserId(id);
      navigate(`/update/${id}`)
    };
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8080/java/api/user/delete/${id}`)
        .then(response => {
          console.log(response.data);
          alert('User deleleted with id' + ":" + id)
          window.location.reload(false)
          // Optionally, you can redirect to another page or update the UI
        })
        .catch(error => {
          console.log(error);
        });
    };
    


    
    
  
    const tableRows = users.map(user => (
      <tr key={user.id}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.data_nascita}</td>
        <td>{user.data_registrazione}</td> 
        <td><button className="btn btn-warning"  onClick={()=>handleUpdate(user.id)} >Aggiorna</button></td>
        <td><button className="btn btn-danger" onClick={()=>handleDelete(user.id)}>Elimina</button></td>
      </tr>
      
      
    ));



    


    


  
    return (
      <div className="container">
        <h1>User List</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Data nascita</th>
              <th>Data registrazione</th>
            </tr>
            
            
          </thead>
          <tbody>
            {tableRows.length > 0 ? tableRows : <tr><td colSpan="3">No users available</td></tr>}
          </tbody>
        </table>
        
      </div>
    );
  }