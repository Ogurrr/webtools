import { useState } from 'react';
import ImageTracer from 'imagetracerjs';

function ImageConverterPNGtoSVG() {
    const [svgData, setSvgData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const convertPNGtoSVG = (file) => {
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

                    const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                    const svg = ImageTracer.imagedataToSVG(imageData); // Konwertuje obraz rastrowy na SVG z kolorami

                    resolve(svg);
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
        setIsLoading(true);
        if (file) {
            try {
                const svg = await convertPNGtoSVG(file);
                setSvgData(svg);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const downloadSVG = () => {
        const a = document.createElement('a');
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'converted-image.svg';
        a.click();
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="text-center mb-4">PNG to SVG Converter</h3>

                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">
                                    Choose a PNG file
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    accept="image/png"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {isLoading && (
                                <div className="text-center">
                                    <p>Converting...</p>
                                </div>
                            )}

                            {svgData && (
                                <div className="text-center">
                                    <h4 className="mt-4">Converted SVG:</h4>
                                    <div
                                        className="svg-container"
                                        dangerouslySetInnerHTML={{ __html: svgData }}
                                    />
                                </div>
                            )}

                            <div className="text-center mt-4">
                                {svgData && (
                                    <button className="btn btn-primary" onClick={downloadSVG}>
                                        Download SVG
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageConverterPNGtoSVG;
