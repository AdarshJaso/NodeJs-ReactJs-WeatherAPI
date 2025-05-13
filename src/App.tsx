import '@/App.css';
import { BrowserRouter } from 'react-router';
import Weather from './components/Weather';

function App() {
  return (
    <BrowserRouter>
      <Weather />
    </BrowserRouter>
  );
}

export default App;
