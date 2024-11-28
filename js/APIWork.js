export function getWeather(city) {
    return new Promise(function(resolve, reject) {
        const query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=93d7eb0028646fe8828a94f0736f6412`
        let answer = ''
        let xhr = new XMLHttpRequest()

        xhr.open('GET', query)

        xhr.send()

        xhr.onload = () => {
            if (xhr.status >= 400) {
                answer = 'Status ERROR'
                reject(new Error(answer))
            } else {
                let esrverResponse = JSON.parse(xhr.response)
                let mainTemp = esrverResponse.main.temp
                let mainTempFeelsLike = esrverResponse.main.feels_like 
                let mainWindSpeed = esrverResponse.wind.speed 
                answer = [mainTemp, mainTempFeelsLike, mainWindSpeed]
                resolve(answer)
            }
        }
    })
}

export function getWeatherFetch(city) {
    const query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=93d7eb0028646fe8828a94f0736f6412`;
    return fetch(query)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Important error handling!
            }
            return response.json();
        })
        .then(responseJson => {
            if (responseJson && responseJson.main) {
                let mainTemp = responseJson.main.temp;
                let mainTempFeelsLike = responseJson.main.feels_like;
                let mainWindSpeed = responseJson.wind.speed;
                const answer = [mainTemp, mainTempFeelsLike, mainWindSpeed];
                return answer;
            } else {
                console.error("Invalid API response:", responseJson);
                throw new Error("Invalid API response format");
            }
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          throw error; 
        });
}

