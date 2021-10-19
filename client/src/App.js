import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/create", {
        name,
        age,
        country,
        position,
        wage,
      });
      employeeList([...employeeList, { name, age, country, position, wage }]);
    } catch (error) {
      setError(error && error);
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/employees");
      setEmployeeList(data);
    } catch (error) {
      setError(error && error);
    }
  };

  return (
    <div className="App">
      user input
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
      <label htmlFor="">name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <label htmlFor="">age</label>
      <input type="number" onChange={(e) => setAge(e.target.value)} />
      <label htmlFor="">country</label>
      <input type="text" onChange={(e) => setCountry(e.target.value)} />
      <label htmlFor="">position</label>
      <input type="text" onChange={(e) => setPosition(e.target.value)} />
      <label htmlFor="">wage</label>
      <input type="number" onChange={(e) => setWage(e.target.value)} />
      <button onClick={addEmployee}>add Employee</button>
      -------------------------------------------------------------
      <div>
        <button onClick={getEmployees}>show all employees</button>
        <ul>
          {employeeList.map((employee, index) => (
            <li key={index}>
              <div>name: {employee.name} </div>
              <div> age: {employee.age}</div>
              <div>country: {employee.country}</div>
              <div>position: {employee.position}</div>
              <div>wage: {employee.wage}</div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
