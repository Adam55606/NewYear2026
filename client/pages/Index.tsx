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

export default function Index() {
  const [personalName, setPersonalName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleWish = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfetti(true);
    setSubmitted(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-festive-cream via-white to-purple-100">
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

      {/* Confetti animation */}
      {showConfetti && <Confetti />}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 md:px-8">
        {/* Header section */}
        <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-festive-purple via-festive-pink to-festive-gold bg-clip-text text-transparent animate-pulse-glow">
              Happy New Year!
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
            A fresh start, new dreams, and endless possibilities await
          </p>
        </div>

        {/* Card container */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full backdrop-blur-sm border border-purple-200">
          <div className="text-center mb-8">
            <div className="text-6xl md:text-7xl mb-4">✨</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Wish Someone Special
            </h2>
            <p className="text-gray-600">
              Share your new year wishes with someone you care about
            </p>
          </div>

          {/* Form section */}
          <form onSubmit={handleWish} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm md:text-base font-semibold text-gray-700 mb-3">
                Their Name
              </label>
              <input
                id="name"
                type="text"
                value={personalName}
                onChange={(e) => setPersonalName(e.target.value)}
                placeholder="Enter their name..."
                className="w-full px-6 py-3 md:py-4 border-2 border-purple-200 rounded-2xl text-base md:text-lg focus:outline-none focus:border-festive-purple focus:ring-2 focus:ring-purple-300 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-festive-purple to-festive-pink hover:shadow-lg text-white font-bold py-3 md:py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-base md:text-lg"
            >
              Send New Year Wishes 🎉
            </button>
          </form>

          {/* Personalized message */}
          {submitted && personalName && (
            <div className="mt-10 p-6 md:p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-festive-purple border-opacity-30 animate-pulse-glow">
              <p className="text-center text-lg md:text-xl text-gray-800">
                <span className="font-bold text-festive-purple">{personalName}</span>, may this year bring you{" "}
                <span className="font-bold text-festive-pink">joy</span>, {" "}
                <span className="font-bold text-festive-gold">success</span>, and{" "}
                <span className="font-bold text-festive-purple">unforgettable memories</span>! ✨
              </p>
            </div>
          )}

          {/* Default message when no name entered */}
          {submitted && !personalName && (
            <div className="mt-10 p-6 md:p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-festive-purple border-opacity-30 animate-pulse-glow">
              <p className="text-center text-lg md:text-xl text-gray-800">
                Here's to a year filled with <span className="font-bold text-festive-pink">joy</span>, {" "}
                <span className="font-bold text-festive-gold">growth</span>, and {" "}
                <span className="font-bold text-festive-purple">amazing adventures</span>! 🎊
              </p>
            </div>
          )}
        </div>

        {/* Footer message */}
        <div className="mt-12 md:mt-16 text-center max-w-2xl">
          <p className="text-gray-600 text-sm md:text-base">
            May every day of this new year bring you closer to your dreams and fill your heart with happiness! 💫
          </p>
        </div>
      </div>
    </div>
  );
}
