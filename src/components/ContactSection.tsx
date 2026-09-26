import React from 'react';
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  ExternalLink,
  ArrowUpRight,
  Terminal,
  Mail
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const channels = [
    {
      name: 'GitHub Organization',
      handle: 'Datum-Collective',
      href: 'https://github.com/Datum-Collective',
      desc: 'Source repositories, issues, RFCs, and collaborative development.',
      icon: Github,
      accent: 'border-white/20',
    },
    {
      name: 'X (Twitter)',
      handle: '@DatumCollective',
      href: 'https://x.com/DatumCollective',
      desc: 'Engineering updates, release drops, and discussions.',
      icon: Twitter,
      accent: 'border-white/20',
    },
    {
      name: 'LinkedIn',
      handle: 'Datum Collective',
      href: 'https://www.linkedin.com/company/datum-collective/',
      desc: 'Institutional announcements and collective milestones.',
      icon: Linkedin,
      accent: 'border-white/20',
    },
    {
      name: 'Instagram',
      handle: '@datum.blog',
      href: 'https://www.instagram.com/datum.blog/',
      desc: 'Visual journal, architectural blueprints, and lab culture.',
      icon: Instagram,
      accent: 'border-white/20',
    },
  ];

  return (
    <section id="contact" className="relative w-full py-16 border-t border-neutral-900 bg-transparent text-neutral-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-baseline justify-between border-b border-neutral-800 pb-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 font-mono text-xs">07</span>
            <span className="text-neutral-600">//</span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-widest uppercase font-mono">
              COMMUNICATIONS &amp; CHANNELS
            </h2>
          </div>
          <div className="text-[11px] text-neutral-500 font-mono mt-1 sm:mt-0">
            CONNECT :: REAL CHANNELS ONLY
          </div>
        </div>

        {/* Real Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.name}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="border border-neutral-800 bg-[#0a0a0a]/90 p-5 hover:border-neutral-500 hover:bg-[#111111] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-neutral-400 group-hover:text-white">
                    <Icon className="w-5 h-5" />
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                  </div>

                  <div className="text-sm font-bold text-white font-mono group-hover:underline underline-offset-4 mb-1">
                    {channel.name}
                  </div>

                  <div className="text-xs text-neutral-400 font-mono mb-2">
                    {channel.handle}
                  </div>

                  <p className="text-[11px] text-neutral-500 font-mono leading-relaxed">
                    {channel.desc}
                  </p>
                </div>

                <div className="border-t border-neutral-900 pt-3 mt-4 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                  <span>DISPATCH &gt;</span>
                  <span className="text-neutral-400">EXTERNAL LINK</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Direct lab note */}
        <div className="mt-8 border border-neutral-800/80 bg-[#060606] p-6 font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-neutral-200 font-semibold mb-1">
              CONTRIBUTING TO DATUM PROJECTS
            </div>
            <div className="text-neutral-400 text-[11px] leading-relaxed max-w-2xl">
              We welcome pull requests, RFCs, and bug reports directly via GitHub issues across our repositories.
              All production code follows strict automated verification criteria.
            </div>
          </div>

          <a
            href="https://github.com/Datum-Collective/RIFT-coding-agent"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono text-xs whitespace-nowrap flex items-center gap-2 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Open a Pull Request</span>
          </a>
        </div>

      </div>
    </section>
  );
};
