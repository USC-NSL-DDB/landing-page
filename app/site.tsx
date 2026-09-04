import Image from "next/image";

export const links = {
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

const requestedBase = process.env.BASE_PATH ?? "/";
const siteBase = requestedBase === "/" ? "" : `/${requestedBase.replace(/^\/+|\/+$/g, "")}`;
export const localHref = (path: string) => `${siteBase}${path}`;

export const Arrow = () => (
  <svg className="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export function Wordmark({ home = false }: { home?: boolean }) {
  return (
    <a className="wordmark" href={home ? "#top" : localHref("/")} aria-label="DDB home">
      <span className="wordmark-mark" aria-hidden="true">
        <Image src="/ddb-logo.png" alt="" width={400} height={400} unoptimized />
      </span>
      <span>DDB</span>
    </a>
  );
}

export function ThemeToggle() {
  return (
    <button className="theme-toggle" type="button" aria-label="Switch to dark theme" title="Switch to dark theme" data-theme-toggle>
      <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5a8.5 8.5 0 1 0 9.6 9.6Z" />
      </svg>
    </button>
  );
}

export function SiteHeader({ home = false }: { home?: boolean }) {
  const navigation = (
    <>
      <a href={home ? "#why-ddb" : localHref("/#why-ddb")}>Why DDB</a>
      <a href={home ? "#approach" : localHref("/#approach")}>How it works</a>
      <a href={localHref("/frameworks/")}>Integrations</a>
      <a href={links.quickstart}>Get started <Arrow /></a>
    </>
  );
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Wordmark home={home} />
        <nav className="desktop-nav" aria-label="Primary navigation">{navigation}</nav>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="github-link" href={links.source}>GitHub <Arrow /></a>
          <details className="mobile-menu">
            <summary>Menu <span aria-hidden="true">+</span></summary>
            <nav aria-label="Mobile navigation">{navigation}<a href={links.source}>GitHub <Arrow /></a></nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="section-shell footer-grid">
        <div><Wordmark /><p>Source-level interactive debugging<br />for distributed applications.</p></div>
        <div className="footer-links"><span>Project</span><a href={links.paper}>Paper</a><a href={links.docs}>Documentation</a><a href={links.source}>Source code</a></div>
        <div className="footer-links"><span>Community</span><a href={links.discord}>Discord</a><a href="https://nsl.usc.edu/">USC NSL</a></div>
        <p className="footer-note">Performance and user-study figures on this site are sourced from the DDB paper, arXiv:2607.06107.</p>
      </div>
    </footer>
  );
}

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{__html: `(function(){
    var r=document.documentElement,b=document.querySelector('[data-theme-toggle]'),menu=document.querySelector('.mobile-menu');
    function label(){if(b){var text=r.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme';b.setAttribute('aria-label',text);b.title=text}}
    function s(t){r.dataset.theme=t;label();try{localStorage.setItem('ddb-theme',t)}catch(e){}}
    try{var saved=localStorage.getItem('ddb-theme');if(saved==='dark'||saved==='light')s(saved)}catch(e){}
    label();
    if(b)b.addEventListener('click',function(){s(r.dataset.theme==='dark'?'light':'dark')});
    if(menu){
      menu.addEventListener('click',function(e){if(e.target.closest('a'))menu.open=false});
      document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus()}});
      document.addEventListener('click',function(e){if(!menu.contains(e.target))menu.open=false});
    }
  })();`}} />;
}
