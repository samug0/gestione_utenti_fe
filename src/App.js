import ContainerUsers from "./components/ContainerUsers";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import { useParams } from "react-router-dom";
import UpdateUser from "./components/UpdateUser";

function App() {
  
  const params = useParams();

  console.log(params);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContainerUsers/>}/>
        <Route path="/update/:id" element={<UpdateUser  />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
