export interface Weather{
    location: WeatherLocation;
    current: WeatherCurrent;
}

class WeatherLocation{
    name!: string;
    region!: string;
    country!: string;
    lat!: number;
    lon!: number;
    tz_id!: string;
    localtime_epoch!: number;
    localtime!: string;
}
class WeatherCurrent{
    last_updated_epoch!: number;
    last_updated!: string;
    temp_c!: number;
    temp_f!: number;
    is_day!: number;
    condition!: WeatherCondition;
    wind_mph!: number;
    wind_kph!: number;
    wind_degree!: number;
    wind_dir!: string;
    pressure_mb!: number;
    pressure_in!: number;
    precip_mm!: number;
    precip_in!: number;
    humidity!: number;
    cloud!: number;
    feelslike_c!: number;
    feelslike_f!: number;
    vis_km!: number;
    vis_miles!: number;
    uv!: number;
    gust_mph!: number;
    gust_kph!: number;
    air_quality!: WeatherAirQuality;
}
class WeatherCondition{
    text!: string;
    icon!: string;
    code!: number;
}
class WeatherAirQuality{
    co!: number;
    no2!: number;
    o3!: number;
    so2!: number;
    pm2_5!: number;
    pm10!: number;
    us_epa_index!: number;
    gb_defra_index!: number;
}