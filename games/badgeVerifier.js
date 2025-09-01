export async function hasBadge(address) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  return await contract.hasBadge(address);
}
