import Image from "next/image";
import { Arrow, links, localHref, SiteFooter, SiteHeader, ThemeScript } from "./site";

function HeroExplainer() {
  return (
    <figure className="backtrace-visual" aria-label="Illustration of one DDB call stack connecting a caller and callee across an RPC">
      <div className="demo-heading"><span className="kicker">One debugging session</span><span className="safe-pause"><i /> Cluster paused</span></div>
      <div className="call-chain">
        <div className="service-node"><span className="chain-dot" aria-hidden="true" /><div><small>Caller</small><strong>Service A</strong></div><span className="frame-label">Caller frame</span></div>
        <div className="rpc-bridge"><span>Across the RPC</span></div>
        <div className="service-node service-node-active"><span className="chain-dot" aria-hidden="true" /><div><small>Callee</small><strong>Service B</strong></div><span className="frame-label">Paused here</span></div>
      </div>
      <figcaption>Inspect both sides of a request in one call stack.</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <main id="top">
      <SiteHeader home />
      <section className="hero section-shell">
        <div className="hero-copy">
          <h1>Debug beyond the <span>process boundary.</span></h1>
          <p className="hero-lede">Debug a distributed application from one session. Pause the cluster, follow a request across services, and inspect live state.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={links.quickstart}>Get started <span>→</span></a>
            <a className="button button-secondary" href={links.source}>View on GitHub <Arrow /></a>
          </div>
          <p className="hero-note">USC Networked Systems Lab · <a href={links.paper}>Read the paper <Arrow /></a></p>
        </div>
        <HeroExplainer />
      </section>

      <section className="product-showcase" id="why-ddb" aria-labelledby="product-heading">
        <div className="section-shell">
          <div className="section-heading split-heading product-heading">
            <div><span className="kicker">DDB in VS Code</span><h2 id="product-heading">One debugger.<br />The whole application.</h2></div>
            <div><p>Keep the breakpoints, stepping, and variable inspection you know. DDB connects them across processes, so you can inspect a request without repeatedly adding logs and redeploying.</p><a className="text-link" href={links.quickstart}>Walk through the gRPC example <span>→</span></a></div>
          </div>
          <figure className="product-figure">
            {/* Source: Figure 3 of the DDB paper. Preserve the full image and annotations.
                A future replacement should be a real DDB session, not a mock UI. */}
            <a href={localHref("/ddb-vscode-raft.png")} target="_blank" rel="noreferrer" aria-label="Open the DDB screenshot at full size">
              <Image unoptimized width={1800} height={955} src="/ddb-vscode-raft.png" alt="DDB in VS Code, showing breakpoints, runtime expression evaluation, execution controls, and caller and callee frames across a Raft cluster." />
            </a>
            <figcaption><span>A distributed debugging session in VS Code.</span><a href={localHref("/ddb-vscode-raft.png")} target="_blank" rel="noreferrer">View full size <Arrow /></a></figcaption>
          </figure>
          <div className="product-benefits">
            <article><h3>Control the cluster</h3><p>Set a breakpoint across matching replicas. Single-step one process while the cluster stays paused.</p></article>
            <article><h3>Follow the request</h3><p>Navigate from the callee to remote caller frames in one distributed call stack.</p></article>
            <article><h3>Inspect live state</h3><p>Evaluate expressions and inspect variables in the selected process, directly in your debugger.</p></article>
          </div>
        </div>
      </section>

      <section className="proof-strip" id="results" aria-labelledby="results-heading">
        <div className="section-shell">
          <div className="proof-intro"><span className="kicker">Measured performance*</span><h2 id="results-heading">Interactive at distributed scale.</h2></div>
          <div className="metrics">
            <div><strong>30<span> ms</span></strong><p>median cross-RPC backtrace latency</p></div>
            <div><strong>1–5<span>%</span><sup>†</sup></strong><p>throughput overhead in evaluated systems<span className="metric-baseline">vs. GDB baseline</span></p></div>
            <div><strong>122</strong><p>processes in the largest evaluation</p></div>
            <div><strong>100<span>%</span></strong><p>fault localization across controlled study trials</p></div>
          </div>
          <p className="metric-context"><span>* Results from the <a href={links.paper}>DDB paper, Sections 5–6</a>. See the paper for workloads and study methodology.</span><span>† Compared with attaching GDB as a conventional single-process debugger.</span></p>
        </div>
      </section>

      <section className="approach section-shell" id="approach" aria-labelledby="approach-heading">
        <div className="section-heading split-heading">
          <div><span className="kicker">How it works</span><h2 id="approach-heading">Familiar debugging,<br />across process boundaries.</h2></div>
          <p>Three mechanisms connect the call stack, coordinate breakpoints, and account for time spent paused.</p>
        </div>
        <div className="pillars">
          <article className="pillar pillar-blue">
            <div className="pillar-top"><div className="pillar-symbol dbt-symbol" aria-hidden="true"><i /><i /><i /></div><h3>Distributed Backtrace</h3></div>
            <p>Reconstruct one call stack across RPCs. Move back to remote caller frames and inspect state in the selected process.</p>
          </article>
          <article className="pillar pillar-violet">
            <div className="pillar-top"><div className="pillar-symbol intent-symbol" aria-hidden="true"><i /><i /><i /><i /></div><h3>Intent-Preserving Control</h3></div>
            <p>Set a breakpoint on a logical service. DDB applies it to matching replicas as processes join, restart, or receive migrated computation.</p>
          </article>
          <article className="pillar pillar-amber">
            <div className="pillar-top"><div className="pillar-symbol pet-symbol" aria-hidden="true"><i /><b /></div><h3>Pause-Erased Time</h3></div>
            <p>Hide global debugger pauses from supported POSIX time APIs inside the attached cluster, so inspection does not consume application timeout budgets.</p>
          </article>
        </div>
      </section>

      <section className="frameworks section-shell" id="frameworks" aria-labelledby="framework-heading">
        <div className="section-heading split-heading">
          <div><span className="kicker">Integrations</span><h2 id="framework-heading">Find your framework.</h2></div>
          <p>Four supported RPC and distributed programming frameworks across C++ and Go.</p>
        </div>
        <div className="framework-list">
          <div><strong>gRPC</strong><small>C++</small></div>
          <div><strong>ServiceWeaver</strong><small>Go</small></div>
          <div><strong>Nu</strong><small>C++</small></div>
          <div><strong>Quicksand</strong><small>C++</small></div>
        </div>
        <div className="framework-actions">
          <a className="text-link" href={localHref("/frameworks/")}>Explore framework support <span>→</span></a>
          <a className="text-link" href={localHref("/frameworks/#contribute")}>Contribute an integration <span>→</span></a>
        </div>
        <aside className="scope-card" aria-labelledby="compatibility-heading">
          <div><span className="kicker">Current compatibility</span><h3 id="compatibility-heading">Linux · GDB</h3><a className="text-link" href={`${links.pdf}#page=8`}>Compatibility details <Arrow /></a></div>
          <div className="scope-copy">
            <p>Targets Linux on x86_64, with experimental aarch64 support. Pause-Erased Time covers supported POSIX time APIs inside the attached cluster.</p>
            <p>External services still observe real pauses. Interleaving-dependent concurrency bugs are outside the scope of pause-based debugging.</p>
          </div>
        </aside>
      </section>

      <section className="cta-section section-shell">
        <div className="cta-card">
          <div><span className="kicker">Get started</span><h2>Try DDB on a real request.</h2><p>Install DDB and its VS Code extension, then follow the gRPC Hello World walkthrough.</p></div>
          <a className="button button-light" href={links.quickstart}>Open the quickstart <span>→</span></a>
        </div>
      </section>
      <SiteFooter />
      <ThemeScript />
    </main>
  );
}
