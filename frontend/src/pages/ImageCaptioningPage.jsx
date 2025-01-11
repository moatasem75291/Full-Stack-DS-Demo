import { useState, useRef } from 'react';
import '../style/ImageCaptioningPage.css';

const ImageCaptioningPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage || !prompt) {
            setError('Please select an image and enter a prompt');
            return;
        }

        setLoading(true);
        setError('');
        setCaption('');

        const formData = new FormData();

        try {
            const url = new URL('http://localhost:7088/generate');
            url.searchParams.append('prompt', prompt);

            formData.append('image', selectedImage);
            
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                await new Promise(resolve => setTimeout(resolve, 600));
                
                const text = decoder.decode(value);
                setCaption(prev => prev + text);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="image-captioning-container">
            <h2>Image Captioning</h2>
            
            <form onSubmit={handleSubmit} className="captioning-form">
                <div className="image-upload-section">
                    <label className="file-input-label">
                        {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="image-preview"
                            />
                        ) : (
                            <div className="upload-placeholder">
                                Click to upload image
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input"
                        />
                    </label>
                </div>

                <div className="prompt-section">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt..."
                        className="prompt-input"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading || !selectedImage || !prompt}
                    className="submit-button"
                >
                    {loading ? 'Generating...' : 'Generate Caption'}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}
            
            {caption && (
                <div className="result-section">
                    <h3>Generated Caption:</h3>
                    <div className="caption-text">{caption}</div>
                </div>
            )}
        </div>
    );
};

export default ImageCaptioningPage;