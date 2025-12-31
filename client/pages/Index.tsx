import { useState, useEffect } from "react";

// Global animation styles
const GlobalAnimations = () => (
  <style>{`
    /* Confetti pieces falling */
    .animate-confetti-fall {
      will-change: transform, opacity;
      animation-name: confetti-fall;
      animation-timing-function: cubic-bezier(.2,.8,.2,1);
      animation-fill-mode: forwards;
    }
    @keyframes confetti-fall {
      0% { transform: translateY(-4rem) rotate(0deg); opacity: 1; }
      70% { opacity: 1; }
      100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
    }

    /* Floating orbs and icons */
    .animate-float {
      animation: float 6s ease-in-out infinite;
      will-change: transform;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-24px) translateX(6px); }
      100% { transform: translateY(0px); }
    }

    /* Small pulsing used for stars and glows */
    .animate-pulse-glow {
      animation: pulse-glow 2.8s ease-in-out infinite;
    }
    @keyframes pulse-glow {
      0% { opacity: .6; transform: scale(1); filter: blur(4px); }
      50% { opacity: 1; transform: scale(1.04); filter: blur(2px); }
      100% { opacity: .6; transform: scale(1); filter: blur(4px); }
    }

    /* fade in */
    .animate-fade-in {
      animation: fade-in .6s ease both;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* fireworks spark burst - uses CSS vars --tx and --ty set inline */
    .animate-spark-burst {
      will-change: transform, opacity;
      animation: spark-burst 1.2s cubic-bezier(.2,.8,.2,1) forwards;
      opacity: 0.9;
      transform: translate(0,0) scale(.8);
    }
    @keyframes spark-burst {
      0% { transform: translate(0,0) scale(.6); opacity: 1; }
      60% { opacity: 1; }
      100% { transform: translate(var(--tx, 0px), var(--ty, 0px)) scale(1); opacity: 0; }
    }

    /* pulse animation for stars */
    @keyframes pulse {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
  `}</style>
);

