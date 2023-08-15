import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import '../../styles/css/WeatherBar.css';
import CloudIcon from "./WeatherIcon/CloudIcon";
import CloudyIcon from "./WeatherIcon/CloudyIcon";
import SunIcon from "./WeatherIcon/SunIcon";
import RainyIcon from "./WeatherIcon/RainyIcon";
import CloudWithRainAndLightning from "./WeatherIcon/CloudWithRainAndLightning";
import ClearNight from "./WeatherIcon/ClearNight";

function WeatherBar() {
    const [neighbourhood, setNeighbourhood] = useState('');
    const [weather, setWeather] = useState({ summary: null, temperature: null })
    const [time, setTime] = useState(null);
    const [isLocationAllow, setIsLocationAllow] = useState(false);

    useEffect(() => {
        const currentDateTime = new Date();
        const formattedDateTime = format(currentDateTime, "hh:mm a, d/M");
        let latitude = 1;
        let longitude = 1
        setTime(formattedDateTime);

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    setIsLocationAllow(true);
                },
            );
        }

        const nominatimApiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        axios.get(nominatimApiUrl)
            .then(async (response) => {
                const data = response.data;
                const newNeighbourhood = await data.address.neighbourhood;
                setNeighbourhood(newNeighbourhood);

                const getPlaceUrl = `https://www.meteosource.com/api/v1/free/find_places?text=${newNeighbourhood}&language=en&key=u27ol0z4ex75k3b2jmkv1e16qjom381g61n3jpc2`;
                axios.get(getPlaceUrl).then(async (res) => {
                    const place_id = await res.data[0].place_id;

                    const getWeatherUrl = `https://www.meteosource.com/api/v1/free/point?place_id=${place_id}&sections=current&timezone=auto&language=en&units=auto&key=u27ol0z4ex75k3b2jmkv1e16qjom381g61n3jpc2`
                    axios.get(getWeatherUrl).then((res) => {
                        setWeather({ summary: res.data.current.summary, temperature: res.data.current.temperature });
                    })
                }).catch((err) => {
                    console.error(err);
                })
            })
            .catch(error => {
                const newNeighbourhood = 'Phường Trung Hòa';
                setNeighbourhood(newNeighbourhood);

                const getPlaceUrl = `https://www.meteosource.com/api/v1/free/find_places?text=${newNeighbourhood}&language=en&key=u27ol0z4ex75k3b2jmkv1e16qjom381g61n3jpc2`;
                axios.get(getPlaceUrl).then(async (res) => {
                    const place_id = await res.data[0].place_id;

                    const getWeatherUrl = `https://www.meteosource.com/api/v1/free/point?place_id=${place_id}&sections=current&timezone=auto&language=en&units=auto&key=u27ol0z4ex75k3b2jmkv1e16qjom381g61n3jpc2`
                    axios.get(getWeatherUrl).then((res) => {
                        setWeather({ summary: res.data.current.summary, temperature: res.data.current.temperature });
                    })
                }).catch((err) => {
                    console.error(err);
                })
            });
        // Do something with latitude and longitudeƒ
    }, [])

    return (
        <div className="weather-container">
            {/* Cloudy */}
            <div className="icon-and-temperatyre text-light">
                <div className="row">
                    <div className="col-5">
                        <div className="row">
                            <div className="col-6 icon">
                                {
                                    (weather.summary === 'Overcast' || weather.summary === 'Overcast with low clouds' || weather.summary === 'Fog') ?
                                        (   // cloudy
                                            <CloudyIcon />
                                        ) : (weather.summary === 'Sunny' || weather.summary === 'Mostly sunny') ?
                                            (
                                                <SunIcon />
                                            ) : (weather.summary === 'Partly sunny' || weather.summary === 'Mostly cloudy' || weather.summary === 'Cloudy') ?
                                                (
                                                    <CloudIcon />
                                                ) : (weather.summary === 'Light rain' || weather.summary === 'Rain' || weather.summary === 'Possible rain') ?
                                                    (
                                                        <RainyIcon />
                                                    ) : (weather.summary === 'Rain shower' || weather.summary === 'Thunderstorm' || weather.summary === 'Local thunderstorms' || weather.summary === 'Rain shower (night)' || weather.summary === 'Local thunderstorms (night)') ?
                                                        (
                                                            <CloudWithRainAndLightning />
                                                        ) : (weather.summary === 'Clear (night)' || weather.summary === 'Clear' || weather.summary === 'Mostly clear (night)' || weather.summary === 'Mostly clear' || weather.summary === 'Partly clear (night)' || weather.summary === 'Partly clear' || weather.summary === 'Mostly cloudy (night)' || weather.summary === 'Mostly cloudy' || weather.summary === 'Cloudy (night)' || weather.summary === 'Cloudy' || weather.summary === 'Overcast with low clouds' || weather.summary === 'Overcast with low clouds') ?
                                                            (
                                                                <ClearNight />
                                                            ) :
                                                                (
                                                                <CloudyIcon />
                                                                )
                                }
                            </div>

                            <div className="col-6 temperature">
                                <span>{weather.temperature ? Math.floor(weather.temperature) : '...'}°</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-7" style={{ paddingLeft: 15 }}>
                        <p className="text-white p-0 m-0" style={{ fontSize: '0.75rem' }}> <span> {isLocationAllow ? <i class="fas fa-map-marker-alt"></i> : (<><i class="fas fa-map-marker-alt"></i><span style={{ fontSize: '0.8rem', color: 'red' }}>x</span></>)} </span>
                            <span >{neighbourhood}</span>
                        </p>
                        <p className="text-white p-0 m-0" style={{ fontSize: '0.75rem' }}>
                            {time}
                        </p>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default WeatherBar;