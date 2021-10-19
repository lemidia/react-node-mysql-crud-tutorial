import { useEffect, useState } from "react";
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

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/employees");
        setEmployeeList(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getEmployees();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [error, message]);

  const addEmployeeHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/create", {
        name,
        age,
        country,
        position,
        wage,
      });
      setEmployeeList([
        ...employeeList,
        { id: data.insertId, name, age, country, position, wage },
      ]);

      setMessage(data.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setName("");
      setAge(0);
      setCountry("");
      setPosition("");
      setWage(0);
    }
  };

  const updateEmployeeWage = async (id) => {
    try {
      const { data } = await axios.put("http://localhost:3001/update", {
        wage: newWage,
        id: id,
      });

      setEmployeeList(
        employeeList.map((employee) => {
          return employee.id === id ? { ...employee, wage: newWage } : employee;
        })
      );
      setMessage(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3001/delete/${id}`);
      setEmployeeList(
        employeeList.filter((employee) => {
          return employee.id !== id;
        })
      );
      setMessage(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App row row-cols-1 row-cols-md-2 p-5 fs-5 justify-content-evenly">
      <div className="col col-md-5 mb-5 mb-md-0 px-5">
        {message && <div>{message}</div>}
        {error && <div>{error}</div>}
        <h2>Employees CRUD with MySQL Tutorial</h2>

        <form className="form" submit={addEmployeeHandler}>
          <div>
            <label className="form-label" htmlFor="">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="">
              Age
            </label>
            <input
              className="form-control"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="">
              Country
            </label>
            <input
              className="form-control"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="">
              Position
            </label>
            <input
              className="form-control"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="">
              Wage
            </label>
            <input
              className="form-control"
              type="number"
              value={wage}
              onChange={(e) => setWage(e.target.value)}
            />
          </div>
          <button
            className="btn btn-outline-primary mt-4"
            onClick={addEmployeeHandler}
          >
            Add Employee
          </button>
        </form>
      </div>

      <div className="col col-md-5">
        <h2>Employee List (Scroll)</h2>

        <ul
          className="list-group overflow-scroll border border border-secondary border-3"
          style={{ height: "30rem" }}
        >
          {employeeList.map((employee, index) => (
            <li className="list-group-item" key={index}>
              <h5>Employee Info</h5>
              <div>Name: {employee.name} </div>
              <div>Age: {employee.age}</div>
              <div>country: {employee.country}</div>
              <div>Position: {employee.position}</div>
              <div>Wage: {employee.wage}</div>
              <div className="my-4">
                <label htmlFor="" className="form-label d-block fs-4">
                  Update Wage
                </label>
                <input
                  className="d-block"
                  type="text"
                  placeholder="2000..."
                  onChange={(e) => setNewWage(e.target.value)}
                />
                <button
                  className="btn btn-warning mt-3"
                  onClick={() => updateEmployeeWage(employee.id)}
                >
                  Update
                </button>
              </div>
              <div>
                <h4>Delete Employee</h4>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
