import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY; // Récupère la clé API depuis .env
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Contrôleur pour récupérer la météo par ville
export const getWeatherByCity = async (req, res) => {
    const city = req.params.city; // Récupérer le nom de la ville depuis les paramètres d'URL

    if (!city) {
        return res.status(400).json({ error: 'La ville est requise dans l\'URL' });
    }

    try {
        // Faire la requête à l'API OpenWeather
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: OPENWEATHER_API_KEY,
                units: 'metric', // Température en Celsius
                lang: 'fr' // Réponse en français
            },
        });

        // Retourner la réponse JSON de l'API
        res.json(response.data);
        
    } catch (error) {
        // Vérification de l'erreur
        if (error.response) {
            // Si l'API a retourné une erreur, afficher le message d'erreur
            console.error('Erreur API OpenWeather:', error.response.data);
            return res.status(error.response.status).json({ error: error.response.data });
        } else {
            // Si l'erreur est autre (par exemple, problème réseau)
            console.error('Erreur lors de la requête à OpenWeather:', error.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des données météo' });
        }
    }
};
