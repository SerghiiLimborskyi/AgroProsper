useEffect(() => {
  if (window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" });
  }
}, []);
