import { useState, useEffect } from "react";

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

const FloatingDecoration = ({ emoji, className }: { emoji: string; className: string }) => (
  <div className={`absolute text-4xl md:text-6xl animate-float ${className}`}>
    {emoji}
  </div>
);

const AnimatedBall = ({ color, size, delay }: { color: string; size: string; delay: number }) => (
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
    <div className="fixed inset-0 bg-black overflow-hidden z-50">
      <video
        autoPlay
        muted
        className="w-full h-full object-cover"
        onEnded={onComplete}
      >
        <source
          src="https://videos.pexels.com/video-files/33025238/14076807_640_360_30fps.mp4"
          type="video/mp4"
        />
      </video>
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
      <FloatingDecoration emoji="🎄" className="top-10 left-5 md:left-20 animate-pulse-glow" />
      <FloatingDecoration emoji="🎅" className="top-32 right-8 md:right-24" />
      <FloatingDecoration emoji="🎁" className="bottom-32 left-10 md:left-32" />
      <FloatingDecoration emoji="❄️" className="bottom-20 right-5 md:right-16" />
      <FloatingDecoration emoji="⛄" className="top-1/2 left-8 md:left-16" />
      <FloatingDecoration emoji="🌟" className="top-1/3 right-5 md:right-12" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full animate-fade-in">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-festive-purple via-festive-pink to-festive-gold bg-clip-text text-transparent animate-pulse-glow">
              Happy New Year!
            </span>
          </h1>
        </div>

        <button
          onClick={handleClick}
          className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border border-purple-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div className="text-center space-y-6">
            <div className="text-6xl md:text-7xl">💝</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              A Special Wish For You
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              As the new year begins, I want you to know how special you are to me. This year brings new hopes, beautiful moments, and endless opportunities for us to create memories together.
            </p>
            <div className="pt-6">
              <p className="text-festive-purple font-bold text-lg animate-bounce">
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
    message: "May your heart dance with happiness all year long",
    emoji: "🎵",
    youtubeId: "90qE26nETds",
  },
  {
    id: 2,
    title: "Melody of Love",
    message: "Surrounded by love, warmth, and beautiful moments",
    emoji: "💫",
    youtubeId: "U2SVCCENLjE",
  },
  {
    id: 3,
    title: "Song of Dreams",
    message: "May all your dreams come true this year",
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
      className={`group relative bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
        isPlayed
          ? "border-festive-gold bg-gradient-to-br from-yellow-50 to-white"
          : "border-purple-200 hover:border-festive-purple"
      }`}
    >
      <div className="text-center space-y-4">
        <div className="text-5xl md:text-6xl">{song.emoji}</div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">{song.title}</h3>
        <p className="text-gray-600 text-sm md:text-base">{song.message}</p>
        <div className="pt-4">
          <p className="text-festive-purple font-bold text-sm">
            {isPlayed ? "✅ Played" : "🎧 Click to Play"}
          </p>
        </div>
      </div>
    </button>
  );
};

const SongsStep = ({ onNext }: { onNext: () => void }) => {
  const [playedSongs, setPlayedSongs] = useState<number[]>([]);
  const [showYoutube, setShowYoutube] = useState<number | null>(null);

  const handlePlaySong = (id: number) => {
    if (!playedSongs.includes(id)) {
      setPlayedSongs([...playedSongs, id]);
    }
    setShowYoutube(id);
  };

  const allSongsPlayed = playedSongs.length === 3;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-festive-cream via-white to-purple-100">
      {/* Animated background orbs */}
      <AnimatedBall color="bg-festive-purple" size="w-96 h-96" delay={0} />
      <AnimatedBall color="bg-festive-pink" size="w-80 h-80" delay={2} />
      <AnimatedBall color="bg-festive-gold" size="w-72 h-72" delay={1} />

      {/* Floating decorations */}
      <FloatingDecoration emoji="🎵" className="top-10 left-5 md:left-20 animate-pulse-glow" />
      <FloatingDecoration emoji="💕" className="top-32 right-8 md:right-24" />
      <FloatingDecoration emoji="🎶" className="bottom-32 left-10 md:left-32" />
      <FloatingDecoration emoji="🎼" className="bottom-20 right-5 md:right-16" />

      {/* YouTube modal */}
      {showYoutube && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-2xl w-full">
            <button
              onClick={() => setShowYoutube(null)}
              className="float-right text-gray-600 hover:text-gray-800 text-2xl mb-4"
            >
              ✕
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${songs.find((s) => s.id === showYoutube)?.youtubeId}?autoplay=1`}
                title="Song"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 md:px-8">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-festive-purple via-festive-pink to-festive-gold bg-clip-text text-transparent animate-pulse-glow">
              Special Songs For You
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">
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

        {allSongsPlayed && (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-festive-purple to-festive-pink hover:shadow-lg text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg md:text-xl animate-bounce"
          >
            Continue to Final Message 💝
          </button>
        )}

        {!allSongsPlayed && (
          <p className="text-gray-600 text-center text-base md:text-lg">
            Play all {3 - playedSongs.length} more song{3 - playedSongs.length !== 1 ? "s" : ""} to continue ✨
          </p>
        )}
      </div>
    </div>
  );
};

const FinalStep = ({ showConfetti }: { showConfetti: boolean }) => {
  useEffect(() => {
    // Trigger confetti on mount
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
      <FloatingDecoration emoji="🎄" className="top-10 left-5 md:left-20 animate-pulse-glow" />
      <FloatingDecoration emoji="🎅" className="top-32 right-8 md:right-24" />
      <FloatingDecoration emoji="🎁" className="bottom-32 left-10 md:left-32" />
      <FloatingDecoration emoji="❄️" className="bottom-20 right-5 md:right-16" />
      <FloatingDecoration emoji="⛄" className="top-1/2 left-8 md:left-16" />
      <FloatingDecoration emoji="🌟" className="top-1/3 right-5 md:right-12" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-festive-purple via-festive-pink to-festive-gold bg-clip-text text-transparent animate-pulse-glow">
              Happy New Year!
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
            You are truly special
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full backdrop-blur-sm border border-purple-200">
          <div className="text-center space-y-8">
            <div className="text-7xl md:text-8xl animate-bounce">💝</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Thank You For Being You
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                This year is a gift, and having you in my life makes it even more special. Through every song, every wish, and every moment, know that you are truly cherished.
              </p>
              <p className="text-festive-purple font-bold text-lg">
                Here's to a year filled with love, laughter, and countless beautiful memories together! 💫
              </p>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-4 text-4xl md:text-5xl">
              <span className="animate-float">💕</span>
              <span className="animate-float" style={{ animationDelay: "0.5s" }}>
                ✨
              </span>
              <span className="animate-float" style={{ animationDelay: "1s" }}>
                🎉
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center max-w-2xl">
          <p className="text-gray-600 text-sm md:text-base">
            Wishing you infinite happiness and endless blessings in this new year! 🌟
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
    setStep(2);
    setShowConfetti(true);
  };

  return (
    <>
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
