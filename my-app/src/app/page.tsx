'use client';

import { FC, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HiPaperAirplane } from "react-icons/hi";
import Image from "next/image";
import { TbH3 } from "react-icons/tb";

const Home: FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
        { text: "Hi!", sender: 'user' },
        { text: "Hello! How can I help you today?", sender: 'bot' },
    ]);
    const [inputText, setInputText] = useState("");
    const heroRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(heroRef.current,
                { x: -100 },
                { x: 0, duration: 1.5, ease: "power3.out" }
            );
        }
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            gsap.fromTo(chatRef.current,
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
            );
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputText.trim()) {
            setMessages((prev) => [...prev, { text: inputText, sender: 'user' }]);
            setInputText("");

            try {
                const response = await fetch('http://127.0.0.1:8000/chat_gen', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: inputText }),
                });

                const data = await response.json();
                setMessages((prev) => [...prev, { text: data.ans, sender: 'bot' }]);
            } catch (error) {
                console.error("Error sending message to backend:", error);
            }
        }
    };

    return (
        <div
            className="h-[220vh] bg-gradient-to-br from-blue-900 to-black relative overflow-hidden"
            style={{
                backgroundImage: `url(https://wallpapers.com/images/hd/ethereum-snowy-night-my4f0fnnj7q6g5jd.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="flex h-[100vh] pt-24">
                <div ref={heroRef} className="w-2/3 flex flex-col items-center justify-center text-center px-6">
                    <h6 className="text-6xl font-extrabold text-white shadow-md">
                        Navigate the <span className="text-blue-400">Ethereum</span> ecosystem effortlessly with AI-powered <span className="text-blue-400">insights</span> at your fingertips!
                    </h6>
                </div>

                <div className="fixed right-8 bottom-8 w-[420px] h-[calc(100%-6rem-30px)] rounded-lg p-6 flex flex-col bg-black bg-opacity-90 backdrop-blur-lg border border-blue-600 shadow-lg"
                    style={{
                        boxShadow: '0 0 20px rgba(0, 0, 255, 0.8), 0 0 30px rgba(0, 128, 255, 0.6), 0 0 40px rgba(0, 0, 255, 0.4)',
                    }}>
                    <h2 className="text-xl font-bold text-white mb-4">Ask:</h2>
                    <div ref={chatRef} className="flex-grow overflow-y-auto bg-white/10 p-4 rounded-lg mb-4 backdrop-blur-md border border-blue-600">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-xs transition-transform duration-300 ${msg.sender === 'user' ? 'bg-blue-500 text-white transform hover:scale-105' : 'bg-gray-700 text-white transform hover:scale-105'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                            className="flex-grow p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow duration-200"
                            placeholder="Type your message..."
                        />
                        <div className="ml-2">
                            <button
                                onClick={handleSendMessage}
                                className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-4 py-3 rounded-lg transition-transform duration-200 transform hover:scale-105 flex items-center"
                            >
                                <HiPaperAirplane className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={descriptionRef} className="absolute w-1/2 mx-auto top-[80vh] left-16 p-6">
                <div className="bg-black rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105"
                    style={{
                        border: '1px solid rgba(0, 128, 255, 0.6)',
                        boxShadow: '0 0 20px rgba(0, 0, 255, 0.5), 0 0 30px rgba(0, 128, 255, 0.4), 0 0 40px rgba(0, 0, 255, 0.3)',
                    }}
                >
                    <h2 className="text-4xl font-bold text-white mb-2">Description</h2>
                    <p className="mt-4 text-xl leading-relaxed text-gray-300">
                        This Ethereum assistant app is designed to simplify how users interact with the blockchain, offering a seamless and personalized experience. With an AI-powered chatbot, users can explore blockchain concepts, ask technical questions, and receive real-time guidance tailored to their needs.
                        <br />
                        <br />
                        Example prompts include:
                        <br />
                        <br />
                        👉“How do I deploy a smart contract on Ethereum?”<br />
                        👉“What are gas fees and how can I reduce them?”<br />
                        👉“Can you explain how staking works on Ethereum?”<br />
                        👉“How do I interact with decentralized applications (dApps)?”<br />
                        👉“What’s the difference between Ethereum 1.0 and Ethereum 2.0?”<br />
                        👉“How can I securely store my Ethereum tokens?”<br />
                        <br />
                        This app aims to make Ethereum more accessible and intuitive, breaking down the complexities of the blockchain while empowering users to navigate the ecosystem confidently. By leveraging AI for instant insights and support, it enhances users' understanding and engagement with Ethereum, paving the way for a smarter, blockchain-savvy future.
                    </p>
                </div>
            </div>

            <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="text-center">
                    <p className="text-white text-xl flex items-center justify-center">
                        <span className="px-2">Powered by</span>
                        <Image
                            src="https://www.gaianet.ai/images/logo.png"
                            alt="Description of image"
                            width={50}
                            height={30}
                        />
                    </p>
                </div>
            </footer>

            <style jsx>{`
                .blinking {
                    animation: blinkingText 1.5s infinite;
                }

                @keyframes blinkingText {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Home;
