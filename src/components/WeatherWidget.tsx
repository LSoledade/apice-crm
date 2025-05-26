import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Droplets, 
  Thermometer,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { weatherService, WeatherData, ForecastData } from '@/services/weatherService';

interface WeatherWidgetProps {
  location?: string;
  showForecast?: boolean;
  className?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ 
  location = 'São Paulo', 
  showForecast = true,
  className = ''
}) => {
  const [weatherData, setWeatherData] = useState<(WeatherData & Partial<ForecastData>) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return <Sun className="h-6 w-6 text-yellow-500" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow className="h-6 w-6 text-blue-300" />;
    } else {
      return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };
  const fetchWeatherData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = showForecast 
        ? await weatherService.getWeatherForecast(location, 3)
        : await weatherService.getCurrentWeather(location);
      
      setWeatherData(data);
    } catch (err) {
      setError('Erro ao carregar dados do clima');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [location, showForecast]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleRefresh = () => {
    fetchWeatherData();
  };

  if (loading) {
    return (
      <Card className={`border-0 shadow-lg ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Cloud className="mr-2 h-5 w-5" />
            Clima
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weatherData) {
    return (
      <Card className={`border-0 shadow-lg ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center">
              <Cloud className="mr-2 h-5 w-5" />
              Clima
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleRefresh}
              className="p-1"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <Cloud className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">{error || 'Erro ao carregar clima'}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="mt-2"
            >
              Tentar novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-0 shadow-lg ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center">
            {getWeatherIcon(weatherData.current.condition.text)}
            <span className="ml-2">Clima</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRefresh}
            className="p-1"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {weatherData.location.name}, {weatherData.location.region}
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Agora
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {Math.round(weatherData.current.temp_c)}°C
              </div>
              <div className="text-sm text-muted-foreground">
                {weatherData.current.condition.text}
              </div>
              <div className="text-xs text-muted-foreground">
                Sensação: {Math.round(weatherData.current.feelslike_c)}°C
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center text-xs text-muted-foreground">
                <Droplets className="h-3 w-3 mr-1" />
                {weatherData.current.humidity}%
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Wind className="h-3 w-3 mr-1" />
                {Math.round(weatherData.current.wind_kph)} km/h
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        {showForecast && weatherData.forecast && (
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-sm font-medium text-muted-foreground">Próximos dias</h4>
            <div className="space-y-2">
              {weatherData.forecast.forecastday.slice(1).map((day, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-2">
                    {getWeatherIcon(day.day.condition.text)}
                    <span className="text-xs">
                      {new Date(day.date).toLocaleDateString('pt-BR', { 
                        weekday: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-right">
                    <div className="font-medium">
                      {Math.round(day.day.maxtemp_c)}°
                    </div>
                    <div className="text-muted-foreground">
                      {Math.round(day.day.mintemp_c)}°
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
