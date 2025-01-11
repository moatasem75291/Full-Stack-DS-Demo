import { useState } from 'react';
import '../style/IrisPage.css';

const IrisPage = () => {
    const [formData, setFormData] = useState({
        sepalLength: '',
        sepalWidth: '',
        petalLength: '',
        petalWidth: ''
    });
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult('');
    
        const features = [
            parseFloat(formData.sepalLength),
            parseFloat(formData.sepalWidth),
            parseFloat(formData.petalLength),
            parseFloat(formData.petalWidth)
        ];
        
        try {
            const response = await fetch('http://localhost:7099/predict', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ features })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setResult(data.flower_name);
        } catch (err) {
            console.error('Error:', err);
            setError(`Failed to get prediction: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="iris-container">
            <h2>Iris Classification</h2>
            <form onSubmit={handleSubmit} className="iris-form">
                <div className="form-group">
                    <label>Sepal Length:</label>
                    <input
                        type="number"
                        step="0.1"
                        name="sepalLength"
                        value={formData.sepalLength}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Sepal Width:</label>
                    <input
                        type="number"
                        step="0.1"
                        name="sepalWidth"
                        value={formData.sepalWidth}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Petal Length:</label>
                    <input
                        type="number"
                        step="0.1"
                        name="petalLength"
                        value={formData.petalLength}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Petal Width:</label>
                    <input
                        type="number"
                        step="0.1"
                        name="petalWidth"
                        value={formData.petalWidth}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Predicting...' : 'Predict'}
                </button>
            </form>

            {error && <div className="error">{error}</div>}
            {result && (
                <div className="result">
                    <h3>Prediction Result:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
};

export default IrisPage;