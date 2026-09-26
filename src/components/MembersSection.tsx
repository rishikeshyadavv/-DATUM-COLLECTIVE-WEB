import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { AsciiScrambleText, AsciiHoverCard } from './AsciiEffects';

interface Member {
  name: string;
  handle: string;
  role: string;
  avatar: string;
  github: string;
  bio?: string;
  isOwner?: boolean;
}

interface MembersSectionProps {
  contributorsData: { login: string; avatar_url: string; contributions: number }[];
}

export const MembersSection: React.FC<MembersSectionProps> = ({ contributorsData }) => {
  const getAvatar = (handle: string, fallbackId: string) => {
    const found = contributorsData.find(
      (c) => c.login.toLowerCase() === handle.toLowerCase()
    );
    return found?.avatar_url || `https://github.com/${handle}.png`;
  };

  const getContribCount = (handle: string, fallback: number) => {
    const found = contributorsData.find(
      (c) => c.login.toLowerCase() === handle.toLowerCase()
    );
    return found?.contributions || fallback;
  };

  // 8 Members from Datum-Collective GitHub organization:
  // 1. Agralookinforsomwthing (Owner)
  // 2. dan / danvraz (Owner)
  // 3. Devjeet Singh / Dev-dub (Owner)
  // 4. Arjun Nasalwai / kaiser-alsiphet (Owner)
  // 5. Pdeeppyy (Member)
  // 6. Ridhviraj / ridhvi77 (Owner)
  // 7. rishikesh yadav / rishikeshyadavv (Owner)
  // 8. Shivamsh / shiv207 (Owner)
  const members: Member[] = [
    {
      name: 'Shivamsh',
      handle: 'shiv207',
      role: 'CORE SYSTEMS & FOUNDER',
      avatar: getAvatar('shiv207', '118673372'),
      github: 'https://github.com/shiv207',
      bio: 'Agent runtime harness, deterministic testing protocols, verification loop toolchains.',
      isOwner: true,
    },
    {
      name: 'Dan',
      handle: 'danvraz',
      role: 'CORE RESEARCH & SYSTEMS',
      avatar: getAvatar('danvraz', '227579758'),
      github: 'https://github.com/danvraz',
      bio: 'Agent runtime, feedback loop orchestration, developer experience.',
      isOwner: true,
    },
    {
      name: 'rishikesh yadav',
      handle: 'rishikeshyadavv',
      role: 'CORE ENGINEER & SYSTEMS',
      avatar: getAvatar('rishikeshyadavv', 'rishikeshyadavv'),
      github: 'https://github.com/rishikeshyadavv',
      bio: 'Autonomous systems, frontend architecture, interactive tooling.',
      isOwner: true,
    },
    {
      name: 'Devjeet Singh',
      handle: 'Dev-dub',
      role: 'CORE ENGINEER',
      avatar: getAvatar('Dev-dub', 'Dev-dub'),
      github: 'https://github.com/Dev-dub',
      bio: 'System integrations, AST pipelines, test infrastructure.',
      isOwner: true,
    },
    {
      name: 'Arjun Nasalwai',
      handle: 'kaiser-alsiphet',
      role: 'CORE ENGINEER',
      avatar: getAvatar('kaiser-alsiphet', 'kaiser-alsiphet'),
      github: 'https://github.com/kaiser-alsiphet',
      bio: 'Infrastructure, tooling runtimes, compiler interfaces.',
      isOwner: true,
    },
    {
      name: 'Ridhviraj',
      handle: 'ridhvi77',
      role: 'CORE RESEARCH',
      avatar: getAvatar('ridhvi77', 'ridhvi77'),
      github: 'https://github.com/ridhvi77',
      bio: 'Agent evaluation, synthetic test harnesses, model grounding.',
      isOwner: true,
    },
    {
      name: 'Agralookinforsomwthing',
      handle: 'Agralookinforsomwthing',
      role: 'CORE ENGINEER',
      avatar: getAvatar('Agralookinforsomwthing', 'Agralookinforsomwthing'),
      github: 'https://github.com/Agralookinforsomwthing',
      bio: 'Backend services, validation pipelines, distributed tooling.',
      isOwner: true,
    },
    {
      name: 'Pdeeppyy',
      handle: 'Pdeeppyy',
      role: 'ENGINEER & CONTRIBUTOR',
      avatar: getAvatar('Pdeeppyy', 'Pdeeppyy'),
      github: 'https://github.com/Pdeeppyy',
      bio: 'OpenCode modules, runtime tooling, developer workflows.',
      isOwner: false,
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
          <div className="text-[11px] text-neutral-500 font-mono mt-1 sm:mt-0 flex items-center gap-2">
            <span>ROSTER :: 8 ACTIVE MAINTAINERS</span>
            <span className="text-neutral-600">|</span>
            <span className="text-emerald-400">ORGANIZATION REPOSITORIES</span>
          </div>
        </div>

        {/* 8 Members Grid (Responsive 1 -> 2 -> 4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((member) => (
            <AsciiHoverCard
              key={member.handle}
              className="border border-neutral-800 bg-[#0a0a0a]/90 p-4 hover:border-neutral-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to GitHub standard identicon if network blocked
                        (e.target as HTMLImageElement).src = `https://github.com/identicons/${member.handle}.png`;
                      }}
                      className="w-10 h-10 rounded-none border border-neutral-700 object-cover bg-neutral-900 filter grayscale contrast-125 group-hover:contrast-150 transition-all"
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white group-hover:text-neutral-100 font-mono truncate">
                        <AsciiScrambleText>{member.name}</AsciiScrambleText>
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono truncate">
                        @{member.handle}
                      </div>
                    </div>
                  </div>

                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 border border-neutral-800 hover:border-neutral-400 text-neutral-400 hover:text-white transition-colors shrink-0"
                    title={`View @${member.handle} on GitHub`}
                    aria-label={`View @${member.handle} on GitHub`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="text-[9px] text-neutral-400 font-mono tracking-wider uppercase mb-2 flex items-center justify-between">
                  <span>{member.role}</span>
                  {member.isOwner && (
                    <span className="text-[8px] border border-neutral-800 px-1 py-0.2 bg-black text-neutral-400">
                      OWNER
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-neutral-400 font-mono leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              <div className="border-t border-neutral-900 pt-2.5 mt-3 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span className="text-neutral-500">COMMITS: {getContribCount(member.handle, member.isOwner ? 12 : 6)}</span>
                <span className="text-emerald-500/80 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block animate-pulse" />
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
            <AsciiScrambleText>Explore all collective repositories</AsciiScrambleText>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
