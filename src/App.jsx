import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import CloudStateProvider from './cloud/CloudStateProvider.jsx';
import RouteLoadingOverlay from './components/RouteLoadingOverlay.jsx';
import AI from './routes/AI.jsx';
import Ecosystem from './routes/Ecosystem.jsx';
import Home from './routes/Home.jsx';
import Sync from './routes/Sync.jsx';

function AppRoutes() {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    setTransitioning(true);
    const id = window.setTimeout(() => setTransitioning(false), 520);
    return () => window.clearTimeout(id);
  }, [location.pathname]);

  return (
    <>
      <RouteLoadingOverlay active={transitioning} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Ecosystem />} />
        <Route path="/knowledgebase" element={<AI />} />
        <Route path="/ecosystem" element={<Navigate to="/portfolio" replace />} />
        <Route path="/ai" element={<Navigate to="/knowledgebase" replace />} />
        <Route path="/sync" element={<Sync />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <CloudStateProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CloudStateProvider>
  );
}
