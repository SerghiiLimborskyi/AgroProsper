import DAOAnalytics from './components/DAOAnalytics';
import NFTGallery from './components/NFTGallery';
import WalletPanel from './components/WalletPanel';

export default function App() {
  return (
    <div>
      <WalletPanel />
      <NFTGallery />
      <DAOAnalytics />
    </div>
  );
}
