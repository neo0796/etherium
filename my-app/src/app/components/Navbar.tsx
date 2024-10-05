'use client';

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Web3 from 'web3'; // Import Web3
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import Link from 'next/link'; // Use Link to navigate

declare global {
  interface Window {
    ethereum?: any;
    web3?: Web3;
  }
}

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0 EM'); // Set initial balance
  const logoRef = useRef<HTMLDivElement>(null); // Ref for logo animation

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.error('MetaMask is not detected');
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Create a Web3 instance using window.ethereum
        const web3 = new Web3(window.ethereum);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]); // Store the first account address
        console.log('Connected account:', accounts[0]);

        // Fetch balance in Wei and convert to Ether
        const balanceInWei = await web3.eth.getBalance(accounts[0]);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        setBalance(`15 EM`);
      } catch (error) {
        console.error("User denied wallet connection or another error occurred:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-transparent z-50">
      <div 
        ref={logoRef} 
        className="flex items-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500"
      >
        <a href="/">EtherMind</a>
      </div>
      <div className="flex items-center space-x-4">
        {/* Display Balance */}
        {/* {isConnected && ( */}
          <div className="text-white font-semibold">
            Balance: {balance}
          </div>
        {/* )} */}

        {/* Profile Button */}
        {/* {isConnected && ( */}
          <Link href={`/profile?account=${account}&balance=${balance}`}>
            <button 
              className="text-white bg-blue-500 hover:bg-blue-400 transition duration-300 px-4 py-2 rounded-lg flex items-center space-x-2 transform hover:scale-105"
            >
              <FaUserCircle className="text-2xl" />
              <span>Profile</span>
            </button>
          </Link>
        {/* )} */}

        {/* Connect MetaMask Button */}
        <button 
          onClick={isConnected ? undefined : connectWallet} 
          className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 transition duration-300 px-4 py-2 rounded-lg transform hover:scale-105"
        >
          {isConnected ? `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}` : "Connect MetaMask"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
