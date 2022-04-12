import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Input from "./components/Input";
import { sjft } from "./components/sjf";
import { srf } from "./components/srf";
function App() {
  const [inputFields, setInputFields] = useState([
    { processId: "", arrivalTime: 0, burstTime: 0 },
  ]);
  const [type, setType] = useState("sjf");
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const [result, setresult] = useState({arrivalTime: 0, burstTime: 0, finishingTime: 0, tat: 0, wat: 0})

  const addFields = () => {
    let newfield = { processId: "", arrivalTime: 0, burstTime: 0 };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields);
    const burstTime = inputFields.map((data) => +data.burstTime);
    const arrivalTime = inputFields.map((data) => +data.arrivalTime);
    console.log("burstTime", burstTime);
    console.log("arrivalTime", arrivalTime);
    console.log("type", type);
    let result;
    if (type == "srf") {
      result = srf(arrivalTime, burstTime);
    } else if (type == "sjf") {
      result = sjft(arrivalTime, burstTime);
    }
    setresult({
      burstTime: result.solvedProcessesInfo[0].bt,
      arrivalTime: result.solvedProcessesInfo[0].at,
      finishingTime: result.solvedProcessesInfo[0].ft,
      tat: result.solvedProcessesInfo[0].tat,
      wat: result.solvedProcessesInfo[0].wat,
    })
    console.log("result", result);
  };

  const changeType = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="wrapper">
      <form onSubmit={submit}>
        <div className="radio-container">
          <h1 style={{ textAlign: "center" }}>Select Algorithm Type</h1>
          <label class="container">
            SJF
            <input
              type="radio"
              name="algo"
              value="sjf"
              checked={type == "sjf"}
              onChange={($event) => changeType($event)}
            />
            <span class="checkmark"></span>
          </label>
          <label class="container">
            {" "}
            SRF
            <input
              type="radio"
              name="algo"
              value="srf"
              checked={type == "srf"}
              onChange={($event) => changeType($event)}
            />
            <span class="checkmark"></span>
          </label>
          {/* SJF:<input type="radio" name="algo" value="sjf" checked={type == "sjf"} onChange={($event) => changeType($event)}/>
      SRF:<input type="radio" name="algo" value="srf" checked={type == "srf"} onChange={($event) => changeType($event)}/> */}
        </div>
        {inputFields.map((input, index) => {
          return (
            <div key={index} className="container-form">
              <Input
                index={index}
                labelName="Burst Time"
                name="burstTime"
                input={input.burstTime}
                handleFormChange={handleFormChange}
                placeholder={`${index + 1}.Enter Burst Time `}
                removeFields={removeFields}
                display="none"
                type="number"
              />
              <Input
                index={index}
                labelName="Arrivl Time"
                name="arrivalTime"
                input={input.arrivalTime}
                handleFormChange={handleFormChange}
                placeholder={`${index + 1}.Enter Arrival Time `}
                removeFields={removeFields}
                display="none"
                type="number"
              />
            </div>
          );
        })}
        <button onClick={submit}>Submit</button>
      </form>
      <table>
        <tr>
          <th style={{width: '50%'}}>Type</th>
          <th>Result</th>
        </tr>
        <tr>
          <td>Burst Time</td>
          <td>
           {result.burstTime}
          </td>
        </tr>
        <tr>
          <td>Arrival Time</td>
          <td>
           {result.arrivalTime}
          </td>
        </tr>
        <tr>
          <td>Finishing Time</td>
          <td>
           {result.finishingTime}
          </td>
        </tr>
        <tr>
          <td>Turn Around Time</td>
          <td>
           {result.tat}
          </td>
        </tr>
        <tr>
          <td>Waiting Time</td>
          <td>
           {result.wat}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
