import axios from 'axios';
import dotenv from 'dotenv';
import Groq from 'groq-sdk'; // Utiliser 'Client' de Groq SDK
dotenv.config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Initialisation de Groq avec la clé API
const groq = new Groq({apiKey: `${process.env.GROQ_API_KEY}`})

// Contrôleur pour récupérer la météo par ville
export const getWeatherByCity = async (city) => {
    try {
        // Faire la requête à l'API OpenWeather
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: OPENWEATHER_API_KEY,
                units: 'metric', // Température en Celsius
                lang: 'fr', // Réponse en français
            },
        });

        // Retourner directement les données JSON de l'API
        return response.data;
    } catch (error) {
        console.error('Erreur API OpenWeather:', error.response?.data || error.message);
        throw new Error('Erreur lors de la récupération des données météo');
    }
};

// Fonction pour récupérer la température et donner des suggestions vestimentaires
export const getTemperatureWithSuggestion = async (req, res) => {
    const city = req.params.city;

    // Vérifier si la ville est présente dans les paramètres
    if (!city) {
        return res.status(400).json({ error: 'La ville est requise dans l\'URL' });
    }

    try {
        // Appeler la fonction getWeatherByCity pour obtenir la température de la ville
        const weatherData = await getWeatherByCity(city); // Elle renvoie directement les données météo
        const temperature = weatherData.main.temp; // Extraire la température du résultat

        // Obtenir une suggestion vestimentaire basée sur la température
        const suggestion = await getClothingSuggestionFromGroq(temperature); // Utiliser Groq pour générer une suggestion

        // Retourner la réponse avec la suggestion vestimentaire
        res.json({
            weatherData: weatherData,
            temperature: temperature,
            suggestion: suggestion,
        });

    } catch (error) {
        console.error('Erreur dans groqController:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données météo et des suggestions' });
    }
};

// Fonction pour donner une suggestion vestimentaire en fonction de la température via Groq
const getClothingSuggestionFromGroq = async (temperature) => {
    try {
        const prompt = `La température actuelle est de ${temperature}°C. Proposez des vêtements adaptés à cette température, en tenant compte du confort et de la praticité. mais raccourcis du max que tu peux.`;

        // Utiliser la méthode correcte pour envoyer la requête à Groq
        const chatCompletion = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: prompt
              }
            ],
            model: "llama3-70b-8192",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: true,
            stop: null
        });
        // Extraire la suggestion générée par Groq

        let response = [];
        for await (const chunk of chatCompletion) {
            process.stdout.write(chunk.choices[0]?.delta?.content || '');
            response.push(chunk.choices[0]?.delta?.content || '');
        }
        const suggestion = response; // Ou une autre propriété selon l'API de réponse

        return suggestion;

    } catch (error) {
        console.error('Erreur avec Groq:', error);
        return 'Désolé, je n\'ai pas pu générer une suggestion vestimentaire à partir de Groq.';
    }
};


