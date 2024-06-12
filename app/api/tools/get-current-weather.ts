async function getCurrentWeather(args: any) {
    try {
        const { city, state, country, units = 'standard' } = JSON.parse(args);
        const url = new URL('https://api.openweathermap.org/data/2.5/weather');
        const location = [city, state, country].filter(Boolean).join(',');

        // Append location if it's not empty
        if (location) url.searchParams.append('q', location);

        // Append API key and units
        url.searchParams.append('appid', process.env.OPENWEATHER_API_KEY || '');
        url.searchParams.append('units', units);
        console.log('url', url.toString());

        // Fetch the weather data
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        // Parse and return the response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const getCurrentWeatherToolDefinition = {
    type: 'function' as any,
    function: {
        name: 'get-current-weather',
        function: getCurrentWeather,
        description:
            'Retrieve the current weather for a specified location. The function returns the current weather conditions, including temperature, humidity, and weather descriptions.',
        parameters: {
            type: 'object',
            properties: {
                city: {
                    type: 'string',
                    description:
                        'The name of the city to get the weather for, e.g., "San Francisco". This parameter is required to specify the location.',
                },
                state: {
                    type: 'string',
                    description:
                        'The name of the state or region, e.g., "CA". This is optional and can help refine the search.',
                },
                country: {
                    type: 'string',
                    description:
                        'The ISO 3166 country code, e.g., "US". This parameter is required to specify the country.',
                },
                units: {
                    type: 'string',
                    enum: ['standard', 'metric', 'imperial'],
                    description:
                        "Units of measurement for the temperature. Choose 'standard', 'metric', or 'imperial'. Default is 'standard'.",
                    default: 'standard',
                },
            },
            required: ['city', 'country'],
        },
    },
};
