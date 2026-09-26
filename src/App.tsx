import React, { useState, useEffect } from 'react';
import { AsciiBackground } from './components/AsciiBackground';
import { TerminalHeroVisual } from './components/TerminalHeroVisual';
import { RiftSection } from './components/RiftSection';
import { MembersSection } from './components/MembersSection';
import { EpochsSection } from './components/EpochsSection';
import { ContactSection } from './components/ContactSection';
import { AsciiScrambleText, AsciiHoverCard } from './components/AsciiEffects';
import { fetchGitHubData, GitHubRepoData } from './lib/github';
import { Terminal, Shield, Cpu, Code2, ArrowDown, ExternalLink } from 'lucide-react';

export default function App() {
  const [githubData, setGithubData] = useState<GitHubRepoData>({
    stars: null,
    latestRelease: null,
    contributors: [],
    languages: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchGitHubData().then((data) => setGithubData(data));
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#e8e6df] font-mono selection:bg-[#f5f5f0] selection:text-[#080808]">
      
      {/* ertdfgcvb.xyz style living background character grid */}
      <AsciiBackground opacity={0.32} interactive={true} />

      {/* MINIMAL MONOSPACE TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080808]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs">
          
          {/* Logo / Brand mark with character scramble on hover */}
          <a
            href="#"
            className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors font-bold tracking-wider group"
          >
            <span className="text-emerald-400 group-hover:rotate-90 transition-transform duration-200 inline-block">&gt;</span>
            <AsciiScrambleText className="font-bold">DATUM COLLECTIVE</AsciiScrambleText>
          </a>

          {/* Quick Monospace Jump Menu */}
          <nav className="flex items-center gap-3 sm:gap-6 text-[11px] text-neutral-400">
            <a
              href="#about"
              className="hover:text-white transition-colors hidden sm:inline"
            >
              <AsciiScrambleText>ABOUT</AsciiScrambleText>
            </a>
            <a
              href="#projects"
              className="text-white hover:text-neutral-200 transition-colors font-semibold"
            >
              <AsciiScrambleText>[PROJECTS: RIFT]</AsciiScrambleText>
            </a>
            <a
              href="#members"
              className="hover:text-white transition-colors"
            >
              <AsciiScrambleText>MEMBERS</AsciiScrambleText>
            </a>
            <a
              href="#epochs"
              className="hover:text-white transition-colors hidden sm:inline"
            >
              <AsciiScrambleText>EPOCHS</AsciiScrambleText>
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors"
            >
              <AsciiScrambleText>CONTACT</AsciiScrambleText>
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT STACK */}
      <main className="relative z-10">
        
        {/* 1. HOME SECTION */}
        <section id="home" className="relative w-full pt-16 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Collective Statement */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 border border-white/15 px-3 py-1 bg-black/40 text-[11px] text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                <AsciiScrambleText speed={25}>ENGINEERING COLLECTIVE &amp; SYSTEMS LAB</AsciiScrambleText>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                <AsciiScrambleText speed={18} className="hover:text-neutral-100">
                  Tools for a more capable tomorrow.
                </AsciiScrambleText>
              </h1>

              {/* Exact short paragraph on what Datum Collective is */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                Datum Collective is an independent engineering cooperative focused on autonomous
                systems, verification runtimes, and developer tooling. We build open-source tools
                that validate their work against reality—prioritizing deterministic testing, AST
                integrity, and verifiable output over generative rhetoric.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <a
                  href="#projects"
                  className="px-4 py-2 bg-white text-black font-semibold hover:bg-neutral-200 transition-all flex items-center gap-2 group cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <AsciiScrambleText speed={20}>Explore RIFT Coding Agent</AsciiScrambleText>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://github.com/Datum-Collective"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200 hover:border-neutral-400 transition-all flex items-center gap-2"
                >
                  <AsciiScrambleText speed={25}>GitHub Org</AsciiScrambleText>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right: ertdfgcvb.xyz style living generative prompt canvas */}
            <div className="lg:col-span-6">
              <TerminalHeroVisual />
            </div>

          </div>
        </section>

        {/* 2. PROJECTS: RIFT (The highlight section based on poster spec) */}
        <RiftSection githubData={githubData} />

        {/* 3. ABOUT SECTION */}
        <section id="about" className="relative w-full py-20 border-t border-neutral-900 bg-transparent text-neutral-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-wrap items-baseline justify-between border-b border-neutral-800 pb-3 mb-10">
              <div className="flex items-center gap-3">
                <span className="text-neutral-500 font-mono text-xs">03</span>
                <span className="text-neutral-600">//</span>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-widest uppercase font-mono">
                  <AsciiScrambleText>ABOUT THE COLLECTIVE</AsciiScrambleText>
                </h2>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono mt-1 sm:mt-0">
                PURPOSE &bull; PHILOSOPHY &bull; STRUCTURE
              </div>
            </div>

            {/* 2-3 short paragraphs, wrapped in ertdfgcvb style hover cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <AsciiHoverCard className="border border-neutral-800/80 bg-[#0a0a0a]/80 p-6 flex flex-col justify-between group">
                <div>
                  <div className="text-[11px] text-neutral-500 font-mono tracking-widest uppercase mb-2">
                    [01 // PURPOSE]
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">
                    <AsciiScrambleText>Verification Over Prediction</AsciiScrambleText>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                    Modern software engineering cannot rely on probabilistic text completion. Datum
                    Collective develops tools that ground AI synthesis in compiler checks, regression
                    test suites, and interactive runtime sandboxes. Code is only as good as the tests
                    that verify it.
                  </p>
                </div>
                <div className="border-t border-neutral-900 pt-3 mt-6 text-[10px] text-neutral-500 font-mono group-hover:text-neutral-300 transition-colors">
                  FOCUS: DETERMINISTIC RUNTIMES
                </div>
              </AsciiHoverCard>

              <AsciiHoverCard className="border border-neutral-800/80 bg-[#0a0a0a]/80 p-6 flex flex-col justify-between group">
                <div>
                  <div className="text-[11px] text-neutral-500 font-mono tracking-widest uppercase mb-2">
                    [02 // PHILOSOPHY]
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">
                    <AsciiScrambleText>Uncompromising Craft</AsciiScrambleText>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                    We maintain an engineering lab ethos: zero vanity metrics, zero hollow marketing,
                    and complete transparent access to our codebases. Every tool is published under
                    permissive open-source licenses and evaluated on raw execution reliability.
                  </p>
                </div>
                <div className="border-t border-neutral-900 pt-3 mt-6 text-[10px] text-neutral-500 font-mono group-hover:text-neutral-300 transition-colors">
                  PRINCIPLE: RADICAL TRANSPARENCY
                </div>
              </AsciiHoverCard>

              <AsciiHoverCard className="border border-neutral-800/80 bg-[#0a0a0a]/80 p-6 flex flex-col justify-between group">
                <div>
                  <div className="text-[11px] text-neutral-500 font-mono tracking-widest uppercase mb-2">
                    [03 // STRUCTURE]
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">
                    <AsciiScrambleText>Distributed Guild</AsciiScrambleText>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                    Datum operates as an autonomous engineering collective. We coordinate around
                    shared technical specifications, RFCs, and high-impact open source tools rather
                    than conventional corporate hierarchies.
                  </p>
                </div>
                <div className="border-t border-neutral-900 pt-3 mt-6 text-[10px] text-neutral-500 font-mono group-hover:text-neutral-300 transition-colors">
                  GOVERNANCE: RFC &amp; PEER REVIEW
                </div>
              </AsciiHoverCard>

            </div>

          </div>
        </section>

        {/* 5. MEMBERS SECTION */}
        <MembersSection contributorsData={githubData.contributors} />

        {/* 6. EPOCHS SECTION */}
        <EpochsSection />

        {/* 7. CONTACT SECTION */}
        <ContactSection />

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#050505] py-8 text-neutral-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-neutral-300 font-bold">DATUM COLLECTIVE</span>
            <span className="text-neutral-700">|</span>
            <span>OPEN SOURCE &bull; MIT LICENSE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>SYSTEM STATUS: ALL OPERATIONAL</span>
            <span className="text-neutral-700">|</span>
            <a
              href="https://github.com/Datum-Collective/RIFT-coding-agent"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              RIFT REPO
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
