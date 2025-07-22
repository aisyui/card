import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './components/pages/HomePage';
import DocsPage from './components/pages/DocsPage';
import OwnerPage from './components/pages/OwnerPage';
import UserPage from './components/pages/UserPage';
import CardDisplayPage from './components/pages/CardDisplayPage';

function App() {
  useEffect(() => {
    // HTTPS リダイレクト
    if (location.protocol !== "https:" && window.location.host !== "localhost:8080") {
      location.replace("https:" + location.href.substring(location.protocol.length));
    }
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/en" element={<DocsPage isEnglish />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/di" element={<DocsPage page="did" />} />
        <Route path="/vr" element={<DocsPage page="vr" />} />
        <Route path="/te" element={<DocsPage page="aiten" />} />
        <Route path="/c" element={<DocsPage page="cards" />} />
        <Route path="/svn" element={<DocsPage page="seven" />} />
        <Route path="/fa" element={<DocsPage page="fanart" />} />
        <Route path="/ph" element={<DocsPage page="photo" />} />
        <Route path="/pr" element={<DocsPage page="favorite" />} />
        <Route path="/cards/:id" element={<CardDisplayPage />} />
        <Route path="/:username" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;