const Confetti = () => {
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 1,
    emoji: ["🎉", "✨", "🎊", "💫", "🌟", "🎈"][Math.floor(Math.random() * 6)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute text-2xl md:text-4xl animate-confetti-fall"
          style={{
            left: `${item.left}%`,
            top: "-2rem",
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};

const FloatingDecoration = ({
  emoji,
  className,
}: {
  emoji: string;
  className: string;
}) => (
  <div className={`absolute text-4xl md:text-6xl animate-float ${className}`}>
    {emoji}
  </div>
);

const AnimatedBall = ({
  color,
  size,
  delay,
}: {
  color: string;
  size: string;
  delay: number;
}) => (
  <div
    className={`absolute ${color} ${size} rounded-full blur-2xl opacity-60`}
    style={{
      animation: `float ${4 + delay}s ease-in-out infinite`,
      animationDelay: `${delay * 0.5}s`,
    }}
  />
);

const FireworksIntro = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-50 flex items-center justify-center">
      {/* Night sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-900 to-black" />

      {/* Twinkling stars background */}
      {Array.from({ length: 200 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
            animation: `pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Multiple fireworks bursts at different positions and times */}
      {[0, 1.5, 3].map((startDelay) =>
        ["20", "50", "80"].map((xPos, idx) =>
          Array.from({ length: 80 }).map((_, i) => {
            const angle = (i / 80) * Math.PI * 2;
            const velocity = 3 + Math.random() * 4;
            const distance = velocity * 120;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance * 0.8 - 200;

            const particleColors = [
              "text-yellow-300",
              "text-yellow-200",
              "text-orange-300",
              "text-orange-400",
              "text-red-400",
              "text-pink-300",
              "text-white",
            ];

            return (
              <div
                key={`${startDelay}-${xPos}-${i}`}
                className={`absolute ${particleColors[Math.floor(Math.random() * particleColors.length)]} animate-spark-burst`}
                style={
                  {
                    left: `${xPos}%`,
                    top: "50%",
                    "--tx": `${tx}px`,
                    "--ty": `${ty}px`,
                    fontSize: Math.random() > 0.5 ? "16px" : "12px",
                    animationDelay: `${startDelay}s`,
                    opacity: 0.8,
                  } as React.CSSProperties
                }
              >
                •
              </div>
            );
          }),
        ),
      )}

      {/* Glowing light effects */}
      {[0, 1.5, 3].map((delay) => (
        <div
          key={delay}
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-50"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(255,200,0,0.6) 0%, transparent 70%)`,
            animation: `pulse 2s ease-in-out forwards`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}

      {/* Completion text */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10">
        <p className="text-white text-4xl md:text-5xl font-bold animate-fade-in">
          ✨ Happy New Year 2026 Shweta ✨
        </p>
      </div>
    </div>
  );
};

const WishesCard = ({ onNext }: { onNext: () => void }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onNext();
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-festive-cream via-white to-purple-100 flex items-center justify-center px-4">
      {showConfetti && <Confetti />}

      {/* Animated background orbs */}
      <AnimatedBall color="bg-festive-purple" size="w-96 h-96" delay={0} />
      <AnimatedBall color="bg-festive-pink" size="w-80 h-80" delay={2} />
      <AnimatedBall color="bg-festive-gold" size="w-72 h-72" delay={1} />

      {/* Floating decorations */}
      <FloatingDecoration
        emoji="🎄"
        className="top-10 left-5 md:left-20 animate-pulse-glow"
      />
      <FloatingDecoration emoji="🎅" className="top-32 right-8 md:right-24" />
      <FloatingDecoration emoji="🎁" className="bottom-32 left-10 md:left-32" />
      <FloatingDecoration
        emoji="❄️"
        className="bottom-20 right-5 md:right-16"
      />
      <FloatingDecoration emoji="⛄" className="top-1/2 left-8 md:left-16" />
      <FloatingDecoration emoji="🌟" className="top-1/3 right-5 md:right-12" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full animate-fade-in">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-festive-purple via-festive-pink to-festive-gold bg-clip-text text-transparent animate-pulse-glow">
              Happy New Year 2026!
            </span>
          </h1>
        </div>

        <button
          onClick={handleClick}
          className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border border-purple-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div className="text-center space-y-6">
            <div className="text-7xl md:text-8xl">💝</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              A Special Wish For You
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              As this new year begins, I just want us to start with a heart full
              of hope, calm, and togetherness.
            </p>
            <div className="pt-6">
              <p className="text-festive-purple font-bold text-xl md:text-2xl animate-bounce">
                Click to continue ✨
              </p>
            </div>
          </div>
        </button>

        <div className="mt-12 md:mt-16 text-center max-w-2xl">
          <p className="text-gray-600 text-sm md:text-base">
            Something special awaits you... 💫
          </p>
        </div>
      </div>
    </div>
  );
};

interface Song {
  id: number;
  title: string;
  message: string;
  emoji: string;
  youtubeId: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: "Song of Joy",
    message:
      "May our days be filled with calm moments, deep smiles, and better understanding — like a melody that feels just right.",
    emoji: "🎵",
    youtubeId: "90qE26nETds",
  },
  {
    id: 2,
    title: "Melody of Love",
    message:
      "May our days be filled with calm moments, deep smiles, and better understanding — like a melody that feels just right.",
    emoji: "💫",
    youtubeId: "U2SVCCENLjE",
  },
  {
    id: 3,
    title: "Song of Dreams",
    message:
      "This new year, I wish for gentle moments, honest smiles, and a love that grows quietly stronger — just us, moving forward together.",
    emoji: "✨",
    youtubeId: "xEALTVLxrDw",
  },
];

const SongCard = ({
  song,
  onPlay,
  isPlayed,
}: {
  song: Song;
  onPlay: (id: number) => void;
  isPlayed: boolean;
}) => {
  return (
    <button
      onClick={() => onPlay(song.id)}
      className={`group relative bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer ${isPlayed
        ? "border-festive-gold bg-gradient-to-br from-yellow-50 to-white"
        : "border-purple-200 hover:border-festive-purple"
        }`}
    >
      <div className="text-center space-y-4">
        <div className="text-5xl md:text-6xl">{song.emoji}</div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">
          {song.title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base">{song.message}</p>
        <div className="pt-4">
          <p className="text-festive-purple font-bold text-sm">
            {isPlayed ? "✅ Playing" : "🎧 Click to Play"}
          </p>
        </div>
      </div>
    </button>
  );
};

const SongsStep = ({ onNext }: { onNext: () => void }) => {
  const [playedSongs, setPlayedSongs] = useState<number[]>([]);
  const [backgroundMusicId, setBackgroundMusicId] = useState<number | null>(
    null,
  );

  const handlePlaySong = (id: number) => {
    if (!playedSongs.includes(id)) {
      setPlayedSongs([...playedSongs, id]);
    }
    // Only set background music, no modal
    setBackgroundMusicId(id);
  };

  const allSongsPlayed = playedSongs.length === 3;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-festive-cream via-white to-purple-100">
      {/* Animated background orbs */}
      <AnimatedBall color="bg-festive-purple" size="w-96 h-96" delay={0} />
      <AnimatedBall color="bg-festive-pink" size="w-80 h-80" delay={2} />
      <AnimatedBall color="bg-festive-gold" size="w-72 h-72" delay={1} />

      {/* Floating decorations */}
      <FloatingDecoration
        emoji="🎵"
        className="top-10 left-5 md:left-20 animate-pulse-glow"
      />
      <FloatingDecoration emoji="💕" className="top-32 right-8 md:right-24" />
      <FloatingDecoration emoji="🎶" className="bottom-32 left-10 md:left-32" />
      <FloatingDecoration
        emoji="🎼"
        className="bottom-20 right-5 md:right-16"
      />

      {/* Background music player (hidden, continues in background) */}
      {backgroundMusicId && (
        <div
          style={{
            position: "fixed",
            bottom: "-1000px",
            left: "-1000px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            zIndex: "-1",
          }}
        >
          <iframe
            key={`bg-music-${backgroundMusicId}`}
            width="1"
            height="1"
            src={`https://www.youtube.com/embed/${songs.find((s) => s.id === backgroundMusicId)?.youtubeId}?autoplay=1&controls=0`}
            title="Background Music"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: "none" }}
          />
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 md:px-8">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-festive-purple via-festive-pink to-festive-gold bg-clip-text text-transparent animate-pulse-glow">
              Special Songs For You 2026
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 font-medium">
            Listen to these melodies filled with love and wishes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-8">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onPlay={handlePlaySong}
              isPlayed={playedSongs.includes(song.id)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {allSongsPlayed && (
            <button
              onClick={() => {
                setBackgroundMusicId(null);
                onNext();
              }}
              className="bg-gradient-to-r from-festive-purple to-festive-pink hover:shadow-lg text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg md:text-xl animate-bounce"
            >
              Continue to Final Message 💝
            </button>
          )}

          {!allSongsPlayed && (
            <p className="text-gray-600 text-center text-base md:text-lg">
              Play all {3 - playedSongs.length} more song
              {3 - playedSongs.length !== 1 ? "s" : ""} to continue ✨
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const FinalStep = ({ showConfetti }: { showConfetti: boolean }) => {
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        // Keep confetti visible
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-festive-cream via-white to-purple-100">
      {showConfetti && <Confetti />}

      {/* Animated background orbs */}
      <AnimatedBall color="bg-festive-purple" size="w-96 h-96" delay={0} />
      <AnimatedBall color="bg-festive-pink" size="w-80 h-80" delay={2} />
      <AnimatedBall color="bg-festive-gold" size="w-72 h-72" delay={1} />

      {/* Floating decorations */}
      <FloatingDecoration
        emoji="🎄"
        className="top-10 left-5 md:left-20 animate-pulse-glow"
      />
      <FloatingDecoration emoji="🎅" className="top-32 right-8 md:right-24" />
      <FloatingDecoration emoji="🎁" className="bottom-32 left-10 md:left-32" />
      <FloatingDecoration
        emoji="❄️"
        className="bottom-20 right-5 md:right-16"
      />
      <FloatingDecoration emoji="⛄" className="top-1/2 left-8 md:left-16" />
      <FloatingDecoration emoji="🌟" className="top-1/3 right-5 md:right-12" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-festive-purple via-festive-pink to-festive-gold bg-clip-text text-transparent animate-pulse-glow">
              Happy New Year 2026!
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-medium">
            You are truly special Shweta
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full backdrop-blur-sm border border-purple-200">
          <div className="text-center space-y-8">
            <div className="text-8xl md:text-9xl animate-bounce">💝</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Thank You For Being You
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                This year is a gift, and having you in my life makes it even
                more special. Through every song, every wish, and every moment,
                know that you are truly cherished.
              </p>
              <p className="text-festive-purple font-bold text-xl md:text-2xl">
                Here's to a year filled with love, laughter, and countless
                beautiful memories together! 💫
              </p>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-4 text-5xl md:text-6xl">
              <span className="animate-float">💕</span>
              <span
                className="animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                ✨
              </span>
              <span className="animate-float" style={{ animationDelay: "1s" }}>
                🎉
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center max-w-2xl">
          <p className="text-gray-600 text-base md:text-lg">
            Wishing you infinite happiness and endless blessings in this new
            year! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Index() {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleWishesComplete = () => {
    setStep(2);
    setShowConfetti(true);
  };

  const handleSongsComplete = () => {
    setStep(3);
    setShowConfetti(true);
  };

  return (
    <>
      {/* Inject global animation keyframes/styles once */}
      <GlobalAnimations />

      {step === 0 && <FireworksIntro onComplete={() => setStep(1)} />}

      {step === 1 && (
        <div className="transition-all duration-700 animate-fade-in">
          <WishesCard onNext={handleWishesComplete} />
        </div>
      )}

      {step === 2 && (
        <div className="transition-all duration-700 animate-fade-in">
          <SongsStep onNext={handleSongsComplete} />
        </div>
      )}

      {step === 3 && (
        <div className="transition-all duration-700 animate-fade-in">
          <FinalStep showConfetti={showConfetti} />
        </div>
      )}
    </>
  );
}
