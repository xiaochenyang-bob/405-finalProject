import React from 'react';
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
import './InfoBar.css';

const InfoBar = ({history,room})=>{
    
    const quit = ()=>{
        window.location.href = "/home";
    }

    return (
        <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="icon"/>
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <img src={closeIcon} alt = "close" onClick={(event)=>quit()}/>
        </div>
        </div>
    );
};

export default InfoBar;