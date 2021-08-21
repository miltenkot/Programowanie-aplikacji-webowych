import { IWeatherData, IWeather } from './interface';

export class ApiProvider {
    opwApiKey = 'ba902ad3308657210021079099bf254d';
    cityArray: string[] = [];
    counter: number = 0;

    constructor() {
        
    }
    async getCityInfo(city: string) {
        const weather = await this.getWeather(city);
        this.saveData(weather);
        return weather;
    }

    async getWeather(city: string): Promise<IWeatherData> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    saveData(data: any) {
        localStorage.setItem('weatherData', JSON.stringify(data));
    }
    
    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return JSON.parse(data);
        } 
        else 
        {
            return {};
        }
    }
    
    saveCitiesToLocalStorage(cities: string[]){
        if(cities == []){
            return;
        }else{
            let cityData: string[] = this.getCities();
            if(cityData){
                cityData.forEach(element => {
                    cities.push(element);
                });
            }
            localStorage.setItem('cityData', JSON.stringify(cities));
        }
    }

    getCities(){
        const cityData = localStorage.getItem('cityData');
        if (cityData) {
            return JSON.parse(cityData);
        } 
        else 
        {
            return;
        }
    }

    saveCityArray(str: string){
        
        if(this.cityArray.includes(str)){
            return;
        }else{
            this.cityArray.push(str);
        }
    }

    getCityName(){
        var str = (<HTMLInputElement>document.getElementById("inputField")).value;
        return str;
    }

    createWeatherDiv(weather: IWeatherData,cityName: string){

        let weatherDiv: HTMLDivElement = document.createElement("div");
        weatherDiv.id = "watherDiv" + this.counter;
        weatherDiv.className = "weatherDiv";

        let weatherCityName: HTMLDivElement = document.createElement("div");
        weatherCityName.className = "weatherCityName";
        weatherCityName.innerHTML = cityName;
        weatherCityName.id= "weatherCityNameID" + this.counter;

        let weatherSkyStatus: HTMLDivElement = document.createElement("div");
        weatherSkyStatus.className = "weatherSkyStatus";
        weatherSkyStatus.innerHTML = weather.weather[0].main;

        let tempAndHumidityDiv: HTMLDivElement = document.createElement("div");
        tempAndHumidityDiv.className = "tempAndHumidityDiv";

        let tempDiv: HTMLDivElement = document.createElement("div");
        tempDiv.className = "tempDiv";
        tempDiv.innerHTML = "Temp: " + weather.main.temp + "°C"

        let humidityPressureDiv: HTMLDivElement = document.createElement("div");
        humidityPressureDiv.className = "humidityPressureDiv";

        let humidityDiv: HTMLDivElement = document.createElement("div");
        humidityDiv.className = "humidityDiv";
        humidityDiv.innerHTML = "Hum: " + weather.main.humidity.toString() + "%";

        weatherDiv.appendChild(weatherCityName);
        weatherDiv.appendChild(weatherSkyStatus);
        weatherDiv.appendChild(tempAndHumidityDiv);
        tempAndHumidityDiv.appendChild(tempDiv);
        tempAndHumidityDiv.appendChild(humidityPressureDiv);
        humidityPressureDiv.appendChild(humidityDiv);

        this.counter++;
        return weatherDiv;
    }
}