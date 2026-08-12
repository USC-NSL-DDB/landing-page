import Image from "next/image";

const links = {
  paper: "https://arxiv.org/abs/2607.06107",
  pdf: "https://arxiv.org/pdf/2607.06107",
  docs: "https://usc-nsl.gitbook.io/ddb",
  quickstart: "https://usc-nsl.gitbook.io/ddb/getting-started/quickstart",
  source: "https://github.com/USC-NSL-DDB/DDB",
  grpc: "https://github.com/USC-NSL-DDB/grpc",
  nu: "https://github.com/USC-NSL-DDB/Nu",
  quicksand: "https://github.com/USC-NSL-DDB/Quicksand",
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
    <div className="backtrace-visual" aria-label="DDB follows one request across two services and keeps both sides in one debugging session">
      <div className="demo-heading">
        <div>
          <span>One request · two services</span>
          <strong>Follow the call across the RPC.</strong>
        </div>
        <span className="safe-pause"><i /> Cluster paused</span>
      </div>
      <div className="service-flow" aria-label="A request travels from a caller service to a callee service">
        <div className="service-node">
          <small>Caller</small>
          <strong>Service A</strong>
        </div>
        <div className="rpc-bridge" aria-hidden="true">
          <span>RPC</span>
          <i />
          <b>→</b>
        </div>
        <div className="service-node service-node-active">
          <small>Callee</small>
          <strong>Service B</strong>
        </div>
      </div>
      <div className="debug-result">
        <span className="result-kicker"><i /> DDB keeps the context</span>
        <strong>One debugging flow,<br />on both sides.</strong>
        <div className="frame-pair" aria-label="Caller and callee frames in one debugging flow">
          <span>Caller frame</span>
          <b aria-hidden="true">↔</b>
          <span>Callee frame</span>
        </div>
        <p>Step across the boundary and inspect live state without switching tools.</p>
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
          <h1>Debug beyond the <span>process boundary.</span></h1>
          <p className="hero-lede">
            DDB brings a single-process-like interactive debugging experience to distributed applications—one session to pause the cluster, follow a request across RPCs, and inspect live state.
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

      <section className="value-section" aria-labelledby="value-heading">
        <div className="section-shell value-grid">
          <div className="value-intro">
            <span className="kicker">DDB at a glance</span>
            <h2 id="value-heading">One debugger.<br />A distributed application.</h2>
            <p>DDB replaces a process-by-process workflow with one source-level debugging experience for the application as a whole.</p>
          </div>
          <div className="value-list">
            <article>
              <span>01</span>
              <div><h3>Unified control</h3><p>Coordinate debugger commands and breakpoints across matching processes from one session.</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h3>Natural reasoning</h3><p>Follow the request across services and inspect live state on either side of an RPC.</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h3>Faster debugging cycles</h3><p>Pause, inspect, and continue without repeatedly adding instrumentation and redeploying to reveal more state.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="proof-strip" id="results" aria-labelledby="results-heading">
        <div className="section-shell">
          <div className="proof-intro">
            <span className="kicker">Measured performance*</span>
            <h2 id="results-heading">Interactive at distributed scale.</h2>
          </div>
          <div className="metrics">
            <div><strong>30<span> ms</span></strong><p>median cross-RPC backtrace latency</p></div>
            <div className="metric-with-baseline"><strong>1–5<span>%</span><sup>†</sup></strong><p>throughput overhead in evaluated systems</p><span className="metric-baseline">† GDB baseline</span></div>
            <div><strong>122</strong><p>processes in the largest evaluation</p></div>
            <div><strong>100<span>%</span></strong><p>fault localization across controlled study trials</p></div>
          </div>
          <p className="metric-context"><span>* Evaluation results from the DDB paper. Workloads, baselines, methodology, and study details are reported in Sections 5–6.</span><span>† Compared with attaching GDB as a conventional single-process debugger.</span></p>
        </div>
      </section>

      <section className="approach section-shell" id="approach">
        <div className="section-heading split-heading">
          <div>
            <span className="kicker">How it works</span>
            <h2>Three mechanisms.<br />One familiar workflow.</h2>
          </div>
          <p>DDB extends familiar debugger behavior across RPC boundaries, changing process topologies, and debugger-induced pauses.</p>
        </div>
        <div className="pillars">
          <article className="pillar pillar-blue">
            <div className="pillar-top"><span>01</span><div className="pillar-symbol dbt-symbol" aria-hidden="true"><i /><i /><i /></div></div>
            <h3>Distributed Backtrace</h3>
            <p>Move from the current callee back into remote caller frames as one call stack, with runtime state available in the selected process.</p>
            <span className="pillar-detail">One call stack across RPCs</span>
          </article>
          <article className="pillar pillar-violet">
            <div className="pillar-top"><span>02</span><div className="pillar-symbol intent-symbol" aria-hidden="true"><i /><i /><i /><i /></div></div>
            <h3>Intent-Preserving Control</h3>
            <p>Target a logical service. DDB keeps that breakpoint applied to matching replicas as processes join, restart, or receive migrated computation.</p>
            <span className="pillar-detail">Debug intent follows the topology</span>
          </article>
          <article className="pillar pillar-amber">
            <div className="pillar-top"><span>03</span><div className="pillar-symbol pet-symbol" aria-hidden="true"><i /><b /></div></div>
            <h3>Pause-Erased Time</h3>
            <p>Inspect at human speed while DDB hides global debugger pauses from supported POSIX time APIs inside the attached cluster.</p>
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
          <a href={links.grpc} aria-label="Open the DDB-enabled gRPC repository"><span className="framework-mark">g</span><strong>gRPC</strong><small>C++ · ≈20 LoC integration</small><span className="framework-repo">DDB repository <Arrow /></span></a>
          <div><span className="framework-mark">S</span><strong>ServiceWeaver</strong><small>Go · ≈10 LoC integration</small></div>
          <a href={links.nu} aria-label="Open the DDB-enabled Nu repository"><span className="framework-mark">N</span><strong>Nu</strong><small>C++ · ≈30 LoC integration</small><span className="framework-repo">DDB repository <Arrow /></span></a>
          <a href={links.quicksand} aria-label="Open the DDB-enabled Quicksand repository"><span className="framework-mark">Q</span><strong>Quicksand</strong><small>C++ · ≈60 LoC integration</small><span className="framework-repo">DDB repository <Arrow /></span></a>
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
