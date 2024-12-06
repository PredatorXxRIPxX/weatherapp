import express from 'express';
import { getWeatherByCity } from '../controllers/weatherController.js';
import { getForecastByCity } from '../controllers/forecastController.js';
import { getTemperatureWithSuggestion } from '../controllers/groqController.js';

const router = express.Router();

router.get('/weather/:city', getWeatherByCity);
router.get('/forecast/:city', getForecastByCity);
router.get('/temperature/:city', getTemperatureWithSuggestion);

export default router;
