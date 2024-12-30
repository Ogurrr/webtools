import  { useState } from 'react';
import Bar from './Bar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageConverterComponentPNGJPG() {
    const [pngURL, setPngURL] = useState(null);
    const [jpgURL, setJpgURL] = useState(null);
    const [error, setError] = useState(null);
    const [isJpgToPng, setIsJpgToPng] = useState(true); // Conversion mode (JPG -> PNG)

    const convertJPGtoPNG = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error("Failed to convert image to PNG"));
                        }
                    }, "image/png");
                };
                img.onerror = () => reject(new Error("Failed to load image"));
                img.src = event.target.result;
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
        });
    };

    const convertPNGtoJPG = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error("Failed to convert image to JPG"));
                        }
                    }, "image/jpeg");
                };
                img.onerror = () => reject(new Error("Failed to load image"));
                img.src = event.target.result;
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setError(null);
        if (file) {
            try {
                let blob;
                if (isJpgToPng) {
                    blob = await convertJPGtoPNG(file);
                    const pngURL = URL.createObjectURL(blob);
                    setPngURL(pngURL);
                    setJpgURL(null); // Clear JPG URL
                } else {
                    blob = await convertPNGtoJPG(file);
                    const jpgURL = URL.createObjectURL(blob);
                    setJpgURL(jpgURL);
                    setPngURL(null); // Clear PNG URL
                }
            } catch (error) {
                setError(error.message);
                console.error("Error:", error);
            }
        }
    };

    const toggleConversionMode = () => {
        setIsJpgToPng(!isJpgToPng);
        setPngURL(null);
        setJpgURL(null);
    };

    const downloadImage = () => {
        const a = document.createElement('a');
        if (isJpgToPng && pngURL) {
            a.href = pngURL;
            a.download = 'converted-image.png';
        } else if (!isJpgToPng && jpgURL) {
            a.href = jpgURL;
            a.download = 'converted-image.jpg';
        }
        a.click();
    };

    return (
        <>
            <Bar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h3 className="text-center mb-4">
                                    {isJpgToPng ? 'JPG to PNG Converter' : 'PNG to JPG Converter'}
                                </h3>

                                {/* Mode toggle button */}
                                <div className="text-center mb-4">
                                    <button className="btn btn-secondary" onClick={toggleConversionMode}>
                                        Change Mode
                                    </button>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">
                                        Choose a {isJpgToPng ? 'JPG' : 'PNG'} file
                                    </label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFile"
                                        accept={isJpgToPng ? 'image/jpeg' : 'image/png'}
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                {pngURL && (
                                    <div className="text-center">
                                        <h4 className="mt-4">Converted image (PNG):</h4>
                                        <img src={pngURL} alt="Converted PNG" className="img-fluid rounded" />
                                    </div>
                                )}

                                {jpgURL && (
                                    <div className="text-center">
                                        <h4 className="mt-4">Converted image (JPG):</h4>
                                        <img src={jpgURL} alt="Converted JPG" className="img-fluid rounded" />
                                    </div>
                                )}

                                <div className="text-center mt-4">
                                    {(pngURL || jpgURL) && (
                                        <button className="btn btn-primary" onClick={downloadImage}>
                                            Download {isJpgToPng ? 'PNG' : 'JPG'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImageConverterComponentPNGJPG;
