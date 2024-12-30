import Bar from './Bar.jsx'
import DuinoCoinAPI from "./duinocoinAPI.js";

async function submit() {
    let api = new DuinoCoinAPI();
    let value = document.getElementById("input").value;

    // Sprawdzamy, czy wartość to transakcja (np. 40 znaków, tylko litery i cyfry)
    if (api.getData(value) === 'user') {
        console.log("To user");
    }
    else if (api.getData(value) === 'transaction') {
        console.log("To transaction");
    }
    else {
        console.log("error")
    }
}


function DuinoCoinExplorerComponent() {
    return (
        <>
            <Bar />
            <center>
                <h1>DuinoCoin Explorer</h1>

                <input id="input" type="text" placeholder="Input username or tx hash" />
                <button id="submitButton" onClick={submit}>Search</button>

                <div id="resoult"></div>
            </center>
        </>
    );
}

export default DuinoCoinExplorerComponent;
