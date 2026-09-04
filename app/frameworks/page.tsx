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
          <h1>Find your DDB integration.</h1>
        </div>
        <div className="integrations-hero-copy">
          <p>Use a supported framework to connect your application to DDB. Want to add another?</p>
          <a className="text-link" href="#contribute">Contribute an integration <span>→</span></a>
        </div>
      </section>

      <section className="integration-catalog" id="supported" aria-labelledby="supported-heading">
        <div className="section-shell">
          <div className="catalog-heading">
            <div>
              <h2 id="supported-heading">Supported frameworks</h2>
            </div>
            <p>Repository links open the project-maintained framework forks with DDB support.</p>
          </div>

          <div className="integration-table" role="table" aria-label="Current DDB framework integrations">
            <div className="integration-table-head" role="row">
              <span role="columnheader">Framework</span>
              <span role="columnheader">Language</span>
              <span role="columnheader">Integration size*</span>
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
          <p className="catalog-note">* Approximate lines of framework-specific integration code, not application setup steps.</p>
        </div>
      </section>

      <section className="contribute-section section-shell" id="contribute" aria-labelledby="contribute-heading">
        <div className="contribute-card">
          <div>
            <span className="kicker">Extend DDB</span>
            <h2 id="contribute-heading">Support another framework.</h2>
          </div>
          <div className="contribute-copy">
            <p>Contributions for additional frameworks are welcome. Start with an existing integration as a reference, and discuss your framework with the project before beginning substantial changes.</p>
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
          <h2>Try the gRPC walkthrough.</h2>
        </div>
        <a className="button button-primary" href={links.quickstart}>Open the quickstart <Arrow /></a>
      </section>

      <SiteFooter />
      <ThemeScript />
    </main>
  );
}
