import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  MapPin,
  RefreshCw
} from 'lucide-react';
import { weatherService, WeatherData } from '@/services/weatherService';
import { cn } from '@/lib/utils';

interface HeaderWeatherProps {
  location?: string;
  className?: string;
}

const HeaderWeather: React.FC<HeaderWeatherProps> = ({ 
  location = 'São Paulo',
  className
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return <Sun className="h-4 w-4 text-yellow-500" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="h-4 w-4 text-blue-500" />;
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow className="h-4 w-4 text-blue-300" />;
    } else {
      return <Cloud className="h-4 w-4 text-gray-500" />;
    }
  };

  const fetchWeatherData = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await weatherService.getCurrentWeather(location);
      setWeatherData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchWeatherData();
    
    // Atualizar a cada 30 minutos
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  if (loading) {
    return (
      <div className={cn("flex items-center gap-2 text-gray-500", className)}>
        <Cloud className="h-4 w-4 animate-pulse" />
        <span className="text-sm">Carregando...</span>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2 px-3 py-2 bg-gray-50/80 rounded-full border border-gray-200/50", className)}>
      <div className="flex items-center gap-2">
        {getWeatherIcon(weatherData.current.condition.text)}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-900">
            {Math.round(weatherData.current.temp_c)}°C
          </span>
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="h-3 w-3" />
            <span className="text-xs font-medium">{weatherData.location.name}</span>
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={fetchWeatherData}
        className="h-6 w-6 p-0 hover:bg-gray-200/50 rounded-full"
        title="Atualizar clima"
      >
        <RefreshCw className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default HeaderWeather;
