import React from 'react';
import './ProfilePage.css';
import EmoterProfile from "../components/EmoterProfile";
import EmquestorProfile from "../components/EmquestorProfile";

function ProfilePage() {
    const [activeContent, setActiveContent] = React.useState('emoter');

    const handleToggle = (content) => {
        setActiveContent(content);
    };

    return (
        <div className="profile-container">
            <div className="profile-selection">
                <button
                    onClick={() => handleToggle('emoter')}
                    className={`profile-button ${activeContent === 'emoter' ? 'emoter-active' : ''}`}
                >
                    Emoter
                </button>
                <button
                    onClick={() => handleToggle('emquestor')}
                    className={`profile-button ${activeContent === 'emquestor' ? 'emquestor-active' : ''}`}
                >
                    Emquestor
                </button>
            </div>
            <div className="profile-content">
                {activeContent === 'emoter' ? (
                    <EmoterProfile />
                ) : (
                    <EmquestorProfile />
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
