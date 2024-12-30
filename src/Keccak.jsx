import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Bar from './Bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keccak from './Keccak.js';

async function calculateHash(algorithm, data) {
    console.log(`Calculating hash for algorithm: ${algorithm}`);
    const sha = new Keccak(algorithm, data);
    try {
        const hash = await sha.compute();
        console.log('Hash result:', hash);
        return hash;
    } catch (error) {
        console.error('Error computing hash:', error);
        return "Error: " + error.message;
    }
}

function KeccakComponent() {
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
                        <h2 className="text-center">Keccak Hashing</h2>
                        <label htmlFor="algorithm-select" className="form-label mt-3">Choose an algorithm:</label>
                        <select
                            id="algorithm-select"
                            className="form-select mb-3"
                            value={selectedAlgo}
                            onChange={handleChangeAlgorithm}
                        >
                            <option value="256">Keccak 256</option>
                            <option value="384">Keccak 384</option>
                            <option value="512">Keccak 512</option>
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
                                <p>{hashResult}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default KeccakComponent;