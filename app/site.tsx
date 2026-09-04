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

export const Arrow = () => <span className="icon-arrow" aria-hidden="true" />;

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
    <button className="theme-toggle" type="button" aria-label="Toggle color theme" data-theme-toggle>
      <span className="theme-icon theme-icon-sun" aria-hidden="true">☼</span>
      <span className="theme-icon theme-icon-moon" aria-hidden="true">◐</span>
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
    function s(t){r.dataset.theme=t;try{localStorage.setItem('ddb-theme',t)}catch(e){}}
    try{var saved=localStorage.getItem('ddb-theme');if(saved==='dark'||saved==='light')s(saved)}catch(e){}
    if(b)b.addEventListener('click',function(){s(r.dataset.theme==='dark'?'light':'dark')});
    if(menu){
      menu.addEventListener('click',function(e){if(e.target.closest('a'))menu.open=false});
      document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus()}});
      document.addEventListener('click',function(e){if(!menu.contains(e.target))menu.open=false});
    }
  })();`}} />;
}
