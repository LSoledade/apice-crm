
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';


if (!WEATHER_API_KEY) {
  console.error('VITE_WEATHER_API_KEY not found in environment variables. Please check your .env file.');
}

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
}

export interface ForecastData {
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

class WeatherService {
  private async fetchWeatherData<T>(endpoint: string): Promise<T> {
    if (!WEATHER_API_KEY) {
      throw new Error('Weather API key not configured. Please check your environment variables.');
    }

    try {
      const response = await fetch(`${WEATHER_API_BASE_URL}${endpoint}&key=${WEATHER_API_KEY}`);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid Weather API key. Please check your configuration.');
        } else if (response.status === 403) {
          throw new Error('Weather API key quota exceeded or access denied.');
        } else {
          throw new Error(`Weather API error: ${response.status} - ${response.statusText}`);
        }
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async getCurrentWeather(location: string = 'São Paulo'): Promise<WeatherData> {
    return this.fetchWeatherData<WeatherData>(`/current.json?q=${encodeURIComponent(location)}&aqi=no`);
  }

  async getWeatherForecast(location: string = 'São Paulo', days: number = 3): Promise<WeatherData & ForecastData> {
    return this.fetchWeatherData<WeatherData & ForecastData>(`/forecast.json?q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`);
  }

  async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    return this.fetchWeatherData<WeatherData>(`/current.json?q=${lat},${lon}&aqi=no`);
  }
}

export const weatherService = new WeatherService();
