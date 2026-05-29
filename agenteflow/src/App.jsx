import { useState, useEffect } from "react";
import {
  MessageSquare, Zap, Clock, Users, CheckCircle, ArrowRight,
  Phone, Mail, Bot, Calendar, Bell, TrendingUp, Shield,
  Repeat, ChevronDown, Star, Activity, Menu, X
} from "lucide-react";

export default function AgenteFlow() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [chatIndex, setChatIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentConv, setCurrentConv] = useState(0);

  const conversations = [
    [
      { from: "user",  text: "Boa tarde! Gostaria de agendar uma consulta", time: "14:32" },
      { from: "agent", text: "Olá! Que bom te ter aqui 😊 Sou Ana, assistente virtual. Para qual especialidade você gostaria de agendar?", time: "14:32" },
      { from: "user",  text: "Pediatria para minha filha de 2 anos", time: "14:33" },
      { from: "agent", text: "Perfeito! Temos horários disponíveis essa semana. Você prefere manhã ou tarde?", time: "14:33" },
      { from: "user",  text: "Manhã, se possível", time: "14:33" },
      { from: "agent", text: "✅ Agendado para Quinta, 29/05 às 10h! Você receberá uma confirmação logo.", time: "14:34" },
    ],
    [
      { from: "user",  text: "Oi! Qual o valor da consulta?", time: "10:15" },
      { from: "agent", text: "Olá! 😊 A consulta de pediatria é R$450. Gostaria de agendar um horário?", time: "10:15" },
      { from: "user",  text: "Sim! Tem disponibilidade amanhã?", time: "10:16" },
      { from: "agent", text: "Temos um horário disponível amanhã às 09h e às 11h. Qual prefere?", time: "10:16" },
      { from: "user",  text: "09h está ótimo!", time: "10:16" },
      { from: "agent", text: "✅ Pronto! Consulta confirmada para amanhã às 09h. Até lá! 😊", time: "10:17" },
    ],
    [
      { from: "user",  text: "Preciso remarcar minha consulta de sexta", time: "09:02" },
      { from: "agent", text: "Claro, sem problema! 😊 Para qual data você gostaria de remarcar?", time: "09:02" },
      { from: "user",  text: "Semana que vem, de preferência segunda", time: "09:03" },
      { from: "agent", text: "Segunda-feira temos 10h e 14h disponíveis. Qual horário fica melhor?", time: "09:03" },
      { from: "user",  text: "14h perfeito, obrigada!", time: "09:04" },
      { from: "agent", text: "✅ Remarcado para segunda às 14h! Você receberá um lembrete no dia anterior. 🗓️", time: "09:04" },
    ],
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setVisibleMessages([]);
    setChatIndex(0);
  }, [currentConv]);

  useEffect(() => {
    const msgs = conversations[currentConv];
    if (chatIndex >= msgs.length) {
      // Pause then move to next conversation
      const timer = setTimeout(() => {
        setVisibleMessages([]);
        setChatIndex(0);
        setCurrentConv((c) => (c + 1) % conversations.length);
      }, 2800);
      return () => clearTimeout(timer);
    }

    const msg = msgs[chatIndex];
    const delay = msg.from === "agent" ? 900 : 500;

    if (msg.from === "agent") setIsTyping(true);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setVisibleMessages((prev) => [...prev, msg]);
      setChatIndex((i) => i + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [chatIndex, currentConv]);

  const S = {
    primary: "#4338CA",
    primaryLight: "#6366F1",
    primaryDark: "#3730A3",
    green: "#10B981",
    amber: "#F59E0B",
    red: "#EF4444",
    dark: "#0B1120",
    darkMid: "#111827",
    darkSurface: "#1E293B",
    white: "#FFFFFF",
    muted: "#F1F5F9",
    text: "#0F172A",
    textMuted: "#64748B",
  };

  const navLinks = [
    { label: "Como Funciona", id: "como-funciona" },
    { label: "Casos de Uso",  id: "casos-de-uso"  },
    { label: "Vantagens",     id: "vantagens"      },
    { label: "Contato",       id: "contato"        },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const problems = [
    {
      icon: <Clock size={22} color="#EF4444" />,
      iconBg: "#FEE2E2",
      bg: "#FEF2F2",
      title: "Atendimento lento demais",
      desc: "Pacientes e clientes abandonam quando não são respondidos rapidamente. Cada mensagem ignorada é um cliente indo ao concorrente.",
    },
    {
      icon: <Users size={22} color="#F59E0B" />,
      iconBg: "#FEF3C7",
      bg: "#FFFBEB",
      title: "Equipe sobrecarregada",
      desc: "Secretárias e atendentes gastam horas respondendo as mesmas perguntas repetidamente — quando poderiam focar no que realmente importa.",
    },
    {
      icon: <TrendingUp size={22} color="#3B82F6" />,
      iconBg: "#DBEAFE",
      bg: "#EFF6FF",
      title: "Crescimento travado",
      desc: "Para atender mais, você precisaria contratar mais. Um ciclo caro e ineficiente que impede o negócio de escalar.",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: <MessageSquare size={26} color="#818CF8" />,
      title: "Cliente manda mensagem",
      desc: "Um contato chega pelo WhatsApp — de dia, de noite, fim de semana. O agente está sempre lá.",
    },
    {
      num: "02",
      icon: <Bot size={26} color="#34D399" />,
      title: "IA entende e responde",
      desc: "O agente identifica o perfil do cliente, compreende o contexto e responde em menos de 3 segundos com a informação certa.",
    },
    {
      num: "03",
      icon: <Calendar size={26} color="#FCD34D" />,
      title: "Agenda, qualifica, informa",
      desc: "Agenda consultas, qualifica leads, passa preços e informações — tudo de forma autônoma e humanizada.",
    },
    {
      num: "04",
      icon: <Bell size={26} color="#F87171" />,
      title: "Follow-up automático",
      desc: "Envia lembretes antes do atendimento e mensagens de acompanhamento depois. Zero esforço da sua equipe.",
    },
  ];

  const useCases = [
    {
      emoji: "🏥",
      label: "Saúde & Bem-estar",
      title: "Consultórios e Clínicas",
      accent: "#3B82F6",
      bg: "#EFF6FF",
      items: [
        "Agendamento automático 24 horas",
        "Lembretes 3 dias e 1 dia antes",
        "Follow-up pós-consulta automatizado",
        "Triagem por especialidade",
        "Informações sobre valores e convênios",
      ],
      quote:
        "Secretária virtual disponível fora do horário comercial — agendando e respondendo enquanto a equipe descansa.",
    },
    {
      emoji: "⚖️",
      label: "Jurídico",
      title: "Escritórios de Advocacia",
      accent: "#10B981",
      bg: "#F0FDF4",
      items: [
        "Triagem automática por área do direito",
        "Qualificação de leads antes do contato",
        "Agendamento de consultas iniciais",
        "Informações sobre documentação",
        "Acompanhamento de casos em aberto",
      ],
      quote:
        "Advogados só falam com leads qualificados. Sem perda de tempo com contatos fora do perfil.",
    },
    {
      emoji: "🏢",
      label: "Empresas em geral",
      title: "Alto Volume de Mensagens",
      accent: "#F59E0B",
      bg: "#FFF7ED",
      items: [
        "Atendimento simultâneo ilimitado",
        "Roteamento inteligente de clientes",
        "Respostas de FAQ automatizadas",
        "Captação e follow-up de leads",
        "Integração com sistemas existentes",
      ],
      quote:
        "Escale o atendimento sem escalar a equipe. Cada lead tratado com atenção, sem exceção.",
    },
  ];

  const benefits = [
    {
      icon: <Clock size={22} color="#818CF8" />,
      title: "Resposta em segundos",
      desc: "Menos de 3 segundos para responder qualquer mensagem. Seus clientes nunca ficam esperando.",
    },
    {
      icon: <Activity size={22} color="#34D399" />,
      title: "Aprende com o tempo",
      desc: "O agente melhora continuamente, adaptando-se ao tom e às necessidades específicas do seu negócio.",
    },
    {
      icon: <Repeat size={22} color="#FCD34D" />,
      title: "Zero fadiga",
      desc: "Responde as mesmas perguntas milhares de vezes com a mesma qualidade. Sua equipe faz o que só humanos fazem.",
    },
    {
      icon: <Shield size={22} color="#F87171" />,
      title: "Controle total",
      desc: "Sua equipe assume qualquer conversa com um comando simples. Segurança e autonomia ao mesmo tempo.",
    },
    {
      icon: <TrendingUp size={22} color="#60A5FA" />,
      title: "Escalabilidade sem limite",
      desc: "Sem restrição de capacidade: o agente atende 100 ou 10.000 conversas com a mesma qualidade. Você cresce sem contratar — o sistema acompanha o ritmo do seu negócio.",
    },
    {
      icon: <Star size={22} color="#A78BFA" />,
      title: "Implantação rápida",
      desc: "Em dias, não meses. Seu agente entra em operação treinado e pronto — sem complexidade técnica da sua parte.",
    },
  ];

  const processSteps = [
    {
      n: "01",
      title: "Diagnóstico gratuito",
      desc: "Entendemos seu fluxo atual de WhatsApp e identificamos os maiores gargalos de atendimento.",
    },
    {
      n: "02",
      title: "Proposta personalizada",
      desc: "Desenhamos um agente sob medida para o seu negócio, sem soluções genéricas ou de prateleira.",
    },
    {
      n: "03",
      title: "Implementação rápida",
      desc: "Em dias, não meses. Seu agente entra em operação e você começa a ver resultados imediatamente.",
    },
  ];



  const cardHover = (e, enter) => {
    e.currentTarget.style.transform = enter ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg-bubble { animation: msgIn .28s ease both; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .hero-h1  { animation: fadeSlideUp .7s ease .1s both; }
        .hero-p   { animation: fadeSlideUp .7s ease .28s both; }
        .hero-cta { animation: fadeSlideUp .7s ease .44s both; }
        .hero-card{ animation: fadeSlideUp .7s ease .32s both; }

        .pulse { animation: pulse-dot 2s ease-in-out infinite; }

        .nav-link {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color .2s;
        }
        .nav-link:hover { color: white; }

        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .grid-4 { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-btns { flex-direction: column !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFFFFF", color: S.text, overflowX: "hidden" }}>

        {/* ══════════ NAV ══════════ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          background: scrolled ? "rgba(11,17,32,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "all .35s",
          padding: "0 32px",
          height: 72,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              background: S.primary, width: 40, height: 40, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Bot size={20} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 22, color: "white", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
              AgenteFlow
            </span>
          </a>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: 500, transition: "color .2s", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.color = "white"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              >{l.label}</button>
            ))}
          </div>

          <a href="https://wa.me/5531997459952" target="_blank" rel="noopener noreferrer" className="hide-mobile" style={{
            background: S.primary, color: "white",
            padding: "10px 22px", borderRadius: 8,
            fontWeight: 600, fontSize: 14,
            textDecoration: "none",
            display: "flex", alignItems: "center", gap: 6,
            transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = S.primaryDark; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Falar com especialista <ArrowRight size={14} />
          </a>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "none", border: "none", cursor: "pointer", color: "white",
          }} className="show-mobile">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* ══════════ HERO ══════════ */}
        <section style={{
          background: S.dark,
          minHeight: "100vh",
          display: "flex", alignItems: "center",
          position: "relative", overflow: "hidden",
          padding: "120px 32px 80px",
        }}>
          {/* Decorative blobs */}
          <div style={{ position: "absolute", top: -180, right: -180, width: 600, height: 600, borderRadius: "50%", background: "rgba(99,102,241,.14)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -120, left: -120, width: 500, height: 500, borderRadius: "50%", background: "rgba(16,185,129,.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "35%", right: "8%", width: 180, height: 180, background: "rgba(245,158,11,.06)", transform: "rotate(40deg)", borderRadius: 12, pointerEvents: "none" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>

              {/* LEFT */}
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(99,102,241,.18)",
                  border: "1px solid rgba(99,102,241,.35)",
                  padding: "6px 16px", borderRadius: 100, marginBottom: 28,
                }}>
                  <div className="pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: S.primaryLight }} />
                  <span style={{ color: "#A5B4FC", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Inteligência Artificial para Negócios
                  </span>
                </div>

                <h1 className="hero-h1" style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(34px, 4.5vw, 58px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "white",
                  marginBottom: 24,
                }}>
                  Seu WhatsApp{" "}
                  <span style={{ color: S.primaryLight }}>atendendo</span>
                  {" "}sozinho,{" "}
                  <span style={{
                    background: "linear-gradient(90deg, #F59E0B 0%, #10B981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>24 horas por dia</span>
                </h1>

                <p className="hero-p" style={{
                  fontSize: 18, color: "rgba(255,255,255,.62)",
                  lineHeight: 1.75, marginBottom: 44, maxWidth: 480,
                }}>
                  Agentes de IA que transformam o WhatsApp da sua empresa em uma recepção inteligente — respondem, qualificam, agendam e fazem follow-up sem intervenção humana.
                </p>

                <div className="hero-cta" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href="https://wa.me/5531997459952" target="_blank" rel="noopener noreferrer" style={{
                    background: S.primary, color: "white",
                    padding: "15px 30px", borderRadius: 10,
                    fontWeight: 700, fontSize: 16,
                    textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 8,
                    transition: "all .2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = S.primaryDark; e.currentTarget.style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    Quero um agente <ArrowRight size={17} />
                  </a>

                  <button onClick={() => scrollTo("como-funciona")} style={{
                    background: "transparent", color: "white",
                    padding: "15px 30px", borderRadius: 10,
                    fontWeight: 600, fontSize: 16,
                    cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 8,
                    border: "2px solid rgba(255,255,255,.25)",
                    transition: "all .2s", fontFamily: "'DM Sans', sans-serif",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.65)"; e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    Ver como funciona <ChevronDown size={17} />
                  </button>
                </div>

                {/* Trust bar */}
                <div style={{ marginTop: 40, display: "flex", gap: 28, flexWrap: "wrap" }}>
                  {[
                    { icon: <CheckCircle size={14} color="#34D399" />, text: "Sem contrato de fidelidade" },
                    { icon: <CheckCircle size={14} color="#34D399" />, text: "Diagnóstico gratuito" },
                    { icon: <CheckCircle size={14} color="#34D399" />, text: "Implantação em dias" },
                  ].map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      {t.icon}
                      <span style={{ color: "rgba(255,255,255,.5)", fontSize: 13, fontWeight: 500 }}>{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — chat mockup */}
              <div className="hero-card" style={{ position: "relative" }}>
                {/* Badge */}
                <div style={{
                  position: "absolute", top: -18, right: -12,
                  background: S.amber, color: S.dark,
                  padding: "8px 16px", borderRadius: 8,
                  fontWeight: 800, fontSize: 12,
                  display: "flex", alignItems: "center", gap: 6,
                  zIndex: 10, whiteSpace: "nowrap",
                }}>
                  <Zap size={12} /> Resposta em &lt;3 segundos
                </div>

                {/* Card */}
                <div style={{
                  background: S.darkSurface,
                  borderRadius: 18, padding: 24,
                  border: "1px solid rgba(255,255,255,.08)",
                  boxShadow: "0 40px 80px rgba(0,0,0,.5)",
                }}>
                  {/* Header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    paddingBottom: 16,
                    borderBottom: "1px solid rgba(255,255,255,.07)",
                    marginBottom: 18,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: S.primary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Bot size={20} color="white" />
                    </div>
                    <div>
                      <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>Agente Ana</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                        <div className="pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: S.green }} />
                        <span style={{ color: S.green, fontSize: 12, fontWeight: 500 }}>Online agora</span>
                      </div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <MessageSquare size={16} color="rgba(255,255,255,.3)" />
                    </div>
                  </div>

                  {/* Messages */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 220 }}>
                    {visibleMessages.map((msg, i) => (
                      <div key={`${currentConv}-${i}`} className="msg-bubble" style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-start" : "flex-end" }}>
                        <div style={{
                          background: msg.from === "user" ? "rgba(255,255,255,.08)" : S.primary,
                          padding: "10px 14px",
                          borderRadius: msg.from === "user" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                          maxWidth: "80%",
                        }}>
                          <p style={{ color: "white", fontSize: 13, lineHeight: 1.55, margin: 0 }}>{msg.text}</p>
                          <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10, marginTop: 4, textAlign: "right" }}>{msg.time}</div>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="msg-bubble" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div style={{
                          background: S.primary, padding: "12px 18px",
                          borderRadius: "14px 4px 14px 14px",
                          display: "flex", alignItems: "center", gap: 5,
                        }}>
                          {[0, 0.18, 0.36].map((d, i) => (
                            <div key={i} style={{
                              width: 7, height: 7, borderRadius: "50%",
                              background: "rgba(255,255,255,.7)",
                              animation: `pulse-dot 1.1s ease-in-out ${d}s infinite`,
                            }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating mini-stat bottom left */}
                <div style={{
                  position: "absolute", bottom: -16, left: -16,
                  background: S.green, color: "white",
                  padding: "10px 18px", borderRadius: 10,
                  fontWeight: 700, fontSize: 13,
                  display: "flex", alignItems: "center", gap: 7,
                }}>
                  <CheckCircle size={14} /> Agendamento confirmado
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ STATS BAR ══════════ */}
        <section style={{ background: S.primary, padding: "36px 32px" }}>
          <div className="stats-grid" style={{
            maxWidth: 1100, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: 16, textAlign: "center",
          }}>
            {[
              { num: "24/7", label: "Disponibilidade garantida" },
              { num: "<3s", label: "Tempo médio de resposta" },
              { num: "100%", label: "Mensagens respondidas" },
              { num: "∞", label: "Conversas simultâneas" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,3vw,40px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 6 }}>{s.num}</div>
                <div style={{ color: "rgba(255,255,255,.72)", fontSize: 13, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ PROBLEMA ══════════ */}
        <section style={{ background: S.muted, padding: "96px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ maxWidth: 600, marginBottom: 60 }}>
              <span style={{ color: "#EF4444", fontWeight: 700, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>
                O PROBLEMA QUE VOCÊ JÁ CONHECE
              </span>
              <h2 style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800,
                letterSpacing: "-0.03em", lineHeight: 1.15,
                marginTop: 12, color: S.text,
              }}>
                Mensagens acumulando, clientes perdendo a paciência
              </h2>
              <p style={{ fontSize: 17, color: S.textMuted, lineHeight: 1.7, marginTop: 14 }}>
                Toda empresa com WhatsApp ativo enfrenta o mesmo gargalo: volume crescente de mensagens, equipe limitada, e clientes que não esperam mais de alguns minutos para serem atendidos.
              </p>
            </div>

            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {problems.map((p, i) => (
                <div key={i} onMouseEnter={e => cardHover(e, true)} onMouseLeave={e => cardHover(e, false)}
                  style={{ background: p.bg, borderRadius: 14, padding: "32px", cursor: "default", transition: "transform .2s" }}>
                  <div style={{ width: 52, height: 52, background: p.iconBg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: S.text }}>{p.title}</h3>
                  <p style={{ color: S.textMuted, lineHeight: 1.65, fontSize: 14 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ COMO FUNCIONA ══════════ */}
        <section id="como-funciona" style={{ background: S.dark, padding: "96px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, borderRadius: "50%", background: "rgba(99,102,241,.08)", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <span style={{ color: "#818CF8", fontWeight: 700, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>COMO FUNCIONA</span>
              <h2 style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800,
                letterSpacing: "-0.03em", lineHeight: 1.15, marginTop: 12, color: "white",
              }}>
                Do primeiro contato ao cliente satisfeito —{" "}
                <span style={{ color: "#818CF8" }}>sem você precisar fazer nada</span>
              </h2>
            </div>

            <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 40 }}>
              {steps.map((s, i) => (
                <div key={i} onMouseEnter={e => cardHover(e, true)} onMouseLeave={e => cardHover(e, false)}
                  style={{ background: S.darkSurface, borderRadius: 14, padding: 28, position: "relative", overflow: "hidden", cursor: "default", transition: "transform .2s" }}>
                  <div style={{ position: "absolute", top: 12, right: 16, fontSize: 56, fontWeight: 900, opacity: .06, color: "white", lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif" }}>
                    {s.num}
                  </div>
                  <div style={{ width: 52, height: 52, background: "rgba(255,255,255,.06)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "white", marginBottom: 10, lineHeight: 1.4 }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,.48)", fontSize: 13, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Handoff note */}
            <div style={{
              background: "rgba(79,70,229,.14)",
              border: "1px solid rgba(99,102,241,.3)",
              borderRadius: 14, padding: "22px 28px",
              display: "flex", alignItems: "flex-start", gap: 16,
            }}>
              <Shield size={22} color="#818CF8" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 15, marginBottom: 5 }}>
                  Sua equipe sempre no controle
                </div>
                <div style={{ color: "rgba(255,255,255,.52)", fontSize: 14, lineHeight: 1.65, maxWidth: 700 }}>
                  Com um comando simples, qualquer membro da equipe pode assumir uma conversa a qualquer momento. O agente reconhece o handoff imediatamente e cede o atendimento — sem perder o histórico da conversa.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CASOS DE USO ══════════ */}
        <section id="casos-de-uso" style={{ background: "white", padding: "96px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <span style={{ color: S.green, fontWeight: 700, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>CASOS DE USO</span>
              <h2 style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800,
                letterSpacing: "-0.03em", lineHeight: 1.15, marginTop: 12, color: S.text,
              }}>
                Funciona para qualquer empresa com{" "}
                <span style={{ color: S.green }}>alto volume de mensagens</span>
              </h2>
            </div>

            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
              {useCases.map((u, i) => (
                <div key={i} onMouseEnter={e => cardHover(e, true)} onMouseLeave={e => cardHover(e, false)}
                  style={{ background: u.bg, borderRadius: 16, padding: 36, cursor: "default", transition: "transform .2s" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: u.accent + "20", padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
                    <span style={{ fontSize: 14 }}>{u.emoji}</span>
                    <span style={{ color: u.accent, fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>{u.label}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: S.text, marginBottom: 22 }}>{u.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                    {u.items.map((it, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                        <CheckCircle size={15} color={u.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                        <span style={{ color: "#374151", fontSize: 14, lineHeight: 1.55 }}>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ borderTop: `2px solid ${u.accent}25`, paddingTop: 16 }}>
                    <p style={{ color: S.textMuted, fontSize: 13, lineHeight: 1.65, fontStyle: "italic" }}>"{u.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ VANTAGENS ══════════ */}
        <section id="vantagens" style={{ background: S.primary, padding: "96px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -150, left: -100, width: 450, height: 450, borderRadius: "50%", background: "rgba(255,255,255,.03)", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <span style={{ color: "#A5B4FC", fontWeight: 700, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>VANTAGENS</span>
              <h2 style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800,
                letterSpacing: "-0.03em", lineHeight: 1.15, marginTop: 12, color: "white",
              }}>
                Por que o AgenteFlow funciona
              </h2>
            </div>

            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.09)", borderRadius: 14, padding: "28px 30px", cursor: "default", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.09)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ width: 50, height: 50, background: "rgba(255,255,255,.07)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    {b.icon}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 17, color: "white", marginBottom: 9 }}>{b.title}</h3>
                  <p style={{ color: "rgba(255,255,255,.58)", fontSize: 14, lineHeight: 1.65 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CONTATO ══════════ */}
        <section id="contato" style={{ background: S.muted, padding: "96px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

              {/* Left */}
              <div>
                <span style={{ color: S.primary, fontWeight: 700, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>VAMOS CONVERSAR</span>
                <h2 style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800,
                  letterSpacing: "-0.03em", lineHeight: 1.15, marginTop: 12, color: S.text, marginBottom: 18,
                }}>
                  Pronto para transformar o atendimento da sua empresa?
                </h2>
                <p style={{ fontSize: 17, color: S.textMuted, lineHeight: 1.72, marginBottom: 44 }}>
                  Entre em contato para conversarmos sobre as necessidades do seu negócio. Vamos entender seu fluxo atual e mostrar como um agente de IA pode transformá-lo — sem compromisso.
                </p>

                <div className="contact-btns" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <a href="https://wa.me/5531997459952" target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      background: "#22C55E", color: "white",
                      padding: "18px 24px", borderRadius: 12,
                      textDecoration: "none", fontWeight: 700, fontSize: 16,
                      transition: "all .2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#16A34A"; e.currentTarget.style.transform = "scale(1.03)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#22C55E"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <div style={{ width: 44, height: 44, background: "rgba(255,255,255,.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, opacity: .8, fontWeight: 600, marginBottom: 2, letterSpacing: ".05em" }}>WHATSAPP</div>
                      (31) 99745-9952
                    </div>
                  </a>

                  <a href="mailto:ridolfi.delano@gmail.com"
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      background: S.dark, color: "white",
                      padding: "18px 24px", borderRadius: 12,
                      textDecoration: "none", fontWeight: 700, fontSize: 16,
                      transition: "all .2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = S.darkSurface; e.currentTarget.style.transform = "scale(1.03)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = S.dark; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <div style={{ width: 44, height: 44, background: "rgba(255,255,255,.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, opacity: .6, fontWeight: 600, marginBottom: 2, letterSpacing: ".05em" }}>E-MAIL</div>
                      ridolfi.delano@gmail.com
                    </div>
                  </a>
                </div>
              </div>

              {/* Right — process card */}
              <div style={{ background: S.dark, borderRadius: 20, padding: "48px 44px" }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 22, color: "white", marginBottom: 8 }}>
                  O que acontece depois do contato
                </h3>
                <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, marginBottom: 40, lineHeight: 1.65 }}>
                  Processo simples, sem burocracia e sem compromisso imediato.
                </p>

                {processSteps.map((ps, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, marginBottom: i < 2 ? 32 : 0, position: "relative" }}>
                    {i < 2 && (
                      <div style={{ position: "absolute", top: 44, left: 19, width: 2, height: 20, background: "rgba(99,102,241,.3)" }} />
                    )}
                    <div style={{
                      width: 40, height: 40, background: S.primary,
                      borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 800, fontSize: 13, color: "white",
                    }}>
                      {ps.n}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "white", marginBottom: 5 }}>{ps.title}</div>
                      <div style={{ color: "rgba(255,255,255,.48)", fontSize: 13, lineHeight: 1.65 }}>{ps.desc}</div>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: 40, padding: "18px 22px", background: "rgba(16,185,129,.12)", border: "1px solid rgba(16,185,129,.25)", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle size={16} color={S.green} />
                    <span style={{ color: S.green, fontWeight: 700, fontSize: 14 }}>Diagnóstico 100% gratuito e sem compromisso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ FOOTER ══════════ */}
        <footer style={{ background: S.dark, padding: "44px 32px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: S.primary, width: 36, height: 36, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={18} color="white" />
              </div>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 20, color: "white", letterSpacing: "-0.02em" }}>AgenteFlow</span>
            </div>

            <div style={{ color: "rgba(255,255,255,.35)", fontSize: 13, textAlign: "center" }}>
              Agentes de IA para WhatsApp corporativo · Belo Horizonte, MG
            </div>

            <div style={{ display: "flex", gap: 28 }}>
              {[
                { label: "(31) 99745-9952", href: "https://wa.me/5531997459952" },
                { label: "ridolfi.delano@gmail.com", href: "mailto:ridolfi.delano@gmail.com" },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{ color: "rgba(255,255,255,.4)", fontSize: 13, textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "white"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.4)"}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
