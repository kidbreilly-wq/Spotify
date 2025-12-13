import React, { useState, useEffect } from 'react';
import { Play, Heart, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Music } from 'lucide-react';

export default function SpotifyClone() {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [savedSelections, setSavedSelections] = useState([]);

  const artists = [
    { id: 1, name: "Taylor Swift", genre: "Pop", image: "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676" },
    { id: 2, name: "Coldplay", genre: "Alternative Rock", image: "https://i.scdn.co/image/ab6761610000e5eb1ba8fc5f5c73e7e9313cc6eb" },
    { id: 3, name: "Drake", genre: "Hip-Hop", image: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9" },
    { id: 4, name: "Billie Eilish", genre: "Alternative", image: "https://i.scdn.co/image/ab6761610000e5eb4a8d86ea451a6519e1e18558" },
    { id: 5, name: "Ed Sheeran", genre: "Pop", image: "https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba" },
    { id: 6, name: "Ariana Grande", genre: "Pop", image: "https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952" },
    { id: 7, name: "Post Malone", genre: "Hip-Hop", image: "https://i.scdn.co/image/ab6761610000e5ebb17e85f9b8c662b15709e2eb" },
    { id: 8, name: "Dua Lipa", genre: "Pop", image: "https://i.scdn.co/image/ab6761610000e5ebd42a27db3286b58553da8858" }
  ];

  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
    const timestamp = new Date().toLocaleString();
    const newSelection = { artist: artist.name, timestamp };
    setSavedSelections(prev => [...prev, newSelection]);
    setShowPopup(false);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col relative">
      {/* Background Spotify Screenshot */}
      {showPopup && (
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.ctfassets.net/8cd2csgvqd3m/2nV0G8OlffDhtKHwREHeDJ/ad992187db6ba4b65ea742266486c922/spotify-wrapped-2023-desktop-ui.png')",
            backgroundSize: "cover",
            filter: "blur(10px) brightness(0.4)"
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col h-full">{/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-gray-900 to-black w-full h-full overflow-y-auto p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">Choose Your Favorite Artist</h2>
              <p className="text-gray-400 text-lg mb-10">Select an artist to personalize your experience</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {artists.map(artist => (
                  <button
                    key={artist.id}
                    onClick={() => handleArtistSelect(artist)}
                    className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-all transform hover:scale-105 text-left"
                  >
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-bold text-base">{artist.name}</h3>
                    <p className="text-sm text-gray-400">{artist.genre}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-indigo-900 to-black p-8">
          <h1 className="text-6xl font-bold mb-4">
            {selectedArtist ? `${selectedArtist.name} Radio` : 'Good Evening'}
          </h1>
          {selectedArtist && (
            <p className="text-gray-300">Based on your selection</p>
          )}
        </div>

        {/* Content Grid */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Made For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 aspect-square rounded mb-4 flex items-center justify-center">
                  <Music size={48} />
                </div>
                <h3 className="font-semibold mb-1">Daily Mix {i}</h3>
                <p className="text-sm text-gray-400">Your favorite songs</p>
              </div>
            ))}
          </div>

          {/* Selection Log */}
          {savedSelections.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Selection History</h2>
              <div className="bg-gray-900 rounded-lg p-4">
                {savedSelections.map((sel, idx) => (
                  <div key={idx} className="py-2 border-b border-gray-800 last:border-0">
                    <span className="font-semibold text-green-400">{sel.artist}</span>
                    <span className="text-gray-500 text-sm ml-4">{sel.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Player Bar */}
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        <div className="flex items-center justify-between">
          {/* Current Track */}
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded flex items-center justify-center">
              <Music size={24} />
            </div>
            <div>
              <h4 className="font-semibold">
                {selectedArtist ? `${selectedArtist.name} - Hit Song` : 'Select an Artist'}
              </h4>
              <p className="text-sm text-gray-400">
                {selectedArtist ? selectedArtist.name : 'No artist selected'}
              </p>
            </div>
            <button className="ml-4">
              <Heart size={20} className="text-gray-400 hover:text-green-500" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-4 mb-2">
              <button><Shuffle size={20} className="text-gray-400 hover:text-white" /></button>
              <button><SkipBack size={20} className="text-gray-400 hover:text-white" /></button>
              <button className="bg-white text-black rounded-full p-2 hover:scale-110 transition">
                <Play size={20} fill="currentColor" />
              </button>
              <button><SkipForward size={20} className="text-gray-400 hover:text-white" /></button>
              <button><Repeat size={20} className="text-gray-400 hover:text-white" /></button>
            </div>
            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-gray-400">0:00</span>
              <div className="flex-1 bg-gray-700 h-1 rounded-full">
                <div className="bg-white h-1 rounded-full w-1/3"></div>
              </div>
              <span className="text-xs text-gray-400">3:45</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Volume2 size={20} />
            <div className="w-24 bg-gray-700 h-1 rounded-full">
              <div className="bg-white h-1 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}