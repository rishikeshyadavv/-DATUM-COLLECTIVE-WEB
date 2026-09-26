import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, GitCommit, Sparkles } from 'lucide-react';
import { AsciiScrambleText, AsciiHoverCard } from './AsciiEffects';

interface EpochItem {
  id: string;
  tag: string;
  title: string;
  period: string;
  status: 'current' | 'completed' | 'planned';
  description: string;
  milestones: string[];
}

export const EpochsSection: React.FC = () => {
  const [expandedEpoch, setExpandedEpoch] = useState<string>('epoch-02');

  const epochs: EpochItem[] = [
    {
      id: 'epoch-02',
      tag: 'EPOCH 02',
      title: 'CLOSED-LOOP VERIFICATION RUNTIMES',
      period: 'CURRENT // 2026',
      status: 'current',
      description:
        'Transitioning AI software agents from naive text autocomplete to deterministic runtime execution and self-testing environments. Core focus on RIFT engine stabilization, browser telemetry integration, and zero-hallucination verification loops.',
      milestones: [
        'RIFT v0.1.x release baseline with OpenCode integration',
        'Headless browser runtime execution with error log capture',
        'Automated git diff verification layer against agent summaries',
        'Direct test runner feedback hooks with AST integrity validation',
      ],
    },
    {
      id: 'epoch-01',
      tag: 'EPOCH 01',
      title: 'COLLECTIVE FOUNDING & AGENTIC EXPLORATION',
      period: '2025',
      status: 'completed',
      description:
        'Formation of Datum Collective as a developer-first engineering lab. Investigated failure modes in LLM code generation, benchmarked test-driven repair architectures, and prototyped the initial RIFT runtime harness.',
      milestones: [
        'Datum Collective engineering charter drafted',
        'Initial prototypes of self-healing coding feedback loops',
        'Architecture specification for RIFT coding agent',
        'Open-source repository release on GitHub',
      ],
    },
    {
      id: 'epoch-03',
      tag: 'EPOCH 03',
      title: 'AUTONOMOUS REPO-LEVEL REFACTORING',
      period: 'FUTURE HORIZON',
      status: 'planned',
      description:
        'Long-horizon multi-crate refactoring pipelines, formal proof verification hooks, and multi-agent coordination with strict mechanical consensus.',
      milestones: [
        'Formal verification hooks & type-theoretic invariants',
        'Multi-agent consensus protocols for high-stakes codebases',
        'Continuous repo-wide architectural synthesis',
      ],
    },
  ];

  return (
    <section id="epochs" className="relative w-full py-16 border-t border-neutral-900 bg-transparent text-neutral-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-baseline justify-between border-b border-neutral-800 pb-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 font-mono text-xs">06</span>
            <span className="text-neutral-600">//</span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-widest uppercase font-mono">
              <AsciiScrambleText>EPOCHS &amp; TIMELINE</AsciiScrambleText>
            </h2>
          </div>
          <div className="text-[11px] text-neutral-500 font-mono mt-1 sm:mt-0">
            CHRONICLE :: SYSTEM PHASES
          </div>
        </div>

        {/* Epoch timeline items */}
        <div className="space-y-4">
          {epochs.map((epoch) => {
            const isExpanded = expandedEpoch === epoch.id;
            const isCurrent = epoch.status === 'current';

            return (
              <AsciiHoverCard
                key={epoch.id}
                className={`border transition-all ${
                  isCurrent
                    ? 'border-neutral-700 bg-[#0c0c0c]/90'
                    : 'border-neutral-900 bg-[#080808]/70 hover:border-neutral-800'
                }`}
              >
                <button
                  onClick={() => setExpandedEpoch(isExpanded ? '' : epoch.id)}
                  className="w-full p-4 sm:p-5 flex flex-wrap items-center justify-between text-left gap-3 focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 font-mono">
                    <span
                      className={`text-xs px-2 py-0.5 border ${
                        isCurrent
                          ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                          : epoch.status === 'completed'
                          ? 'border-neutral-800 bg-neutral-900 text-neutral-400'
                          : 'border-neutral-800 text-neutral-600'
                      }`}
                    >
                      {epoch.tag}
                    </span>

                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-neutral-100">
                      <AsciiScrambleText speed={25}>{epoch.title}</AsciiScrambleText>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-neutral-500">{epoch.period}</span>
                    <span className="text-neutral-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-neutral-900/80 font-mono text-xs text-neutral-400">
                    <p className="leading-relaxed text-neutral-300 max-w-3xl mb-4">
                      {epoch.description}
                    </p>

                    <div className="border border-neutral-900 bg-black/60 p-4">
                      <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">
                        RECORDED MILESTONES &amp; DELIVERABLES
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300">
                        {epoch.milestones.map((m, mIdx) => (
                          <div key={mIdx} className="flex items-start gap-2">
                            <span className="text-neutral-600">&gt;</span>
                            <span className="hover:text-white transition-colors">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </AsciiHoverCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
