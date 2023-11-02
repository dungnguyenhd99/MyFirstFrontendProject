import React from "react";
import WeatherBar from "../ChildComponents/WeatherBar";
import '../../styles/css/News.css';

export default function News() {
    return (
        <div className="news-container">
            <div>
                <div className="weather-bar"><WeatherBar /></div>
            </div>
        </div>
    )
}