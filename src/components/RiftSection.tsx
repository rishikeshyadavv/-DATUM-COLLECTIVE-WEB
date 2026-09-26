import React, { useState, useEffect } from 'react';
import bannerSvg from '../assets/banner.svg';
import { AsciiScrambleText, AsciiHoverCard } from './AsciiEffects';
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  GitBranch,
  Star,
  Tag,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { GitHubRepoData } from '../lib/github';

interface RiftSectionProps {
  githubData: GitHubRepoData;
}

export const RiftSection: React.FC<RiftSectionProps> = ({ githubData }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [activeTerminalTab, setActiveTerminalTab] = useState<'run' | 'diff' | 'config'>('run');

  // Interactive step definitions mapping to RIFT's agent modes
  const steps = [
    {
      id: '01',
      title: 'PLAN',
      tag: 'ARCHITECTURE & INTENT',
      desc: 'Understand the codebase, inspect relevant files, and construct an execution plan before touching code.',
      cmd: 'rift plan --task "Fix flaky test in async message dispatch"',
      output: [
        '→ Ingesting repository context...',
        '→ Analyzing git diff against origin/main',
        '→ Mapped dependency graph: 14 files affected',
        '→ Identifying potential race condition in src/dispatch.ts:84',
        '✓ Execution plan drafted: 3 targeted modifications',
      ],
      detail: 'Analyzes project AST, dependencies, and git history to identify root causes instead of superficial edits.',
    },
    {
      id: '02',
      title: 'EXECUTE',
      tag: 'SYNTHESIS & EDIT',
      desc: 'Makes precision modifications across the codebase, maintaining project conventions and strict type safety.',
      cmd: 'rift execute --apply-plan',
      output: [
        '→ Updating src/dispatch.ts [lines 82-96]',
        '→ Modifying tests/dispatch.test.ts [lines 40-58]',
        '→ Checking AST integrity for 2 files...',
        '✓ Code modifications written to disk without breaking changes',
      ],
      detail: 'Atomic file edits, automatic rollback on syntax parse failures, and git working directory isolation.',
    },
    {
      id: '03',
      title: 'REVIEW',
      tag: 'REAL-WORLD VALIDATION',
      desc: 'Runs the real test suite, linters, and headless browser sessions instead of hallucinating success.',
      cmd: 'rift review --suite full',
      output: [
        '→ Running: npm run lint',
        '  ✔ Clean - 0 errors, 0 warnings',
        '→ Running: npm test -- tests/dispatch.test.ts',
        '  FAIL: tests/dispatch.test.ts > handles backpressure under load',
        '  Expected: 200, Received: 429',
        '→ Found 1 failing test case in backpressure simulation.',
        '⚠ Flagging discrepancy for immediate automated remediation',
      ],
      detail: 'Executes actual test binaries, captures terminal stderr/stdout, and flags unsupported claims against git diff.',
    },
    {
      id: '04',
      title: 'IMPROVE',
      tag: 'CLOSED-LOOP REPAIR',
      desc: 'Fixes identified failures, re-executes tests until verification passes, and checks browser console for errors.',
      cmd: 'rift fix --failing-tests',
      output: [
        '→ Adjusting backpressure queue buffer threshold...',
        '→ Re-running test suite: tests/dispatch.test.ts',
        '  PASS: tests/dispatch.test.ts (4.1s)',
        '→ Launching headless browser verification on port 3000...',
        '  ✔ Zero console errors captured',
        '  ✔ Verified rendering state and interaction responsiveness',
        '✓ ALL CHECKS PASSED. Ready for commit.',
      ],
      detail: 'Self-healing iteration loop. Never marks a task complete until runtime verification passes 100%.',
    },
  ];

  // Auto-play through steps with manual pause override
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const installCommand =
    'curl -fsSL https://raw.githubusercontent.com/Datum-Collective/RIFT-coding-agent/main/opencode/install | bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="projects"
      className="relative w-full border-t border-b border-[#2b2b2b] bg-[#090909] text-[#e8e6df] pt-14 pb-20 select-text overflow-hidden"
    >
      {/* Halftone and grid background texture from the poster */}
      <div className="absolute inset-0 halftone-overlay opacity-25 pointer-events-none" />
      <div className="absolute inset-0 subtle-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* POSTER HEADER STRIP */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 mb-8 text-[11px] tracking-wider text-neutral-400 uppercase font-mono">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">DATUM COLLECTIVE</span>
            <span className="text-neutral-600">//</span>
            <span>TOOLS FOR A MORE CAPABLE TOMORROW</span>
          </div>

          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="text-neutral-500 hidden sm:inline">+</span>
            <span>OPEN SOURCE BY ENGINEERS, FOR ENGINEERS</span>
            <span className="text-neutral-500">+</span>
          </div>
        </div>

        {/* HERO WORDMARK & GRID ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* LEFT: Dot-matrix / Pixelated style RIFT Wordmark & Tagline */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative">
              <div className="text-[10px] text-neutral-500 font-mono tracking-widest mb-1 flex items-center gap-2">
                <span>++</span>
                <span>PROJECT ID: 01-RIFT</span>
                <span>[VERIFICATION_CORE]</span>
              </div>

              {/* RIFT OFFICIAL BANNER SVG VISUAL FEATURE */}
              <div className="my-4 border border-neutral-800 bg-[#0d1117] p-3 sm:p-4 relative overflow-hidden group shadow-2xl">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 mb-3 text-[10px] font-mono text-neutral-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
                    <span className="text-neutral-300 font-semibold tracking-wider">RIFT_CORE_BANNER :: ASSET_V1</span>
                  </span>
                  <span className="text-neutral-500 border border-neutral-800 px-1.5 py-0.5 bg-black/50">
                    {githubData.latestRelease?.tag || 'v0.1.12'}
                  </span>
                </div>

                <div className="flex justify-center items-center py-2 bg-[#090d13]/70 border border-neutral-900 overflow-hidden">
                  <img
                    src={bannerSvg}
                    alt="RIFT Coding Agent Official Banner"
                    className="w-full max-w-2xl h-auto max-h-36 sm:max-h-44 object-contain filter drop-shadow-[0_0_24px_rgba(0,102,255,0.25)] select-none transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-500">
                  <span>SOURCE: github.com/Datum-Collective/RIFT-coding-agent</span>
                  <span className="text-emerald-400">STATUS: VERIFIED</span>
                </div>
              </div>

              {/* Retro orbit star mark */}
              <div className="absolute top-2 right-4 sm:right-16 text-neutral-500 text-xs font-mono select-none">
                ✦ ✣ ✦
              </div>

              {/* Sub-headline directly from poster */}
              <div className="mt-4 border-l-2 border-white pl-4 py-1">
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#f2efe9]">
                  A CODING AGENT THAT VERIFIES ITS WORK. &gt;_
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
                  The open-source AI coding agent that runs your tests instead of telling you they
                  passed. Built on OpenCode, MIT licensed, engineered for macOS, Linux, and Windows.
                </p>
              </div>
            </div>

            {/* Differentiators & Technical Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-800 text-xs">
              <AsciiHoverCard className="border border-neutral-800 p-3 bg-neutral-950/60 flex flex-col justify-between group">
                <div>
                  <div className="text-[10px] text-neutral-500 mb-1 font-mono uppercase tracking-widest">
                    [01 // EXECUTION]
                  </div>
                  <div className="font-semibold text-neutral-200 mb-1">
                    <AsciiScrambleText speed={25}>Runs Actual Tests</AsciiScrambleText>
                  </div>
                  <div className="text-neutral-400 text-[11px] leading-relaxed">
                    Executes project test, typecheck, and lint binaries, displaying raw stdout instead
                    of simulated claims.
                  </div>
                </div>
              </AsciiHoverCard>

              <AsciiHoverCard className="border border-neutral-800 p-3 bg-neutral-950/60 flex flex-col justify-between group">
                <div>
                  <div className="text-[10px] text-neutral-500 mb-1 font-mono uppercase tracking-widest">
                    [02 // CROSS-CHECK]
                  </div>
                  <div className="font-semibold text-neutral-200 mb-1">
                    <AsciiScrambleText speed={25}>Git Diff Validation</AsciiScrambleText>
                  </div>
                  <div className="text-neutral-400 text-[11px] leading-relaxed">
                    Validates internal summaries directly against `git diff`, rejecting hallucinated or
                    unsupported claims.
                  </div>
                </div>
              </AsciiHoverCard>

              <AsciiHoverCard className="border border-neutral-800 p-3 bg-neutral-950/60 flex flex-col justify-between group">
                <div>
                  <div className="text-[10px] text-neutral-500 mb-1 font-mono uppercase tracking-widest">
                    [03 // BROWSER DRIVE]
                  </div>
                  <div className="font-semibold text-neutral-200 mb-1">
                    <AsciiScrambleText speed={25}>Live Console Intercept</AsciiScrambleText>
                  </div>
                  <div className="text-neutral-400 text-[11px] leading-relaxed">
                    Drives a headless browser instance to trap runtime console exceptions that screenshots
                    cannot detect.
                  </div>
                </div>
              </AsciiHoverCard>
            </div>
          </div>

          {/* RIGHT: Retro Blueprint Metadata / Wireframe Globe / Status */}
          <div className="lg:col-span-4 border border-neutral-800 p-5 bg-[#0c0c0c]/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                  AGENT PIPELINE
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  ONLINE
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs mb-6">
                {['PLAN', 'EXECUTE', 'REVIEW', 'IMPROVE'].map((name, idx) => (
                  <div
                    key={name}
                    className={`flex items-center justify-between p-2 cursor-pointer transition-all ${
                      activeStep === idx
                        ? 'bg-neutral-800 text-white border-l-2 border-white'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                    }`}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-neutral-500 text-[10px]">{`0${idx + 1}`}</span>
                      <span className="font-bold">&gt; {name}</span>
                    </span>
                    {activeStep === idx && (
                      <span className="text-[10px] text-neutral-300 font-mono animate-pulse">
                        [ACTIVE]
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Wireframe Globe representation */}
              <div className="border border-neutral-800/80 p-3 bg-neutral-950 text-center mb-4">
                <pre className="text-[9px] leading-[10px] text-neutral-500 font-mono select-none overflow-hidden">
{`      .---.
    /       \\    r1
   |   ( )   |  +---+ code
   |  /   \\  |  |   | test
    \\       /   +---+ verify
      '---'       |   ship
`}
                </pre>
                <div className="text-[10px] text-neutral-400 font-mono mt-1">
                  VERIFICATION BUILT INTO THE CODING LOOP
                </div>
              </div>
            </div>

            {/* Dynamic GitHub stats live counter */}
            <div className="border-t border-neutral-800 pt-3 flex items-center justify-between text-xs font-mono">
              <a
                href="https://github.com/Datum-Collective/RIFT-coding-agent"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>
                  {githubData.stars !== null ? `${githubData.stars} stars` : '7 stars'}
                </span>
              </a>

              <a
                href={
                  githubData.latestRelease?.url ||
                  'https://github.com/Datum-Collective/RIFT-coding-agent/releases'
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-neutral-500" />
                <span>
                  {githubData.latestRelease?.tag || 'v0.1.12'}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* INTERACTIVE WORKFLOW + LIVE TERMINAL WINDOW (Exact reproduction of poster) */}
        <div className="border border-neutral-800 bg-[#070707] shadow-2xl mb-12">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between bg-[#121212] px-4 py-2.5 border-b border-neutral-800 font-mono text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
              <span className="text-neutral-400 ml-2">~/workspace/rift-agent</span>
            </div>

            <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTerminalTab('run')}
                  className={`px-2 py-0.5 ${
                    activeTerminalTab === 'run' ? 'bg-neutral-800 text-white' : 'hover:text-white'
                  }`}
                >
                  LIVE LOG
                </button>
                <button
                  onClick={() => setActiveTerminalTab('diff')}
                  className={`px-2 py-0.5 ${
                    activeTerminalTab === 'diff' ? 'bg-neutral-800 text-white' : 'hover:text-white'
                  }`}
                >
                  GIT DIFF
                </button>
                <button
                  onClick={() => setActiveTerminalTab('config')}
                  className={`px-2 py-0.5 ${
                    activeTerminalTab === 'config' ? 'bg-neutral-800 text-white' : 'hover:text-white'
                  }`}
                >
                  rift.toml
                </button>
              </div>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span className="text-neutral-500 hidden sm:inline">RIFT _ □ X</span>
            </div>
          </div>

          {/* Interactive Agent Step Indicator Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-neutral-800 text-xs font-mono divide-x divide-neutral-800">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`p-3 text-left transition-colors flex flex-col justify-between ${
                  activeStep === idx
                    ? 'bg-neutral-900 text-white border-b-2 border-white'
                    : 'text-neutral-400 hover:bg-neutral-900/40 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
                  <span>{step.id}</span>
                  <span>{step.title}</span>
                </div>
                <div className="text-[11px] font-semibold text-neutral-200 truncate">
                  {step.tag}
                </div>
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-xs min-h-[280px] bg-black/90 flex flex-col justify-between">
            {activeTerminalTab === 'run' && (
              <div>
                <div className="flex items-center gap-2 text-neutral-400 mb-3 pb-2 border-b border-neutral-900">
                  <span className="text-emerald-400">&gt;</span>
                  <span className="text-neutral-100 font-semibold">{steps[activeStep].cmd}</span>
                </div>

                <div className="space-y-2 text-neutral-300">
                  {steps[activeStep].output.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className={`leading-relaxed flex items-start gap-2 ${
                        line.startsWith('FAIL')
                          ? 'text-red-400 font-bold'
                          : line.startsWith('PASS') || line.includes('✔') || line.includes('All tests')
                          ? 'text-emerald-400'
                          : line.startsWith('⚠')
                          ? 'text-amber-400'
                          : line.startsWith('✓')
                          ? 'text-white font-bold bg-neutral-900/80 px-2 py-1 inline-block'
                          : 'text-neutral-300'
                      }`}
                    >
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTerminalTab === 'diff' && (
              <div className="space-y-1 font-mono text-xs">
                <div className="text-neutral-500">diff --git a/src/dispatch.ts b/src/dispatch.ts</div>
                <div className="text-neutral-500">--- a/src/dispatch.ts</div>
                <div className="text-neutral-500">+++ b/src/dispatch.ts</div>
                <div className="text-cyan-400">@@ -82,7 +82,9 @@ export class DispatchWorker &#123;</div>
                <div className="text-red-400">-    if (this.queue.length &gt; 100) return 429;</div>
                <div className="text-emerald-400">+    if (this.queue.isSaturated()) &#123;</div>
                <div className="text-emerald-400">+      await this.backoffAndDrain(this.retryPolicy);</div>
                <div className="text-emerald-400">+    &#125;</div>
                <div className="text-neutral-400">     return this.processNextBatch();</div>
              </div>
            )}

            {activeTerminalTab === 'config' && (
              <div className="space-y-1 font-mono text-neutral-300 text-xs">
                <div className="text-neutral-500"># rift.toml — datum verification specification</div>
                <div><span className="text-neutral-400">[agent]</span></div>
                <div>strict_mode = <span className="text-emerald-400">true</span></div>
                <div>require_clean_git_diff = <span className="text-emerald-400">true</span></div>
                <div>test_command = <span className="text-amber-300">"npm test -- --bail"</span></div>
                <div>browser_eval = <span className="text-emerald-400">true</span></div>
                <div className="mt-2"><span className="text-neutral-400">[feedback_loop]</span></div>
                <div>max_iterations = <span className="text-purple-400">5</span></div>
                <div>auto_rollback_on_test_failure = <span className="text-emerald-400">true</span></div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between border-t border-neutral-900 pt-4 mt-6 text-[11px] text-neutral-500">
              <div className="flex items-center gap-3">
                <span>STAGE: {steps[activeStep].title}</span>
                <span>//</span>
                <span className="text-neutral-400">{steps[activeStep].detail}</span>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1 px-2 py-1 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white"
                >
                  {isPlaying ? (
                    <>
                      <RotateCcw className="w-3 h-3" />
                      <span>PAUSE LOOP</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span>AUTO LOOP</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* INSTALLATION COMMAND BLOCK */}
        <div className="border border-neutral-800 bg-[#0d0d0d] p-5 mb-12">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>GET STARTED :: CLI INSTALLATION</span>
            <span className="text-neutral-600">SHELL / BASH</span>
          </div>

          <div className="flex items-center justify-between bg-black border border-neutral-800 p-3 overflow-x-auto gap-4">
            <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-neutral-200 whitespace-nowrap">
              <span className="text-neutral-500 select-none">$</span>
              <code>{installCommand}</code>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-mono transition-colors shrink-0"
              title="Copy install command"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-3 text-[11px] text-neutral-500 font-mono">
            <span>Requires curl, bash. Supports macOS arm64/x64, Linux, and WSL2.</span>
            <a
              href="https://github.com/Datum-Collective/RIFT-coding-agent"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-neutral-400 hover:text-white underline underline-offset-2 transition-colors mt-1 sm:mt-0"
            >
              <span>View RIFT repository on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 4-COLUMN NUMBERED FOOTER STRIP (01 - 04) EXACTLY AS POSTER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-neutral-800 pt-8 mb-10">
          <AsciiHoverCard className="border border-neutral-800/90 p-4 bg-black/60 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
                <span className="font-bold text-white">01</span>
                <span className="text-neutral-600 group-hover:text-neutral-300">+</span>
              </div>
              <div className="h-16 flex items-center justify-center my-2 border border-neutral-900 bg-neutral-950">
                <pre className="text-[9px] text-neutral-500 font-mono text-center">
{`[ === CODE === ]
     ▼     ▲
[ === DIFF === ]`}
                </pre>
              </div>
              <div className="text-xs font-semibold text-neutral-200 uppercase tracking-tight mt-2">
                <AsciiScrambleText speed={25}>Builds Real Changes</AsciiScrambleText>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Across your entire codebase with full AST and dependency awareness.
              </div>
            </div>
            <div className="text-neutral-500 text-xs font-mono mt-3">&gt;_</div>
          </AsciiHoverCard>

          <AsciiHoverCard className="border border-neutral-800/90 p-4 bg-black/60 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
                <span className="font-bold text-white">02</span>
                <span className="text-neutral-600 group-hover:text-neutral-300">+</span>
              </div>
              <div className="h-16 flex items-center justify-center my-2 border border-neutral-900 bg-neutral-950">
                <pre className="text-[9px] text-neutral-500 font-mono text-center">
{`   ( ( ( O ) ) )
     VALIDATE
`}
                </pre>
              </div>
              <div className="text-xs font-semibold text-neutral-200 uppercase tracking-tight mt-2">
                <AsciiScrambleText speed={25}>Tests and Validates</AsciiScrambleText>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Executes test binaries and validates output instead of trusting self-predictions.
              </div>
            </div>
            <div className="text-neutral-500 text-xs font-mono mt-3">&gt;_</div>
          </AsciiHoverCard>

          <AsciiHoverCard className="border border-neutral-800/90 p-4 bg-black/60 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
                <span className="font-bold text-white">03</span>
                <span className="text-neutral-600 group-hover:text-neutral-300">+</span>
              </div>
              <div className="h-16 flex items-center justify-center my-2 border border-neutral-900 bg-neutral-950">
                <pre className="text-[9px] text-neutral-500 font-mono text-center">
{`[!] ISSUE DETECTED
  ↳ REPAIR & RETRY`}
                </pre>
              </div>
              <div className="text-xs font-semibold text-neutral-200 uppercase tracking-tight mt-2">
                <AsciiScrambleText speed={25}>Fixes Issues and Improves</AsciiScrambleText>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Feeds compiler, lint, and test errors straight back into self-healing correction loops.
              </div>
            </div>
            <div className="text-neutral-500 text-xs font-mono mt-3">&gt;_</div>
          </AsciiHoverCard>

          <AsciiHoverCard className="border border-neutral-800/90 p-4 bg-black/60 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
                <span className="font-bold text-white">04</span>
                <span className="text-neutral-600 group-hover:text-neutral-300">+</span>
              </div>
              <div className="h-16 flex items-center justify-center my-2 border border-neutral-900 bg-neutral-950">
                <pre className="text-[9px] text-neutral-500 font-mono text-center">
{`[ PRODUCTION BUILD ]
      STATUS: OK`}
                </pre>
              </div>
              <div className="text-xs font-semibold text-neutral-200 uppercase tracking-tight mt-2">
                <AsciiScrambleText speed={25}>Production-Ready Output</AsciiScrambleText>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Verified changes you can merge and ship to production with high confidence.
              </div>
            </div>
            <div className="text-neutral-500 text-xs font-mono mt-3">&gt;_</div>
          </AsciiHoverCard>
        </div>

        {/* SECTION FOOTER COLOPHON */}
        <div className="border-t border-neutral-800 pt-4 flex flex-wrap items-center justify-between text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-neutral-300 font-bold">RIFT</span>
            <span>—</span>
            <span>A DATUM COLLECTIVE PROJECT</span>
          </div>

          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a
              href="https://github.com/Datum-Collective/RIFT-coding-agent"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <span>github.com/Datum-Collective/RIFT-coding-agent</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">OPEN SOURCE // MIT LICENSE</span>
          </div>
        </div>

      </div>
    </section>
  );
};
