import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Pools } from './pages/Pools';
import { Votes } from './pages/Votes';
import { Profile } from './pages/Profile';
import { Results } from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pools" element={<Pools />} />
            <Route path="votes" element={<Votes />} />
            <Route path="results" element={<Results />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
