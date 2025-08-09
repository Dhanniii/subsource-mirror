import React from 'react';
import './features.css';

const Features = () => {
    return (
        <div className="features">
            <h2>Our Features</h2>
            <div className="feature-item">
                <h3>Feature 1</h3>
                <p>Description of feature 1.</p>
            </div>
            <div className="feature-item">
                <h3>Feature 2</h3>
                <p>Description of feature 2.</p>
            </div>
            <div className="feature-item">
                <h3>Feature 3</h3>
                <p>Description of feature 3.</p>
            </div>
        </div>
    );
};

export default Features;