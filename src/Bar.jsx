import './Bar.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function Bar() {
    const [showHash, setShowHash] = useState(false);
    const [showSHAFamily, setSHAFamily] = useState(false);
    const [showKeccak, setKeccak] = useState(false);
    const [showMD, setMD] = useState(false);
    const [showTimers, setTimers] = useState(false);
    const [showGraphicals, setGraphicals] = useState(false);

    const toggleCryptographic = () => {
        setShowHash((prev) => !prev);
    };
    const toggleSHA = () => {
        setSHAFamily((prev) => !prev);
    };
    const toggleKeccak = () => {
        setKeccak((prev) => !prev);
    };
    const toggleMD = () => {
        setMD((prev) => !prev);
    };
    const toggleTimers = () => {
        setTimers((prev) => !prev);
    };
    const toggleGraphical = () => {
        setGraphicals((prev) => !prev);
    };
    return (
        <div className="bar">
            <h3>Web tools</h3>
            <br/>
            <h4
                style={{fontWeight: "bold", cursor: "pointer"}}
                onClick={toggleCryptographic}
            >
                Hash functions
            </h4>
            {showHash && (
                <>
                    <h5
                        style={{fontWeight: "bold", cursor: "pointer"}}
                        onClick={toggleMD}
                    >
                        MD Family
                    </h5>
                    {showMD && (
                        <>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                                      to="/md?algo=MD5">MD5</Link></h5>
                        </>
                    )}
                    <h5
                        style={{fontWeight: "bold", cursor: "pointer"}}
                        onClick={toggleSHA}
                    >
                        SHA family
                    </h5>
                    {showSHAFamily && (
                        <>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                                      to="/sha?algo=256">SHA2-256</Link></h5>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                                      to="/sha?algo=384">SHA2-384</Link></h5>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                                      to="/sha?algo=512">SHA2-512</Link></h5>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                                      to="/sha?algo=3-256">SHA3-256</Link>
                            </h5>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                                      to="/sha?algo=3-384">SHA3-384</Link>
                            </h5>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                                      to="/sha?algo=3-512">SHA3-512</Link>
                            </h5>
                        </>
                    )}
                    <h5
                        style={{fontWeight: "bold", cursor: "pointer"}}
                        onClick={toggleKeccak}
                    >
                        Keccak
                    </h5>
                    {showKeccak && (
                        <>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}} to="/keccak?algo=256">Keccak
                                256</Link></h5>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}} to="/keccak?algo=384">Keccak
                                384</Link></h5>
                            <h5><Link style={{textDecoration: 'none', color: 'inherit'}} to="/keccak?algo=512">keccak
                                512</Link></h5>
                        </>
                    )}
                </>
            )}
            <br/>
            <h4
                style={{fontWeight: "bold"}}
                onClick={toggleTimers}
            >
                Timers
            </h4>
            {showTimers && (
                <>
                    <h5><Link style={{textDecoration: 'none', color: 'inherit'}} to="/timeWatch">Time Watch</Link></h5>
                    <h5><Link style={{textDecoration: 'none', color: 'inherit'}} to="/stopWatch">Stop Watch</Link></h5>
                </>
            )}
            <br/>
            <h4
                style={{fontWeight: "bold"}}
                onClick={toggleGraphical}
            >
                Graphical Tools
            </h4>
            {showGraphicals && (
                <>
                    <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                              to="/imageConverterPNGJPG">PNG-JPG Converter</Link>
                    </h5>
                    <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                              to="/imageConverterPNGSVG">PNG-SVG Converter</Link>
                    </h5>
                    <h5><Link style={{textDecoration: 'none', color: 'inherit'}}
                              to="/imageConverterJPEGSVG">JPG-SVG Converter</Link>
                    </h5>
                </>
            )}

        </div>
    );
}

export default Bar;
