import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CloudStateProvider from './cloud/CloudStateProvider.jsx';
import AI from './routes/AI.jsx';
import Ecosystem from './routes/Ecosystem.jsx';
import Home from './routes/Home.jsx';
import Sync from './routes/Sync.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Ecosystem />} />
      <Route path="/knowledgebase" element={<AI />} />
      <Route path="/ecosystem" element={<Navigate to="/portfolio" replace />} />
      <Route path="/ai" element={<Navigate to="/knowledgebase" replace />} />
      <Route path="/sync" element={<Sync />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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
