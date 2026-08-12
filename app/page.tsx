import Image from "next/image";

const links = {
  paper: "https://arxiv.org/abs/2607.06107",
  pdf: "https://arxiv.org/pdf/2607.06107",
  docs: "https://usc-nsl.gitbook.io/ddb",
  quickstart: "https://usc-nsl.gitbook.io/ddb/getting-started/quickstart",
  source: "https://github.com/USC-NSL-DDB/DDB",
  discord: "https://discord.gg/wN9xs7aaPy",
};

const Arrow = () => <span aria-hidden="true">↗</span>;

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="DDB home">
      <span className="wordmark-mark" aria-hidden="true">
        <Image src="/ddb-logo.png" alt="" width={400} height={400} unoptimized />
      </span>
      <span>DDB</span>
    </a>
  );
}

function ThemeToggle() {
  return (
    <button className="theme-toggle" type="button" aria-label="Toggle color theme" data-theme-toggle>
      <span className="theme-icon theme-icon-sun" aria-hidden="true">☼</span>
      <span className="theme-icon theme-icon-moon" aria-hidden="true">◐</span>
    </button>
  );
}

function HeroExplainer() {
  return (
    <div className="backtrace-visual" aria-label="DDB presents one distributed call stack across an RPC boundary">
      <div className="backtrace-head">
        <div>
          <span>Distributed Backtrace</span>
          <strong>One stack. Across services.</strong>
        </div>
        <span className="safe-pause"><i /> Paused safely</span>
      </div>
      <div className="request-path" aria-label="Request path from raft node zero to raft node one">
        <div className="process-chip">
          <small>Caller</small>
          <strong>raft_node_0</strong>
        </div>
        <div className="rpc-hop" aria-hidden="true">
          <i />
          <span>AppendEntries RPC</span>
          <b>→</b>
        </div>
        <div className="process-chip process-chip-active">
          <small>Callee</small>
          <strong>raft_node_1</strong>
        </div>
      </div>
      <div className="stack-header"><span>Unified call stack</span><span>Process</span></div>
      <ol className="unified-stack">
        <li className="current"><b>00</b><code>RaftService::AppendEntries</code><em>raft_node_1</em></li>
        <li><b>01</b><code>RpcMethod::RunHandler</code><em>raft_node_1</em></li>
        <li className="rpc-boundary"><span>RPC boundary crossed</span><em>caller context restored</em></li>
        <li><b>02</b><code>Raft::send_append_entries_rpc</code><em>raft_node_0</em></li>
        <li><b>03</b><code>Raft::send_heartbeat</code><em>raft_node_0</em></li>
      </ol>
      <div className="backtrace-foot">
        <span><i /> Remote caller frame</span>
        <p>Inspect arguments and runtime state across the boundary.</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <div className="nav-wrap">
          <Wordmark />
          <nav aria-label="Primary navigation">
            <a href="#approach">Approach</a>
            <a href="#results">Results</a>
            <a href="#frameworks">Frameworks</a>
            <a href={links.docs}>Docs <Arrow /></a>
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="github-link" href={links.source}>GitHub <Arrow /></a>
          </div>
        </div>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy">
          <a className="eyebrow" href={links.source}>
            <span>Source available on GitHub</span>
            <Arrow />
          </a>
          <h1>Debug beyond the <span>process boundary.</span></h1>
          <p className="hero-lede">
            DDB brings source-level interactive debugging to distributed applications—so you can pause a cluster, follow a call stack across RPCs, and inspect live state in remote callers.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={links.quickstart}>Get started <span>→</span></a>
            <a className="button button-secondary" href={links.source}>View on GitHub <Arrow /></a>
          </div>
          <p className="hero-note">USC Networked Systems Lab · <a href={links.paper}>Read the paper <Arrow /></a></p>
        </div>
        <div className="hero-visual-wrap">
          <HeroExplainer />
        </div>
      </section>

      <section className="proof-strip" id="results" aria-labelledby="results-heading">
        <div className="section-shell">
          <div className="proof-intro">
            <span className="kicker">Measured performance</span>
            <h2 id="results-heading">Interactive at distributed scale.</h2>
          </div>
          <div className="metrics">
            <div><strong>30<span> ms</span></strong><p>median cross-RPC backtrace latency</p></div>
            <div><strong>1–5<span>%</span></strong><p>throughput overhead in evaluated systems</p></div>
            <div><strong>122</strong><p>processes in the largest evaluation</p></div>
            <div><strong>100<span>%</span></strong><p>fault localization across controlled study trials</p></div>
          </div>
          <p className="metric-context">Evaluation results from the DDB paper. Workloads, baselines, methodology, and study details are reported in Sections 5–6.</p>
        </div>
      </section>

      <section className="approach section-shell" id="approach">
        <div className="section-heading split-heading">
          <div>
            <span className="kicker">One debugging model</span>
            <h2>Three hard problems.<br />Three targeted mechanisms.</h2>
          </div>
          <p>Distributed execution breaks the single-process debugger in predictable ways. DDB addresses each one directly, while preserving a familiar source-level workflow.</p>
        </div>
        <div className="pillars">
          <article className="pillar pillar-blue">
            <div className="pillar-top"><span>01</span><div className="pillar-symbol dbt-symbol" aria-hidden="true"><i /><i /><i /></div></div>
            <h3>Distributed Backtrace</h3>
            <p>Compact caller-context metadata travels with each RPC. When execution pauses, DDB reconstructs one call stack across process boundaries and makes remote frames inspectable.</p>
            <span className="pillar-detail">Cross-RPC stack reconstruction</span>
          </article>
          <article className="pillar pillar-violet">
            <div className="pillar-top"><span>02</span><div className="pillar-symbol intent-symbol" aria-hidden="true"><i /><i /><i /><i /></div></div>
            <h3>Intent-Preserving Control</h3>
            <p>Set a breakpoint against a logical service scope. The control plane applies that intent to matching replicas—including processes that join, restart, or receive migrated computation.</p>
            <span className="pillar-detail">Breakpoints that follow the topology</span>
          </article>
          <article className="pillar pillar-amber">
            <div className="pillar-top"><span>03</span><div className="pillar-symbol pet-symbol" aria-hidden="true"><i /><b /></div></div>
            <h3>Pause-Erased Time</h3>
            <p>DDB virtualizes each attached process&apos;s view of time during global pauses, preventing application-level timeouts and timers inside the attached cluster from cascading.</p>
            <span className="pillar-detail">Safe human-speed inspection</span>
          </article>
        </div>
      </section>

      <section className="product-showcase">
        <div className="section-shell product-grid">
          <div className="product-copy">
            <span className="kicker">A familiar workflow</span>
            <h2>Stay in the debugger.<br />See the whole request.</h2>
            <p>DDB&apos;s VS Code frontend coordinates the cluster while keeping the interactions developers already know: breakpoints, call stacks, stepping, expression evaluation, and variable inspection.</p>
            <ul className="feature-list">
              <li><i /> Set one breakpoint across matching replicas</li>
              <li><i /> Navigate from a callee to remote caller frames</li>
              <li><i /> Inspect runtime state in the selected process</li>
              <li><i /> Single-step one process while the cluster stays paused</li>
            </ul>
            <a className="text-link" href={links.quickstart}>Walk through the gRPC example <span>→</span></a>
          </div>
          <figure className="product-figure">
            <Image unoptimized width={1800} height={955} src="/ddb-vscode-raft.png" alt="DDB in VS Code, showing breakpoints, runtime expression evaluation, execution controls, and caller and callee frames across a Raft cluster." />
          </figure>
        </div>
      </section>

      <section className="frameworks section-shell" id="frameworks">
        <div className="section-heading centered-heading">
          <span className="kicker">Framework support</span>
          <h2>Integrate once.<br />Debug across services.</h2>
          <p>DDB currently provides integrations for four RPC and distributed programming frameworks across C++ and Go.</p>
        </div>
        <div className="framework-list">
          <div><span className="framework-mark">g</span><strong>gRPC</strong><small>C++ · ≈20 LoC integration</small></div>
          <div><span className="framework-mark">S</span><strong>ServiceWeaver</strong><small>Go · ≈10 LoC integration</small></div>
          <div><span className="framework-mark">N</span><strong>Nu</strong><small>C++ · ≈30 LoC integration</small></div>
          <div><span className="framework-mark">Q</span><strong>Quicksand</strong><small>C++ · ≈60 LoC integration</small></div>
        </div>
      </section>

      <section className="scope-section section-shell">
        <div className="scope-card">
          <div>
            <span className="kicker">Current compatibility</span>
            <h2>Built for distributed development workflows.</h2>
          </div>
          <div className="scope-copy">
            <p>DDB currently targets Linux on x86_64, with experimental aarch64 support, and uses GDB underneath. Pause-Erased Time covers POSIX time APIs inside the attached cluster.</p>
            <p>Time-sensitive external services still observe real pauses, and interleaving-dependent concurrency bugs are outside the scope of pause-based debugging.</p>
            <a className="text-link" href={`${links.pdf}#page=8`}>See compatibility details <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="cta-section section-shell">
        <div className="cta-card">
          <div className="cta-grid" aria-hidden="true"><i /><i /><i /></div>
          <span className="kicker">Start with a real call chain</span>
          <h2>From local frames to<br />distributed context.</h2>
          <p>Install DDB, attach the VS Code extension, and follow the documented gRPC Hello World walkthrough.</p>
          <div className="hero-actions cta-actions">
            <a className="button button-light" href={links.quickstart}>Open the quickstart <span>→</span></a>
            <a className="button button-dark" href={links.source}>Explore the source <Arrow /></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="section-shell footer-grid">
          <div><Wordmark /><p>Source-level interactive debugging<br />for distributed applications.</p></div>
          <div className="footer-links"><span>Project</span><a href={links.paper}>Paper</a><a href={links.docs}>Documentation</a><a href={links.source}>Source code</a></div>
          <div className="footer-links"><span>Community</span><a href={links.discord}>Discord</a><a href="https://nsl.usc.edu/">USC NSL</a></div>
          <p className="footer-note">Performance and user-study figures on this page are sourced from the DDB paper, arXiv:2607.06107.</p>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{__html: `(function(){var r=document.documentElement,b=document.querySelector('[data-theme-toggle]');function s(t){r.dataset.theme=t;localStorage.setItem('ddb-theme',t)}var saved=localStorage.getItem('ddb-theme');if(saved)s(saved);if(b)b.addEventListener('click',function(){s(r.dataset.theme==='dark'?'light':'dark')});})();`}} />
    </main>
  );
}
