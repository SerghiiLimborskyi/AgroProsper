import { useEffect, useState } from 'react';

export default function NFTGallery() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch('/api/nfts')
      .then(res => res.json())
      .then(data => setNfts(data));
  }, []);

  return (
    <div>
      <h2>🖼️ NFT-галерея</h2>
      <div className="gallery">
        {nfts.map(nft => (
          <div key={nft.cid} className="card">
            <img src={`https://ipfs.io/ipfs/${nft.cid}`} alt="NFT" />
            <p>{nft.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function NFTGallery() {
  return (
    <div>
      <h2>🎨 NFT-галерея</h2>
      <p>Тут буде відображення токенів користувача або DAO-колекції</p>
      {/* Можна інтегрувати OpenSea API або IPFS */}
    </div>
  );
}
