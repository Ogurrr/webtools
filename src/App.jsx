import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimeWatchComponent from './TimeWatch.jsx';
import StopWatchComponent from './StopWatch.jsx';
import SHAComponent from './SHA.jsx';
import KeccakComponent from './Keccak.jsx';
import MDComponent from './MD.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from "./Bar.jsx";
import ImageConverterComponentPNGJPG from "./imageConverer_PNG-JPG.jsx";
import ImageConverter_PNGSVG from "./imageConverter_PNG-SVG.jsx";
import ImageConverterJPEGtoSVG from "./ImageConverter_JPG-SVG.jsx";
import DuinoCoinExplorerComponent from "./duinocoin_explorer.jsx";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/timeWatch" element={<TimeWatchComponent />} />
                <Route path="/stopWatch" element={<StopWatchComponent />} />
                <Route path="/sha" element={<SHAComponent />} />
                <Route path="/keccak" element={<KeccakComponent />} />
                <Route path="/md" element={<MDComponent />} />
                <Route path="/imageConverterPNGJPG" element={<ImageConverterComponentPNGJPG />} />
                <Route path="/imageConverterPNGSVG" element={<ImageConverter_PNGSVG />} />
                <Route path="/imageConverterJPEGSVG" element={<ImageConverterJPEGtoSVG />} />
                <Route path="/duinoExplorer" element={<DuinoCoinExplorerComponent />} />

            </Routes>
            <Bar></Bar>
        </Router>
);
}

export default App;
