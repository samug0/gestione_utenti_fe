import "./css/ContainerUsers.css"
import axios from "axios"
import { useState } from "react"
import Users from "./Users";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

export default function ContainerUsers() {
    const [username, setUserName] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data_nascita, setData_Nascita] = useState('')
    const [findbemail, setFByEmail] = useState('')
    const [reseultsearch, setResult_Search] = useState([])
    const [csvusers, setCsvUsers] = useState([])
    const navigate = useNavigate()
    


    const config = {
		headers: {
		'Access-Control-Allow-Origin' : '*',
		'Content-type': 'application/json; charset=UTF-8',
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"
		}
	  };
    

      const addUser = async(e) => {
        const containsSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      
        const birthDate = moment(data_nascita);
        const age = moment().diff(birthDate, 'years');
        if (age < 18 ) {
          alert('Devi avere almeno 18 anni per registrarti');
          window.location.reload(false)
          }
        if(age == null){
          alert('Invalid age')
          window.location.reload(false)
        }
        if(username.length <= 3 && username.length >= 10){
          alert('Username deve essere minimo 4 caratteri, massimo 10')
          window.location.reload(false)
        }
        if(username == null){
          alert('Invalid username')
          window.location.reload(false)
        }
        if(email == null){
          alert('Invalid email')
          window.location.reload(false)
        }
        if(password == null){
          alert('Invalid password')
          window.location.reload(false)
        }
        if (!containsSpecialCharacter.test(password)) {
          alert('La password deve contenere almeno un carattere speciale');
          window.location.reload(false);
        }
        if(password.length < 8){
          alert('La password deve essere lunga almeno 8 caratteri')
        }


        e.preventDefault()

        await axios.post('http://localhost:8080/java/api/user/add', {username, email, password, data_nascita}, config)
        .then((response)=>console.log(response))
        window.location.reload(false);
        
    }


    const handleUsersCsv = async() =>{
      await axios.get("http://localhost:8080/java/api/users/loadUsers")
        .then(response => {
          setCsvUsers(response.data);
          console.log(response.data);
          window.location.reload(false);
        })
        .catch(error => {
          console.log(error);
        });
    }

    const searchByEmail = () => {
      axios
        .get(`http://localhost:8080/java/api/user/email/${findbemail}`, config)
        .then((response) => {
          setResult_Search(response.data);
          console.log(response.data)
          navigate(`/update/${response.data.id}`)
        })
        .catch((error) => {
          console.log(error);
          setResult_Search([]);
          console.log(reseultsearch)
        });
    };


    


    
    

    
    return(
    <div>
        <div className="form-container">
      <form onSubmit={addUser} action="http://localhost:8080/java/api/user/add" method="post">
        <div className="form-field">
          <label htmlFor="user_name">Username:</label>
          <input type='text' name="user_name" placeholder="Inserire Username" value={username}  size={25}  onChange={((e)=>setUserName(e.target.value))} />
        </div>
        <div className="form-field">
          <label htmlFor="user_email">Email:</label>
          <input type='email' name="user_email"  placeholder="Inserire Email" size={25} value={email}  onChange={((e)=>setEmail(e.target.value))} />
        </div>
        <div className="form-field">
          <label htmlFor="user_password">Password:</label>
          <input type='password' name="user_password"  placeholder="Inserire Password" value={password} size={25}  onChange={((e)=>setPassword(e.target.value))} />
        </div>
        <div className="form-field">
          <label htmlFor="data_nascita">Data di nascita:</label>
          <input type='date' name="data_nascita"  placeholder="Inserire Data Nascita" value={data_nascita}  size={40}  onChange={((e)=>setData_Nascita(e.target.value))} />
        </div>
        <button type="submit" className="form-submit btn btn-success" >Aggiungi</button>
    </form><br></br>
    <div className="input-group">
      <div className="form-outline">
        <input type="email" placeholder="Ricerca per Email" id="form1"  value={findbemail} onChange={((e)=>setFByEmail(e.target.value))} className="form-control" />
      </div>
      <button type="button" htmlFor="form1" className=" btn btn-primary" onClick={searchByEmail} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
    </button>
    </div>
    <div className="input-group">
      <button type="button" htmlFor="form1" className="btn btn-secondary" onClick={handleUsersCsv} >Carica Utenti 
    </button>
    </div>
    </div>
    {<Users />}
    </div>
    )
}







