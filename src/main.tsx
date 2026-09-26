import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HoverEffectsProvider } from './context/HoverEffectsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HoverEffectsProvider>
      <App />
    </HoverEffectsProvider>
  </StrictMode>,
);
