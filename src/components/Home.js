import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Resume1Image from './Resume1.jpg';
import Resume2Image from './Resume2.jpg';
import './Home.css';

const Home = () => {
    const [zoomedPicture, setZoomedPicture] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });
    const tooltipRef = useRef(null);

    const handlePictureClick = (picture) => {
        setZoomedPicture(picture);
    };

    const closeZoomedPicture = () => {
        setZoomedPicture(null);
    };

    const handleMouseEnter = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: rect.left + rect.width / 2,
            y: rect.bottom + window.scrollY
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    return (
        <div className="hero-section">
        <h1 className="brand-name"><i className="fas fa-fire"></i> Resume Builder</h1>
    
            
            <div className="pictures">
                {[Resume1Image, Resume2Image].map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Resume ${index + 1}`}
                        onClick={() => handlePictureClick(img)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}
                {tooltip.visible && (
                    <div
                        className="tooltip"
                        ref={tooltipRef}
                        style={{
                            position: 'absolute',
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: 'translateX(-50%)'
                        }}
                    >
                        Click to zoom in
                    </div>
                )}
            </div>

            <div className="buttons">
                <Link to="/resume/1">
                    <button className="primary-btn">First Resume</button>
                </Link>
                <Link to="/resume/2">
                    <button className="primary-btn">Second Resume</button>
                </Link>
                <Link to="/ats-checker">
                    <button className="primary-btn">Go to ATS Checker</button>
                </Link>
            </div>

            {zoomedPicture && (
                <div className="zoomed-picture" onClick={closeZoomedPicture}>
                    <span className="close-btn" onClick={closeZoomedPicture}>&times;</span>
                    <img src={zoomedPicture} alt="Zoomed Resume" />
                </div>
            )}
        </div>
    );
};

export default Home;
