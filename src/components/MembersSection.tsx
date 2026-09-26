import React from 'react';
import { ExternalLink, Github, Terminal, ArrowUpRight } from 'lucide-react';
import { AsciiScrambleText, AsciiHoverCard } from './AsciiEffects';

interface Member {
  name: string;
  handle: string;
  role: string;
  avatar: string;
  github: string;
  bio?: string;
  contributions?: number;
}

interface MembersSectionProps {
  contributorsData: { login: string; avatar_url: string; contributions: number }[];
}

export const MembersSection: React.FC<MembersSectionProps> = ({ contributorsData }) => {
  // Confirmed members: danvraz and shiv207
  const getContribCount = (handle: string, fallback: number) => {
    const found = contributorsData.find(
      (c) => c.login.toLowerCase() === handle.toLowerCase()
    );
    return found?.contributions || fallback;
  };

  const members: Member[] = [
    {
      name: 'Shivamsh',
      handle: 'shiv207',
      role: 'CORE ENGINEER & FOUNDER',
      avatar: 'https://avatars.githubusercontent.com/u/118673372?v=4',
      github: 'https://github.com/shiv207',
      bio: 'Systems, agentic loop architecture, verification toolchains.',
      contributions: getContribCount('shiv207', 15),
    },
    {
      name: 'Dan',
      handle: 'danvraz',
      role: 'CORE RESEARCH & SYSTEMS',
      avatar: 'https://avatars.githubusercontent.com/u/227579758?v=4',
      github: 'https://github.com/danvraz',
      bio: 'Agent runtime, feedback loop orchestration, developer experience.',
      contributions: getContribCount('danvraz', 8),
    },
  ];

  return (
    <section id="members" className="relative w-full py-16 border-t border-neutral-900 bg-transparent text-neutral-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-baseline justify-between border-b border-neutral-800 pb-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 font-mono text-xs">05</span>
            <span className="text-neutral-600">//</span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-widest uppercase font-mono">
              <AsciiScrambleText>MEMBERS &amp; CONTRIBUTORS</AsciiScrambleText>
            </h2>
          </div>
          <div className="text-[11px] text-neutral-500 font-mono mt-1 sm:mt-0">
            ROSTER :: ACTIVE MAINTAINERS
          </div>
        </div>

        {/* Member cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member) => (
            <AsciiHoverCard
              key={member.handle}
              className="border border-neutral-800 bg-[#0a0a0a]/90 p-5 hover:border-neutral-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-none border border-neutral-700 object-cover bg-neutral-900 filter grayscale contrast-125 group-hover:contrast-150 transition-all"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-white group-hover:text-neutral-100 font-mono">
                          <AsciiScrambleText speed={25}>{member.name}</AsciiScrambleText>
                        </span>
                        <span className="text-xs text-neutral-500 font-mono">
                          (@{member.handle})
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase mt-0.5">
                        <AsciiScrambleText speed={35}>{member.role}</AsciiScrambleText>
                      </div>
                    </div>
                  </div>

                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 border border-neutral-800 hover:border-neutral-400 text-neutral-400 hover:text-white transition-colors"
                    title={`View @${member.handle} on GitHub`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-neutral-400 font-mono leading-relaxed mt-2">
                  {member.bio}
                </p>
              </div>

              <div className="border-t border-neutral-900 pt-3 mt-4 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span className="group-hover:text-neutral-300 transition-colors">RIFT COMMITS: {member.contributions}</span>
                <span className="text-emerald-500/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  ACTIVE
                </span>
              </div>
            </AsciiHoverCard>
          ))}
        </div>

        <div className="mt-8 border border-neutral-900 bg-black/40 p-4 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-500">
          <span>Datum Collective operates as an open engineering cooperative.</span>
          <a
            href="https://github.com/Datum-Collective"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 mt-2 sm:mt-0 underline underline-offset-2"
          >
            <AsciiScrambleText speed={25}>Explore all collective repositories</AsciiScrambleText>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
