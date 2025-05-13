import http, { IncomingMessage, ServerResponse } from 'http';

const appId = '220a14ce06da0b6e1ec72fc14d0e59e0';
const PORT = 8000;

const sendJsonResponse = (res: ServerResponse, statusCode: number, data: object) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const { searchParams, pathname } = new URL(req.url!, `http://${req.headers.host}`);
  if (pathname === '/api/weather-data' && req.method === 'GET') {
    const city = searchParams.get('city');
    if (!city) {
      return sendJsonResponse(res, 400, { error: 'City query parameter is required' });
    }
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`;

    try {
      const response = await fetch(weatherURL);

      if (response.ok) {
        const weatherData = await response.json();
        sendJsonResponse(res, 200, weatherData);
      } else {
        sendJsonResponse(res, response.status, { error: 'Failed to fetch weather data' });
      }
    } catch (err) {
      sendJsonResponse(res, 500, { error: 'Internal server error' });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
