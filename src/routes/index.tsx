import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Instagram,
  Menu,
  MessageCircle,
  X,
  Flame,
  Pizza,
  IceCreamBowl,
  UtensilsCrossed,
} from "lucide-react";
import { BurgerScene } from "../components/BurgerScene";
import { business, confirmedBurgers } from "../lib/dozoi";

export const Route = createFileRoute("/")({ component: Index });

function OrderLink({
  children = "Fazer meu pedido",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`order-button ${className}`}
      href={business.orderUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={20} aria-hidden="true" />
    </a>
  );
}
function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Dozoi — início">
      {business.logoUrl ? (
        <img src={business.logoUrl} alt={business.fullName} width="150" height="64" />
      ) : (
        <>
          <span className="brand-name">
            DOZOI<span>.</span>
          </span>
          <span className="brand-detail">HAMBURGUERIA • PIZZARIA • AÇAÍTERIA</span>
        </>
      )}
    </a>
  );
}
const categories = [
  {
    name: "Hambúrgueres",
    text: "A vontade da primeira mordida.",
    href: "#hamburgueres",
    icon: Flame,
  },
  { name: "Pizzas", text: "A pedida para reunir a galera.", href: "#pizzas", icon: Pizza },
  { name: "Açaí", text: "Seu momento de refrescar.", href: "#acai", icon: IceCreamBowl },
  { name: "Porções", text: "Para dividir. Ou não.", href: "#porcoes", icon: UtensilsCrossed },
];
function Index() {
  const hero = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    if (menuOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Brand />
          <nav className="desktop-nav" aria-label="Menu principal">
            <a href="#cardapio">Cardápio</a>
            <a href="#sobre">Sobre a Dozoi</a>
            <a href="#contato">Contato</a>
          </nav>
          <OrderLink className="header-order">Pedir agora</OrderLink>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Menu móvel"
          hidden={!menuOpen}
        >
          <a href="#cardapio" onClick={() => setMenuOpen(false)}>
            Cardápio
            <ArrowUpRight />
          </a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>
            Sobre a Dozoi
            <ArrowUpRight />
          </a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>
            Contato
            <ArrowUpRight />
          </a>
        </nav>
      </header>
      <main id="conteudo">
        <section ref={hero} className="hero-scroll" id="inicio" aria-labelledby="hero-title">
          <div className="hero-sticky">
            <div className="hero-inner container">
              <div className="hero-copy">
                <p className="eyebrow">
                  <span className="small-dot" /> SUA FOME TEM ENDEREÇO CERTO
                </p>
                <h1 id="hero-title">
                  O SABOR QUE
                  <br />
                  CHAMA VOCÊ
                  <br />
                  <span>DE VOLTA.</span>
                </h1>
                <p className="hero-description">
                  Hambúrgueres, pizzas, açaí e porções para matar a vontade de verdade.
                </p>
                <div className="hero-actions">
                  <OrderLink />
                  <a className="text-link" href="#cardapio">
                    Ver cardápio
                    <ArrowDown size={17} />
                  </a>
                </div>
                <p className="opening">
                  <Clock3 size={15} aria-hidden="true" />
                  Todos os dias, a partir das <strong>18h30</strong>
                </p>
              </div>
              <div className="hero-art">
                <div className="orange-disc" aria-hidden="true" />
                <span className="art-caption">
                  DEU FOME?
                  <br />
                  <strong>DEU DOZOI.</strong>
                </span>
                <BurgerScene scrollTarget={hero} />
                <span className="image-note">Imagem ilustrativa</span>
              </div>
              <a href="#cardapio" className="scroll-hint">
                <span>O MELHOR DA NOITE COMEÇA AQUI</span>
                <ArrowDown size={18} />
              </a>
            </div>
          </div>
        </section>
        <div className="flavor-strip" aria-hidden="true">
          <div>
            <span>SABOR QUE CONQUISTA</span>
            <span className="strip-star">✳</span>
            <span>NA PRIMEIRA MORDIDA</span>
            <span className="strip-star">✳</span>
            <span>SABOR QUE CONQUISTA</span>
            <span className="strip-star">✳</span>
          </div>
        </div>
        <section id="cardapio" className="menu-section section-pad" aria-labelledby="menu-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">ESCOLHA SUA VONTADE</p>
                <h2 id="menu-title">HOJE VAI DE QUÊ?</h2>
              </div>
              <p>
                Da primeira mordida à última colherada.
                <br />
                Tem Dozoi para o seu momento.
              </p>
            </div>
            <div className="category-links" data-reveal>
              {categories.map(({ name, text, href, icon: Icon }) => (
                <a key={name} href={href} className="category-link">
                  <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{name}</h3>
                  <p>{text}</p>
                  <ArrowUpRight size={22} className="category-arrow" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div id="hamburgueres" className="burger-feature" data-reveal>
              <div className="feature-art">
                <span className="feature-background-word" aria-hidden="true">
                  DEU
                  <br />
                  FOME.
                </span>
                <BurgerScene staticView />
                <span className="image-note">Imagem ilustrativa</span>
              </div>
              <div className="feature-copy">
                <p className="eyebrow">
                  <Flame size={17} /> HAMBÚRGUERES
                </p>
                <h2>
                  É NA MORDIDA
                  <br />
                  QUE A GENTE
                  <br />
                  <span>SE ENTENDE.</span>
                </h2>
                <p>
                  Tem vontade que só um hambúrguer resolve. Escolha o seu no nosso cardápio e faça o
                  pedido direto com a Dozoi.
                </p>
                <OrderLink className="dark-button">Ver hambúrgueres no WhatsApp</OrderLink>
              </div>
            </div>
            {confirmedBurgers.length > 0 && (
              <div className="confirmed-menu" aria-label="Hambúrgueres do cardápio">
                {confirmedBurgers.map((item) => (
                  <article key={item.name}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <strong>{item.price}</strong>
                    <OrderLink>Pedir este hambúrguer</OrderLink>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="more-section section-pad" aria-labelledby="more-title">
          <div className="container more-grid">
            <div className="more-copy" data-reveal>
              <p className="eyebrow">MAIS JEITOS DE MATAR A VONTADE</p>
              <h2 id="more-title">
                CADA FOME.
                <br />
                <span>UMA BOA PEDIDA.</span>
              </h2>
              <div className="more-list">
                <article id="pizzas">
                  <div>
                    <h3>Pizzas</h3>
                    <p>
                      A noite combina com uma pizza. Consulte os sabores disponíveis e escolha a
                      sua.
                    </p>
                  </div>
                  <a
                    href={business.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Consultar pizzas pelo WhatsApp"
                  >
                    <ArrowUpRight />
                  </a>
                </article>
                <article id="acai">
                  <div>
                    <h3>Açaí</h3>
                    <p>Uma pausa para refrescar. Veja as opções de açaí pelo nosso atendimento.</p>
                  </div>
                  <a
                    href={business.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Consultar açaí pelo WhatsApp"
                  >
                    <ArrowUpRight />
                  </a>
                </article>
                <article id="porcoes">
                  <div>
                    <h3>Porções</h3>
                    <p>
                      Para acompanhar a conversa e dividir a vontade. Consulte as porções
                      disponíveis.
                    </p>
                  </div>
                  <a
                    href={business.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Consultar porções pelo WhatsApp"
                  >
                    <ArrowUpRight />
                  </a>
                </article>
              </div>
            </div>
            <figure className="more-photo" data-reveal>
              <img
                src="/images/categories-illustration.webp"
                alt="Composição ilustrativa com pizza, açaí e batatas fritas"
                loading="lazy"
                decoding="async"
                width="1100"
                height="733"
              />
              <figcaption>Imagens ilustrativas. Consulte as opções no atendimento.</figcaption>
            </figure>
          </div>
        </section>
        <section id="sobre" className="about-section section-pad" aria-labelledby="about-title">
          <div className="container about-grid" data-reveal>
            <div>
              <p className="eyebrow">MUITO PRAZER, DOZOI.</p>
              <h2 id="about-title">
                SABOR QUE CONQUISTA
                <br />
                NA PRIMEIRA <span>MORDIDA.</span>
              </h2>
            </div>
            <div className="about-copy">
              <p>
                A noite pede uma pausa. Um encontro com os amigos, um filme em casa ou simplesmente
                algo gostoso para você.
              </p>
              <p>
                Na Dozoi, hambúrgueres, pizzas, açaí e porções fazem parte desses momentos. Escolha
                o que combina com a sua vontade e fale com a gente.
              </p>
              <a
                className="text-link"
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={19} /> Acompanhe a Dozoi
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="final-cta" aria-labelledby="cta-title">
          <div className="container final-inner" data-reveal>
            <p className="eyebrow">SUA NOITE MERECE DOZOI</p>
            <h2 id="cta-title">
              BATEU A FOME?
              <br />
              <span>CHAMA A GENTE.</span>
            </h2>
            <p>Seu próximo pedido começa com uma conversa.</p>
            <OrderLink className="dark-button">
              <MessageCircle size={21} aria-hidden="true" />
              Pedir pelo WhatsApp
            </OrderLink>
            <div className="cta-hours">
              <Clock3 size={16} /> {business.hours}
            </div>
          </div>
        </section>
      </main>
      <footer id="contato" className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Brand />
              <p>O sabor que chama você de volta.</p>
            </div>
            <div>
              <h3>Fale com a Dozoi</h3>
              <a href={business.orderUrl} target="_blank" rel="noopener noreferrer">
                {business.phone}
                <ArrowUpRight size={16} />
              </a>
              <a
                className="instagram-link"
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={16} />
                {business.instagram}
              </a>
            </div>
            <div>
              <h3>Seu pedido, todo dia</h3>
              <p>
                Todos os dias,
                <br />a partir das <strong>18h30.</strong>
              </p>
              <a href="#cardapio">
                Explorar cardápio
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Dozoi. Todos os direitos reservados.</span>
            <span>Hamburgueria, Pizzaria e Açaíteria.</span>
          </div>
        </div>
      </footer>
      <div className="mobile-order">
        <span>
          Deu fome?<strong>Deu Dozoi.</strong>
        </span>
        <OrderLink>Pedir agora</OrderLink>
      </div>
    </>
  );
}
