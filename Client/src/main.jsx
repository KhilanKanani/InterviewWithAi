// main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Store from './store/Store.jsx';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify'; // ✅ Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import styles

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
      <App />
      <ToastContainer /> {/* ✅ Correct component */}
    </Provider>
);
