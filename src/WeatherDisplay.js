function WeatherDisplay(props) {
    const { temp, feelsLike, description, cityName, cod, message } = props

    if (cod != 200) {
        return (
            <small>{message}</small>
        )
    }
    return (
        <div className="WeatherDisplay">
            <h1>{cityName}</h1>
            <h2>{temp}</h2>
            <small>Feels Like: {feelsLike}</small>
            <p>{description}</p>
        </div>
    )
}

export default WeatherDisplay;