import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Bar from './Bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SHA from './SHA.js';


function SplitText({ text }) {
    // eslint-disable-next-line react/prop-types
    const mid = Math.ceil(text.length / 2); // Znajdź środek tekstu
    // eslint-disable-next-line react/prop-types
    const firstHalf = text.slice(0, mid);
    // eslint-disable-next-line react/prop-types
    const secondHalf = text.slice(mid);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div>{firstHalf}</div>
            <div style={{ marginTop: "10px" }}>{secondHalf}</div>
        </div>
    );
}

async function calculateHash(algorithm, data) {
    console.log(`Calculating hash for algorithm: ${algorithm}`);
    const sha = new SHA(algorithm, data);
    try {
        const hash = await sha.compute();
        console.log('Hash result:', hash);
        return hash;
    } catch (error) {
        console.error('Error computing hash:', error);
        return "Error: " + error.message;
    }
}

function ShaSelector() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const currentAlgo = params.get('algo');

    const [selectedAlgo, setSelectedAlgo] = useState(currentAlgo || '256');
    const [dataToHash, setDataToHash] = useState('');
    const [hashResult, setHashResult] = useState(''); // State to store hash result

    useEffect(() => {
        setSelectedAlgo(currentAlgo || '256');
    }, [currentAlgo]);

    const handleChangeAlgorithm = (event) => {
        const newAlgo = event.target.value;
        setSelectedAlgo(newAlgo);
        navigate(`/sha?algo=${newAlgo}`);
    };

    const handleChangeData = (event) => {
        const newData = event.target.value;
        setDataToHash(newData);
    };

    const handleCalculate = async () => {
        const result = await calculateHash(selectedAlgo, dataToHash);
        setHashResult(result); // Set the result in state
    };

    return (
        <>
            {/* Komponent Bar */}
            <Bar />

            {/* Rest of the app */}
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center">SHA Hashing</h2>
                        <label htmlFor="algorithm-select" className="form-label mt-3">Choose an algorithm:</label>
                        <select
                            id="algorithm-select"
                            className="form-select mb-3"
                            value={selectedAlgo}
                            onChange={handleChangeAlgorithm}
                        >
                            <option value="256">SHA2-256</option>
                            <option value="384">SHA2-384</option>
                            <option value="512">SHA2-512</option>
                            <option value="3-256">SHA3-256</option>
                            <option value="3-384">SHA3-384</option>
                            <option value="3-512">SHA3-512</option>
                        </select>
                        <input
                            type="textbox"
                            id="textToHash"
                            className="form-control mt-3"
                            style={{ marginBottom: '3%' }}
                            placeholder="Write a text to hash...."
                            value={dataToHash}
                            onChange={handleChangeData}
                        />
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleCalculate}
                        >
                            Calculate Hash
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6 text-center">
                        <p className="text-bg-success">
                            Selected Algorithm: <strong>{selectedAlgo}</strong>
                        </p>
                        {hashResult && (
                            <div>
                                <h4>Hash Result:</h4>
                                <SplitText text={hashResult}></SplitText>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShaSelector;