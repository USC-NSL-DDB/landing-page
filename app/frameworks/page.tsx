import type { Metadata } from "next";
import { Arrow, links, SiteFooter, SiteHeader, ThemeScript } from "../site";

export const metadata: Metadata = {
  title: "Framework Integrations — DDB",
  description: "Explore the RPC and distributed programming frameworks supported by DDB, and learn how to contribute another integration.",
};

const integrations = [
  { name: "gRPC", language: "C++", size: "≈20 LoC", href: links.grpc },
  { name: "ServiceWeaver", language: "Go", size: "≈10 LoC" },
  { name: "Nu", language: "C++", size: "≈30 LoC", href: links.nu },
  { name: "Quicksand", language: "C++", size: "≈60 LoC", href: links.quicksand },
];

export default function FrameworksPage() {
  return (
    <main id="top" className="integrations-page">
      <SiteHeader />

      <section className="integrations-hero section-shell">
        <div>
          <span className="kicker">Framework integrations</span>
          <h1>Bring DDB to your distributed stack.</h1>
        </div>
        <div className="integrations-hero-copy">
          <p>DDB currently integrates with four RPC and distributed programming frameworks across C++ and Go. Each integration connects the framework&apos;s communication path to DDB&apos;s distributed debugging model.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#supported">View current support <span>↓</span></a>
            <a className="button button-secondary" href="#contribute">Contribute an integration <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="integration-catalog" id="supported" aria-labelledby="supported-heading">
        <div className="section-shell">
          <div className="catalog-heading">
            <div>
              <span className="kicker">Supported today</span>
              <h2 id="supported-heading">Four working integrations.</h2>
            </div>
            <p>Approximate integration size refers to the framework-specific changes in the current implementation. Repository links open the project-maintained, DDB-enabled framework forks.</p>
          </div>

          <div className="integration-table" role="table" aria-label="Current DDB framework integrations">
            <div className="integration-table-head" role="row">
              <span role="columnheader">Framework</span>
              <span role="columnheader">Language</span>
              <span role="columnheader">Integration</span>
              <span role="columnheader">Source</span>
            </div>
            {integrations.map((integration) => (
              <div className="integration-row" role="row" key={integration.name}>
                <strong role="cell">{integration.name}</strong>
                <span role="cell">{integration.language}</span>
                <span role="cell">{integration.size}</span>
                <span role="cell">
                  {integration.href ? <a href={integration.href}>View enabled fork <Arrow /></a> : <span className="source-unavailable">Integration included with DDB</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contribute-section section-shell" id="contribute" aria-labelledby="contribute-heading">
        <div className="contribute-card">
          <div>
            <span className="kicker">Extend DDB</span>
            <h2 id="contribute-heading">Support another framework.</h2>
          </div>
          <div className="contribute-copy">
            <p>The current integrations are open source, and contributions for additional RPC and distributed programming frameworks are welcome. Use an existing integration as a reference, then connect with the project before beginning substantial changes.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={links.source}>Explore the DDB source <Arrow /></a>
              <a className="button button-secondary" href={links.discord}>Discuss an integration <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="integration-next section-shell">
        <div>
          <span className="kicker">Ready to debug</span>
          <h2>Start with the documented gRPC walkthrough.</h2>
        </div>
        <a className="button button-primary" href={links.quickstart}>Open the quickstart <Arrow /></a>
      </section>

      <SiteFooter />
      <ThemeScript />
    </main>
  );
}
