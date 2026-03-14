import React from 'react';

export default function WelcomeCard() {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-[#0d1117] ring-1 ring-white/10 rounded-2xl p-8 max-w-lg mx-auto transform transition-all hover:scale-[1.02] flex flex-col items-center shadow-2xl">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 mb-4">
          Project Ready
        </h2>
        <p className="text-[#8b949e] text-center mb-6 leading-relaxed">
          The environment for the Technopharmed Playground has been successfully set up! Astro 5, React 19, and Tailwind v4 are fully integrated. Start forging your ideas into reality.
        </p>
        <button className="px-6 py-2 bg-white/5 hover:bg-white/10 text-[#c9d1d9] border border-white/10 rounded-full font-medium transition-all hover:border-cyan-400/50 hover:text-cyan-300">
          Get Started
        </button>
      </div>
    </div>
  );
}
