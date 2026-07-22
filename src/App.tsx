import { useState, useRef, useEffect } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import logoSrc from './imports/Moorman_Creative_logo_zwart.png'

type Bezier = [number, number, number, number]
const EASE: Bezier = [0.16, 1, 0.3, 1]

// ─── Language ─────────────────────────────────────────────────────────────────

type Lang = 'en' | 'nl'

const T = {
  en: {
    navWork: 'WORK', navServices: 'SERVICES', navAbout: 'ABOUT', navContact: 'CONTACT',
    navBook: 'BOOK A CALL',
    heroTag: 'EST. 2021 — AI-POWERED PRODUCTION STUDIO',
    heroScroll: 'SCROLL',
    heroBadge: 'AMS — LDN — LA',
    headlineTag: 'EST. 2021 — AI-POWERED PRODUCTION',
    headline1: 'Shaping the', headline2: 'Future of', headline3: 'Moving Image.',
    heroDesc: "We engineer the intersection of cinematic craft and artificial intelligence — building bespoke AI systems, directing photorealistic campaigns, and creating original IP for the world's most ambitious brands.",
    ctaWork: 'VIEW OUR WORK', ctaBook: 'BOOK A CALL',
    stat1n: '48+', stat1l: 'Campaigns\nDelivered',
    stat2n: '14', stat2l: 'Countries\nReached',
    stat3n: '6', stat3l: 'AI Systems\nBuilt',
    trustLabel: 'TRUSTED BY WORLD-CLASS BRANDS',
    workLabel: 'SELECTED WORK',
    workTitle1: 'Featured', workTitle2: 'Case Studies',
    workViewAll: 'VIEW ALL',
    workViewAllBtn: 'VIEW ALL WORK →',
    philLabel: 'OUR PHILOSOPHY',
    philTitle1: 'The craft behind', philTitle2: 'the intelligence.',
    philAccent1: 'BRIEF & STRATEGY', philAccent2: 'AI SYSTEMS & PIPELINE', philAccent3: 'VFX & FINISHING',
    philStep1Title: 'Concept', philStep2Title: 'Generation', philStep3Title: 'Polish',
    philStep1Desc: "Every project begins with a deep creative brief — understanding not just the deliverable, but the brand's soul and the audience's desires. We think before we generate.",
    philStep2Desc: 'Our proprietary AI pipelines are engineered for each project, blending custom-trained models with director-level creative control. Technology in service of vision.',
    philStep3Desc: 'Raw AI output is never the finish line. Our team of cinematographers, colourists, and VFX artists elevate every frame to exhibition standard.',
    philScrollHint: 'SCROLL TO CONTINUE',
    ctaLabel: 'START A PROJECT',
    ctaTitle1: "Let's create something", ctaTitle2: 'unforgettable.',
    ctaDesc: 'Share your booking inquiry and our team will respond within 24 hours to schedule a discovery call.',
    ctaPlaceholder: 'your@brand.com',
    ctaBtn: 'BOOK A CALL →',
    footerDesc: 'Elite AI-powered production studio. Amsterdam, London, Los Angeles.',
    footerNav: 'NAVIGATE', footerSvc: 'SERVICES', footerConnect: 'CONNECT',
    footerRights: 'ALL RIGHTS RESERVED.',
    footerPrivacy: 'PRIVACY POLICY', footerTerms: 'TERMS',
    // Work page
    workPageTag: 'PORTFOLIO',
    workPageH1: 'SELECTED', workPageH2: 'CASE STUDIES.',
    workPageDesc: "Every engagement is a bespoke collaboration. We don't do templates — we build the technology and the story simultaneously.",
    viewCaseStudy: 'VIEW CASE STUDY →',
    // Services page
    svcWhat: 'WHAT WE DO',
    svcH1: 'CAPABILITIES &', svcH2: 'SPECIALIZATIONS.',
    svcSub: 'Three core disciplines. One integrated studio. Zero compromise on quality.',
    svc1Title: 'Cinematic AI\nVideo Production',
    svc1Desc: "We direct, generate and finish full-length brand films, campaign edits and social content using bespoke AI pipelines calibrated for cinematic quality — not template output. Every frame passes through our human creative direction layer before delivery.",
    svc1Tags: ['BRAND FILMS', 'CAMPAIGN EDITS', 'SOCIAL CONTENT'],
    svc2Title: 'Custom AI Systems\n& Training',
    svc2Desc: "We architect and train proprietary AI models for brands who need exclusive visual capabilities that can't be replicated on public platforms. From custom diffusion models to closed inference pipelines, we build the infrastructure your creative team owns forever.",
    svc2Tags: ['CUSTOM MODELS', 'PRIVATE PIPELINES', 'LORA TRAINING'],
    svc3Title: 'Creative Commercial\n& IP Production',
    svc3Desc: 'For brands and studios seeking to create original intellectual property — animated series, game universes, fashion IP — we provide the full creative and technical stack: concept, world-building, character design, and AI-accelerated production at every stage.',
    svc3Tags: ['IP CREATION', 'WORLD-BUILDING', 'ANIMATION'],
    svcScrollHint: 'SCROLL TO EXPLORE',
    // About
    aboutTag: 'OUR STORY',
    aboutH1: 'We build the', aboutH2: 'tools that build', aboutH3: 'the future.',
    aboutP1: 'Moorman Creative was founded in Amsterdam in 2021 with a single conviction: that artificial intelligence, applied with genuine cinematic craft, would fundamentally alter what moving image could achieve — and who could achieve it.',
    aboutP2: "Today, we're a team of directors, engineers, colourists and world-builders operating across four continents — building technology that is as beautiful as the work it produces.",
    aboutPrinciplesTag: 'PRINCIPLES', aboutPrinciplesTitle: 'What we stand for.',
    p1Title: 'Craft First', p1Desc: "Technology is only as good as the creative intelligence guiding it. We hire artists who happen to love machines — not engineers who sometimes make pictures.",
    p2Title: 'Radical Exclusivity', p2Desc: "We don't publish our models, share our pipelines, or license our systems to competitors. What we build for you stays yours.",
    p3Title: 'Honest Collaboration', p3Desc: "We charge for outcomes, not hours. Our clients know exactly what they're getting before we start, and they always get more.",
    teamTag: 'FOUNDER', teamTitle1: 'One vision,', teamTitle2: 'built without limits.',
    teamBio: 'Joren leads every engagement from first conversation to final frame, combining twelve years of cinematic direction with a deep understanding of generative technology. His practice is built on a simple belief: AI should expand creative ambition, never replace creative judgment.',
    // Contact
    contactTag: 'GET IN TOUCH',
    contactH1: "Let's create", contactH2: 'something', contactH3: 'unforgettable.',
    contactSub: "We typically respond within 24 hours. For urgent inquiries, use the direct contact below.",
    contactNB: 'NEW BUSINESS', contactPress: 'PRESS', contactCareers: 'CAREERS',
    contactCity: 'AMSTERDAM — LONDON — LA',
    contactAddr: 'Vondelstraat 140, Amsterdam NL 1054 GS',
    formName: 'FULL NAME', formEmail: 'EMAIL ADDRESS', formCompany: 'COMPANY / BRAND',
    formBudget: 'PROJECT BUDGET', formBudgetPh: 'Select range',
    formBrief: 'PROJECT BRIEF', formBriefPh: 'Tell us about your project, timeline, and goals...',
    formSend: 'SEND INQUIRY',
    formSuccessTag: 'RECEIVED', formSuccessTitle: 'Thank you.',
    formSuccessDesc: "We'll review your brief and be in touch within 24 hours to schedule a discovery call.",
    // Project detail
    projOverview: 'Overview.', projChallenge: 'THE CHALLENGE', projSolution: 'THE AI SOLUTION',
    projProcess: 'PROCESS SHOWCASE', projProcessTitle: 'From Rough to Final',
    projRough: 'ROUGH RENDER', projGen: 'AI GENERATION', projFinal: 'FINAL VFX',
    projTech: 'TECH STACK', projTechTitle: 'Tools &', projTechTitle2: 'Infrastructure',
    projNext: 'NEXT PROJECT', projNextTitle1: 'Your Next Campaign.', projNextTitle2: "Let's Build.",
    projViewMore: 'VIEW MORE WORK', projStart: 'START A PROJECT',
  },
  nl: {
    navWork: 'WERK', navServices: 'DIENSTEN', navAbout: 'OVER ONS', navContact: 'CONTACT',
    navBook: 'BELLEN PLANNEN',
    heroTag: 'EST. 2021 — AI-AANGEDREVEN PRODUCTIESTUDIO',
    heroScroll: 'SCROLL',
    heroBadge: 'AMS — LDN — LA',
    headlineTag: 'EST. 2021 — AI-AANGEDREVEN PRODUCTIE',
    headline1: 'De Toekomst van', headline2: 'Bewegend Beeld', headline3: 'Vormgeven.',
    heroDesc: 'Wij engineeren het snijpunt van cinematografisch vakmanschap en kunstmatige intelligentie — bespoke AI-systemen bouwen, fotorealistische campagnes regisseren en originele IP creëren voor de meest ambitieuze merken ter wereld.',
    ctaWork: 'BEKIJK ONS WERK', ctaBook: 'BELLEN PLANNEN',
    stat1n: '48+', stat1l: 'Campagnes\nGeleverd',
    stat2n: '14', stat2l: 'Landen\nBereikt',
    stat3n: '6', stat3l: 'AI Systemen\nGebouwd',
    trustLabel: 'VERTROUWD DOOR WERELDKLASSE MERKEN',
    workLabel: 'GESELECTEERD WERK',
    workTitle1: 'Uitgelichte', workTitle2: 'Casestudies',
    workViewAll: 'ALLES ZIEN',
    workViewAllBtn: 'BEKIJK AL HET WERK →',
    philLabel: 'ONZE FILOSOFIE',
    philTitle1: 'Het vakmanschap achter', philTitle2: 'de intelligentie.',
    philAccent1: 'BRIEFING & STRATEGIE', philAccent2: 'AI SYSTEMEN & PIPELINE', philAccent3: 'VFX & AFWERKING',
    philStep1Title: 'Concept', philStep2Title: 'Generatie', philStep3Title: 'Verfijning',
    philStep1Desc: 'Elk project begint met een diepgaande creatieve briefing — niet alleen het eindproduct begrijpen, maar ook de ziel van het merk en de wensen van het publiek. Wij denken voor wij genereren.',
    philStep2Desc: 'Onze eigen AI-pipelines worden voor elk project opgebouwd, waarbij custom-trained modellen worden gecombineerd met creatieve regie op directeursniveau. Technologie in dienst van visie.',
    philStep3Desc: 'Ruwe AI-output is nooit het eindpunt. Ons team van cinematografen, coloristen en VFX-artiesten tilt elk frame naar tentoonstellingsstandaard.',
    philScrollHint: 'SCROLL OM VERDER TE GAAN',
    ctaLabel: 'START EEN PROJECT',
    ctaTitle1: 'Laten we iets', ctaTitle2: 'onvergetelijks creëren.',
    ctaDesc: 'Deel uw boekingsaanvraag en ons team reageert binnen 24 uur om een kennismakingsgesprek in te plannen.',
    ctaPlaceholder: 'uw@merk.com',
    ctaBtn: 'GESPREK PLANNEN →',
    footerDesc: 'Elite AI-aangedreven productiestudio. Amsterdam, Londen, Los Angeles.',
    footerNav: 'NAVIGEER', footerSvc: 'DIENSTEN', footerConnect: 'VERBINDEN',
    footerRights: 'ALLE RECHTEN VOORBEHOUDEN.',
    footerPrivacy: 'PRIVACYBELEID', footerTerms: 'VOORWAARDEN',
    // Work page
    workPageTag: 'PORTFOLIO',
    workPageH1: 'GESELECTEERDE', workPageH2: 'CASESTUDIES.',
    workPageDesc: 'Elke samenwerking is een exclusief partnerschap. Wij doen geen templates — wij bouwen de technologie en het verhaal tegelijkertijd.',
    viewCaseStudy: 'BEKIJK CASESTUDIE →',
    // Services page
    svcWhat: 'WAT WE DOEN',
    svcH1: 'MOGELIJKHEDEN &', svcH2: 'SPECIALISATIES.',
    svcSub: 'Drie kerngebieden. Één geïntegreerde studio. Geen compromis op kwaliteit.',
    svc1Title: 'Cinematografische AI\nVideo Productie',
    svc1Desc: 'Wij regisseren, genereren en finaliseren volledige merkfilms, campagnemontages en sociale content met bespoke AI-pipelines gekalibreerd voor cinematografische kwaliteit — geen sjabloonoutput. Elk frame passeert onze menselijke creatieve regielaag voor levering.',
    svc1Tags: ['MERKFILMS', 'CAMPAGNEMONTAGES', 'SOCIALE CONTENT'],
    svc2Title: 'Aangepaste AI Systemen\n& Training',
    svc2Desc: "Wij ontwerpen en trainen propriëtaire AI-modellen voor merken die exclusieve visuele mogelijkheden nodig hebben die niet te repliceren zijn op publieke platformen. Van custom diffusiemodellen tot gesloten inferentiepipelines — wij bouwen de infrastructuur die uw creatief team voor altijd bezit.",
    svc2Tags: ['AANGEPASTE MODELLEN', 'PRIVATE PIPELINES', 'LORA TRAINING'],
    svc3Title: 'Creatieve Commerciële\n& IP Productie',
    svc3Desc: 'Voor merken en studio\'s die origineel intellectueel eigendom willen creëren — animatieseries, game-universa, mode-IP — leveren wij de volledige creatieve en technische stack: concept, wereldbouw, karakterontwerp en AI-versnelde productie in elke fase.',
    svc3Tags: ['IP CREATIE', 'WERELDBOUW', 'ANIMATIE'],
    svcScrollHint: 'SCROLL OM TE VERKENNEN',
    // About
    aboutTag: 'ONS VERHAAL',
    aboutH1: 'Wij bouwen de', aboutH2: 'tools die de', aboutH3: 'toekomst bouwen.',
    aboutP1: 'Moorman Creative werd in 2021 in Amsterdam opgericht met één overtuiging: dat kunstmatige intelligentie, toegepast met authentiek cinematografisch vakmanschap, fundamenteel zou veranderen wat bewegend beeld kon bereiken — en wie dat kon bereiken.',
    aboutP2: 'Vandaag zijn wij een team van regisseurs, engineers, coloristen en wereldbouwers actief op vier continenten — technologie bouwen die even mooi is als het werk dat het voortbrengt.',
    aboutPrinciplesTag: 'PRINCIPES', aboutPrinciplesTitle: 'Waar wij voor staan.',
    p1Title: 'Vakmanschap Eerst', p1Desc: 'Technologie is alleen zo goed als de creatieve intelligentie die het aanstuurt. Wij nemen kunstenaars aan die toevallig van machines houden — geen engineers die soms plaatjes maken.',
    p2Title: 'Radicale Exclusiviteit', p2Desc: 'Wij publiceren onze modellen niet, delen onze pipelines niet en licentiëren onze systemen niet aan concurrenten. Wat wij voor u bouwen, blijft van u.',
    p3Title: 'Eerlijke Samenwerking', p3Desc: 'Wij rekenen voor resultaten, niet voor uren. Onze klanten weten precies wat ze krijgen voordat we beginnen, en ze krijgen altijd meer.',
    teamTag: 'OPRICHTER', teamTitle1: 'Eén visie,', teamTitle2: 'gebouwd zonder grenzen.',
    teamBio: 'Joren leidt elke samenwerking van het eerste gesprek tot het laatste frame en combineert twaalf jaar cinematografische regie met diepgaande kennis van generatieve technologie. Zijn praktijk is gebouwd op één overtuiging: AI moet creatieve ambitie vergroten, nooit creatief oordeel vervangen.',
    // Contact
    contactTag: 'NEEM CONTACT OP',
    contactH1: 'Laten we iets', contactH2: 'onvergetelijks', contactH3: 'creëren.',
    contactSub: 'Wij reageren doorgaans binnen 24 uur. Voor dringende vragen gebruikt u de directe contactgegevens hieronder.',
    contactNB: 'NIEUWE PROJECTEN', contactPress: 'PERS', contactCareers: 'CARRIÈRES',
    contactCity: 'AMSTERDAM — LONDEN — LA',
    contactAddr: 'Vondelstraat 140, Amsterdam NL 1054 GS',
    formName: 'VOLLEDIGE NAAM', formEmail: 'E-MAILADRES', formCompany: 'BEDRIJF / MERK',
    formBudget: 'PROJECTBUDGET', formBudgetPh: 'Selecteer bereik',
    formBrief: 'PROJECTBRIEFING', formBriefPh: 'Vertel ons over uw project, tijdlijn en doelen...',
    formSend: 'AANVRAAG VERSTUREN',
    formSuccessTag: 'ONTVANGEN', formSuccessTitle: 'Dank u.',
    formSuccessDesc: 'Wij bekijken uw briefing en nemen binnen 24 uur contact op om een kennismakingsgesprek in te plannen.',
    // Project detail
    projOverview: 'Overzicht.', projChallenge: 'DE UITDAGING', projSolution: 'DE AI OPLOSSING',
    projProcess: 'PROCESOVERZICHT', projProcessTitle: 'Van Ruw naar Finaal',
    projRough: 'RUWE RENDER', projGen: 'AI GENERATIE', projFinal: 'FINALE VFX',
    projTech: 'TECH STACK', projTechTitle: 'Tools &', projTechTitle2: 'Infrastructuur',
    projNext: 'VOLGEND PROJECT', projNextTitle1: 'Uw Volgende Campagne.', projNextTitle2: 'Laten We Bouwen.',
    projViewMore: 'MEER WERK BEKIJKEN', projStart: 'START EEN PROJECT',
  },
}

type TKeys = keyof typeof T.en

// ─── Types ───────────────────────────────────────────────────────────────────

type Page = 'home' | 'work' | 'project' | 'services' | 'about' | 'contact'

interface Project {
  id: string
  title: string
  subtitle: string
  tags: string[]
  year: string
  category: string
  challenge: string
  solution: string
  techStack: string[]
  heroImg: string
  thumbImg: string
  processImgs: string[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'void-campaign',
    title: 'VOID Campaign',
    subtitle: 'Nike × Moorman Creative',
    tags: ['AI VIDEO', 'VFX', 'DIRECTION'],
    year: '2026',
    category: 'CASE STUDY // DIRECTION & VFX',
    challenge: "Nike needed a global campaign that could transcend traditional production timelines — delivering photorealistic athlete sequences across 14 markets in under six weeks, each hyper-localised without location shoots.",
    solution: "We engineered a bespoke AI pipeline combining custom-trained LoRA models on Nike's athlete archive with Unreal Engine 5 environments, allowing rapid variation across markets while maintaining cinematic consistency.",
    techStack: ['PLATFORM: UNREAL ENGINE 5', 'AI SYSTEM: MIDJOURNEY v7 + CUSTOM LORA', 'MOTION CAPTURE: ROKOKO SMARTSUIT PRO', 'FINISHING: NUKE 15 + DAVINCI RESOLVE', 'COLOUR: BASELIGHT', 'DELIVERY: IMF PACKAGE (UHD HDR)'],
    heroImg: 'https://images.unsplash.com/photo-1779398555682-1ca05add6405?w=1200&q=75&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1779398555682-1ca05add6405?w=600&q=75&auto=format&fit=crop',
    processImgs: ['https://images.unsplash.com/photo-1708779493105-9c743e367a3c?w=500&q=75&auto=format&fit=crop', 'https://images.unsplash.com/photo-1709625862266-014ef072fd93?w=500&q=75&auto=format&fit=crop', 'https://images.unsplash.com/photo-1687894986595-da703eb96375?w=500&q=75&auto=format&fit=crop'],
  },
  {
    id: 'decathlon-genesis',
    title: 'Genesis Series',
    subtitle: 'Decathlon × Moorman Creative',
    tags: ['GENERATIVE AI', 'BRAND FILM'],
    year: '2025',
    category: 'CASE STUDY // GENERATIVE AI',
    challenge: 'Decathlon sought to launch their premium performance line with imagery that felt both technically credible and aspirationally beautiful — impossible to shoot practically within budget.',
    solution: 'A fully generative pipeline built on Stable Diffusion XL with custom athletic motion datasets, rendering over 3,200 unique frames that were composited into a seamless 90-second brand film.',
    techStack: ['PLATFORM: STABLE DIFFUSION XL + CONTROLNET', 'AI SYSTEM: CUSTOM ATHLETIC MOTION DATASET', 'PIPELINE: COMFYUI + AUTOMATIC1111', 'VFX: BLENDER 4.1 + HOUDINI', 'AUDIO: DOLBY ATMOS MIX', 'DELIVERY: BROADCAST MASTER (4K HDR10)'],
    heroImg: 'https://images.unsplash.com/photo-1784025173567-9ed10b66fdc1?w=1200&q=75&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1784025173567-9ed10b66fdc1?w=600&q=75&auto=format&fit=crop',
    processImgs: ['https://images.unsplash.com/photo-1566410824233-a8011929225c?w=500&q=75&auto=format&fit=crop', 'https://images.unsplash.com/photo-1688494963827-9f9dc1c51bd0?w=500&q=75&auto=format&fit=crop', 'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?w=500&q=75&auto=format&fit=crop'],
  },
  {
    id: 'aurora-ip',
    title: 'Aurora IP',
    subtitle: 'Original IP × Moorman Creative',
    tags: ['IP CREATION', 'WORLD-BUILDING', 'ANIMATION'],
    year: '2025',
    category: 'CASE STUDY // IP & WORLD-BUILDING',
    challenge: "Creating an entirely original animated IP universe with consistent character design, environments, and lore — traditionally a multi-year, multi-million endeavour — in a compressed 4-month pre-production window.",
    solution: "We developed a proprietary 'World Engine' — a suite of interlinked AI tools trained on the IP's visual bible — enabling our creative team to iterate characters, environments and story assets in real-time.",
    techStack: ['PLATFORM: CUSTOM WORLD ENGINE (INTERNAL)', 'AI SYSTEM: GPT-4o + CLAUDE 3.7 (NARRATIVE)', 'CONCEPT ART: MIDJOURNEY v7 + RUNWAY', 'ANIMATION: DRAGONFRAME + AFTER EFFECTS', 'WORLD-BUILD: UNREAL ENGINE 5 (NANITE)', 'AUDIO: SUNO AI + ABBEY ROAD SESSIONS'],
    heroImg: 'https://images.unsplash.com/photo-1770819372133-1ca304fc0687?w=1200&q=75&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1770819372133-1ca304fc0687?w=600&q=75&auto=format&fit=crop',
    processImgs: ['https://images.unsplash.com/photo-1784117954870-6235e05b09e0?w=500&q=75&auto=format&fit=crop', 'https://images.unsplash.com/photo-1761063443599-4c0edee38e61?w=500&q=75&auto=format&fit=crop', 'https://images.unsplash.com/photo-1779493600136-de0f30279b4a?w=500&q=75&auto=format&fit=crop'],
  },
  {
    id: 'phantom-systems',
    title: 'Phantom Systems',
    subtitle: 'Custom AI Infrastructure',
    tags: ['AI TRAINING', 'PIPELINE', 'BESPOKE'],
    year: '2025',
    category: 'CASE STUDY // CUSTOM AI SYSTEMS',
    challenge: 'A global luxury brand needed a proprietary image-generation system that could not be traced back to any public AI model — maintaining creative exclusivity and IP protection.',
    solution: 'We trained a fully closed, brand-specific diffusion model on 40 years of archival campaign imagery, running on isolated private compute with zero public model access.',
    techStack: ['PLATFORM: PRIVATE A100 CLUSTER', 'MODEL: CUSTOM DIFFUSION (CLOSED)', 'TRAINING: DREAMBOOTH + TEXTUAL INVERSION', 'INFERENCE: TRITON SERVER', 'SECURITY: ZERO-TRUST PIPELINE'],
    heroImg: 'https://images.unsplash.com/photo-1763656070600-b67cd4f2908a?w=1200&q=75&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1763656070600-b67cd4f2908a?w=600&q=75&auto=format&fit=crop',
    processImgs: ['https://images.unsplash.com/photo-1708779493105-9c743e367a3c?w=500&q=75&auto=format&fit=crop', 'https://images.unsplash.com/photo-1709625862266-014ef072fd93?w=500&q=75&auto=format&fit=crop', 'https://images.unsplash.com/photo-1784117954870-6235e05b09e0?w=500&q=75&auto=format&fit=crop'],
  },
]

const CLIENTS = ['NIKE', 'DECATHLON', 'HERMÈS', 'PORSCHE', 'LVMH', 'DIOR', 'RED BULL', 'ADIDAS']

// ─── Utility Components ───────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  )
}

function SplitHeadline({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  return (
    <span ref={ref} className={`inline ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <motion.span style={{ display: 'inline-block' }} initial={{ y: '110%', opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.9, delay: delay + i * 0.07, ease: EASE }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function ZoomCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group overflow-hidden ${className}`}>
      <motion.div className="w-full h-full" whileHover={{ scale: 1.04 }} transition={{ duration: 0.7, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border" style={{ borderColor: 'rgba(139,92,246,0.25)', color: '#A78BFA', background: 'rgba(139,92,246,0.06)' }}>
      {children}
    </span>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ page, setPage, lang, setLang }: { page: Page; setPage: (p: Page) => void; lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const tx = T[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const links: { label: string; page: Page }[] = [
    { label: tx.navWork, page: 'work' },
    { label: tx.navServices, page: 'services' },
    { label: tx.navAbout, page: 'about' },
    { label: tx.navContact, page: 'contact' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? '1px solid rgba(31,31,31,0.8)' : '1px solid transparent', transition: 'all 0.4s ease' }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <button onClick={() => go('home')} className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center" style={{ background: '#F4F1EA' }}>
          <img src={logoSrc} alt="Moorman Creative" className="w-6 h-6 object-contain" />
        </div>
        <span className="font-sans text-xs tracking-[0.18em] uppercase hidden sm:block" style={{ color: '#F4F1EA' }}>Moorman Creative</span>
      </button>

      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <button key={l.page} onClick={() => go(l.page)} className="relative font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: page === l.page ? '#A78BFA' : 'rgba(244,241,234,0.45)' }}>
            {l.label}
            {page === l.page && <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-px" style={{ background: '#A78BFA' }} transition={{ duration: 0.3 }} />}
          </button>
        ))}

        {/* Language toggle */}
        <div className="flex items-center rounded-full overflow-hidden border" style={{ borderColor: 'rgba(139,92,246,0.2)' }}>
          {(['en', 'nl'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 transition-all duration-300"
              style={{ background: lang === l ? 'rgba(139,92,246,0.15)' : 'transparent', color: lang === l ? '#A78BFA' : 'rgba(244,241,234,0.35)' }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={() => go('contact')}
          className="font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 border"
          style={{ borderColor: 'rgba(139,92,246,0.35)', color: '#A78BFA', background: 'rgba(139,92,246,0.06)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.14)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.06)' }}
        >
          {tx.navBook}
        </button>
      </div>

      {/* Mobile burger */}
      <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
        <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-5 h-px" style={{ background: '#F4F1EA' }} />
        <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-px" style={{ background: '#F4F1EA' }} />
        <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-5 h-px" style={{ background: '#F4F1EA' }} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 p-6 flex flex-col gap-5" style={{ background: 'rgba(13,13,13,0.97)', borderBottom: '1px solid #1F1F1F' }}>
            {links.map((l) => (
              <button key={l.page} onClick={() => go(l.page)} className="font-mono text-xs tracking-[0.2em] uppercase text-left" style={{ color: '#F4F1EA' }}>{l.label}</button>
            ))}
            <div className="flex gap-3 pt-2 border-t" style={{ borderColor: '#1F1F1F' }}>
              {(['en', 'nl'] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border" style={{ borderColor: 'rgba(139,92,246,0.3)', background: lang === l ? 'rgba(139,92,246,0.15)' : 'transparent', color: lang === l ? '#A78BFA' : 'rgba(244,241,234,0.4)' }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ─── PHILOSOPHY SCROLL SECTION ────────────────────────────────────────────────

function PhilosophySection({ lang }: { lang: Lang }) {
  const tx = T[lang]
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { n: '01', accent: tx.philAccent1, title: tx.philStep1Title, desc: tx.philStep1Desc, img: 'https://images.unsplash.com/photo-1784117954870-6235e05b09e0?w=800&q=75&auto=format&fit=crop' },
    { n: '02', accent: tx.philAccent2, title: tx.philStep2Title, desc: tx.philStep2Desc, img: 'https://images.unsplash.com/photo-1763668107913-0a4de300a5f7?w=800&q=75&auto=format&fit=crop' },
    { n: '03', accent: tx.philAccent3, title: tx.philStep3Title, desc: tx.philStep3Desc, img: 'https://images.unsplash.com/photo-1761506016540-58894c291320?w=800&q=75&auto=format&fit=crop' },
  ]

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v < 0.33) setActiveStep(0)
      else if (v < 0.66) setActiveStep(1)
      else setActiveStep(2)
    })
    return unsub
  }, [scrollYProgress])

  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left: crossfading images */}
          <div className="relative overflow-hidden h-full">
            {steps.map((step, i) => (
              <motion.div key={step.n} className="absolute inset-0" animate={{ opacity: activeStep === i ? 1 : 0, scale: activeStep === i ? 1 : 1.04 }} transition={{ duration: 0.9, ease: EASE }}>
                <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,13,13,0.35) 0%, rgba(13,13,13,0.05) 60%, rgba(13,13,13,0.5) 100%)' }} />
              </motion.div>
            ))}
            <div className="absolute bottom-10 left-10 z-10">
              <AnimatePresence mode="wait">
                <motion.div key={activeStep} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }}>
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(139,92,246,0.8)' }}>{steps[activeStep].accent}</div>
                  <div className="font-serif" style={{ fontSize: 'clamp(5rem, 10vw, 9rem)', color: 'rgba(244,241,234,0.07)', lineHeight: 1 }}>{steps[activeStep].n}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: text */}
          <div className="flex flex-col justify-between h-full px-12 py-16 lg:py-20" style={{ background: '#0D0D0D' }}>
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: '#A78BFA' }}>{tx.philLabel}</div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: '#F4F1EA', lineHeight: 1.05 }}>
                {tx.philTitle1}<br /><em>{tx.philTitle2}</em>
              </h2>
            </div>
            <div className="flex flex-col gap-0">
              <div className="relative h-px mb-8" style={{ background: 'rgba(31,31,31,0.8)' }}>
                <motion.div className="absolute left-0 top-0 h-full" style={{ width: progressBar, background: '#A78BFA' }} />
              </div>
              {steps.map((step, i) => (
                <motion.div key={step.n} className="flex gap-6 py-6" style={{ borderTop: '1px solid rgba(31,31,31,0.6)' }} animate={{ opacity: activeStep === i ? 1 : 0.3 }} transition={{ duration: 0.4 }}>
                  <div className="font-serif flex-shrink-0 leading-none" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: activeStep === i ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.1)', transition: 'color 0.4s' }}>{step.n}</div>
                  <div className="flex flex-col gap-2 pt-1 flex-1">
                    <div className="font-serif text-xl" style={{ color: '#F4F1EA' }}>{step.title}</div>
                    <motion.div animate={{ height: activeStep === i ? 'auto' : 0, opacity: activeStep === i ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ overflow: 'hidden' }}>
                      <p className="font-sans text-sm leading-relaxed pt-1" style={{ color: 'rgba(244,241,234,0.5)' }}>{step.desc}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div className="flex items-center gap-3" animate={{ opacity: activeStep === 2 ? 0 : 0.4 }} transition={{ duration: 0.4 }}>
              <div className="w-px h-8" style={{ background: 'rgba(139,92,246,0.4)' }} />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(244,241,234,0.4)' }}>{tx.philScrollHint}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ setPage, setActiveProject, lang }: { setPage: (p: Page) => void; setActiveProject: (id: string) => void; lang: Lang }) {
  const tx = T[lang]
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroBgY = useTransform(heroScroll, [0, 1], ['0%', '25%'])
  const heroTextOpacity = useTransform(heroScroll, [0, 0.5], [1, 0])
  const heroTextY = useTransform(heroScroll, [0, 0.5], ['0%', '-12%'])

  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const openProject = (id: string) => { setActiveProject(id); setPage('project'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div style={{ background: '#0D0D0D' }}>
      {/* ── FULL-BLEED HERO ── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: '100vh' }}>
        <motion.div className="absolute inset-0 w-full" style={{ y: heroBgY, scale: 1.12, transformOrigin: 'center center' }}>
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            onCanPlay={(event) => {
              event.currentTarget.play().catch(() => undefined)
            }}
            poster="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&q=75&auto=format&fit=crop"
            aria-label="Abstract purple and blue digital particle waves"
            className="hero-ai-video w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: EASE }}
          >
            <source src="https://videos.pexels.com/video-files/29306492/12637575_1920_1080_30fps.mp4" type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,5,16,0.62) 0%, rgba(13,8,28,0.18) 38%, rgba(12,7,24,0.3) 62%, rgba(8,5,16,0.9) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 65% at 50% 48%, rgba(168,85,247,0.1) 0%, transparent 46%, rgba(5,3,10,0.58) 100%)' }} />
        </motion.div>

        {/* Wordmark overlay */}
        <motion.div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" style={{ opacity: heroTextOpacity, y: heroTextY }}>
          <div className="w-full overflow-hidden px-4 md:px-8 text-center">
            <motion.h1
              className="font-serif whitespace-nowrap"
              style={{
                fontSize: 'clamp(2.55rem, 9vw, 9rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.045em',
                backgroundImage: 'linear-gradient(105deg, #F4F1EA 8%, #DDD6FE 42%, #A78BFA 72%, #F0ABFC 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 12px 38px rgba(76,29,149,0.28))',
              }}
              initial={{ y: '115%', opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.35, delay: 0.15, ease: EASE }}
            >
              Moorman Creative
            </motion.h1>
          </div>
        </motion.div>
      </section>

      {/* ── HEADLINE BELOW HERO ── */}
      <section className="max-w-[1400px] mx-auto px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div>
            <FadeUp>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: '#A78BFA' }}>{tx.headlineTag}</div>
            </FadeUp>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: '#F4F1EA', lineHeight: 0.95, letterSpacing: '-0.01em' }}>
              <SplitHeadline text={tx.headline1} delay={0} />
              <br />
              <SplitHeadline text={tx.headline2} delay={0.1} className="font-serif italic" />
              <br />
              <SplitHeadline text={tx.headline3} delay={0.2} />
            </h2>
          </div>
          <div className="flex flex-col gap-10 lg:pt-20">
            <FadeUp delay={0.3}>
              <p className="font-sans text-base leading-relaxed" style={{ color: 'rgba(244,241,234,0.5)', maxWidth: '420px' }}>{tx.heroDesc}</p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => go('work')} className="font-mono text-[11px] tracking-[0.2em] uppercase px-7 py-4 rounded-full transition-all duration-300" style={{ background: '#F4F1EA', color: '#0D0D0D' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#A78BFA' }} onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F1EA' }}>{tx.ctaWork}</button>
                <button onClick={() => go('contact')} className="font-mono text-[11px] tracking-[0.2em] uppercase px-7 py-4 rounded-full transition-all duration-300 border" style={{ borderColor: 'rgba(244,241,234,0.2)', color: '#F4F1EA', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(244,241,234,0.5)' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(244,241,234,0.2)' }}>{tx.ctaBook}</button>
              </div>
            </FadeUp>
            <FadeUp delay={0.5}>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t" style={{ borderColor: 'rgba(31,31,31,0.8)' }}>
                {([['stat1n', 'stat1l'], ['stat2n', 'stat2l'], ['stat3n', 'stat3l']] as [TKeys, TKeys][]).map(([nk, lk]) => (
                  <div key={nk}>
                    <div className="font-serif text-3xl" style={{ color: '#F4F1EA' }}>{tx[nk]}</div>
                    <div className="font-mono text-[10px] tracking-wider mt-1 leading-tight whitespace-pre-line" style={{ color: '#7A7265' }}>{tx[lk]}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-14 border-y" style={{ borderColor: '#1F1F1F' }}>
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-center mb-10" style={{ color: 'rgba(244,241,234,0.2)' }}>{tx.trustLabel}</div>
            <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-5">
              {CLIENTS.map((c) => (
                <span key={c} className="font-mono text-xs tracking-[0.2em]" style={{ color: 'rgba(244,241,234,0.13)' }}>{c}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="luxury-home-work py-28 max-w-[1400px] mx-auto px-8">
        <FadeUp>
          <div className="luxury-home-work-header mb-16">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#A78BFA' }}>{tx.workLabel}</div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#F4F1EA', lineHeight: 1 }}>
                {tx.workTitle1}<br /><em>{tx.workTitle2}</em>
              </h2>
            </div>
            <div className="hidden md:flex luxury-home-work-aside">
              <span className="luxury-home-work-line" />
              <p>
                {lang === 'en'
                  ? 'Selected collaborations where cinematic direction and proprietary technology move as one.'
                  : 'Geselecteerde samenwerkingen waarin cinematografische regie en eigen technologie als één geheel bewegen.'}
              </p>
              <button onClick={() => go('work')} className="luxury-home-work-link">
                {tx.workViewAll} <span>↗</span>
              </button>
            </div>
          </div>
        </FadeUp>
        <div className="luxury-home-work-grid">
          {PROJECTS.slice(0, 3).map((proj, i) => (
            <FadeUp key={proj.id} delay={i * 0.1} className={`luxury-home-work-item luxury-home-work-item-${i + 1}`}>
              <ProjectCard project={proj} onClick={() => openProject(proj.id)} large={i === 0} index={i} lang={lang} />
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.3} className="flex justify-center mt-12">
          <button onClick={() => go('work')} className="font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 border" style={{ borderColor: 'rgba(139,92,246,0.3)', color: '#A78BFA', background: 'rgba(139,92,246,0.04)' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.04)' }}>
            {tx.workViewAllBtn}
          </button>
        </FadeUp>
      </section>

      {/* ── PHILOSOPHY SCROLL ── */}
      <section className="border-t" style={{ borderColor: '#1F1F1F' }}>
        <PhilosophySection lang={lang} />
      </section>

      <CTASection setPage={setPage} lang={lang} />
      <Footer setPage={setPage} lang={lang} />
    </div>
  )
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ project, onClick, large = false, lang, index }: { project: Project; onClick: () => void; large?: boolean; lang: Lang; index?: number }) {
  const [hovered, setHovered] = useState(false)
  const tx = T[lang]
  return (
    <motion.div
      className="project-card relative overflow-hidden rounded-2xl cursor-pointer w-full h-full"
      style={{ border: '1px solid #1F1F1F', background: '#111111' }}
      whileHover={{ borderColor: 'rgba(139,92,246,0.25)' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.img src={project.thumbImg} alt={project.title} className="w-full h-full object-cover absolute inset-0" animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration: 0.8, ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.25) 55%, transparent 100%)' }} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), transparent 42%)' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      {index !== undefined && (
        <div className="absolute top-5 right-6 font-mono text-[10px] tracking-[0.2em]" style={{ color: 'rgba(244,241,234,0.2)' }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
        <div className="flex gap-2 flex-wrap">{project.tags.slice(0, 2).map((t) => <Tag key={t}>{t}</Tag>)}</div>
        <div>
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(139,92,246,0.7)' }}>{project.category}</div>
          <h3 className="font-serif mb-1" style={{ fontSize: large ? 'clamp(2rem, 3vw, 3.5rem)' : 'clamp(1.35rem, 2vw, 2rem)', color: '#F4F1EA', lineHeight: 1.05 }}>{project.title}</h3>
          <div className="font-sans text-xs" style={{ color: 'rgba(244,241,234,0.4)' }}>{project.subtitle}</div>
          <motion.div className="flex items-center gap-2 mt-4 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: '#A78BFA' }} animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }} transition={{ duration: 0.3 }}>
            {tx.viewCaseStudy}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── WORK PAGE ────────────────────────────────────────────────────────────────

function WorkPage({ setPage, setActiveProject, lang }: { setPage: (p: Page) => void; setActiveProject: (id: string) => void; lang: Lang }) {
  const tx = T[lang]
  const openProject = (id: string) => { setActiveProject(id); setPage('project'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  // Layout: [large hero full-width], then pairs + singles in editorial bento
  const heroProject = PROJECTS[0]
  const restProjects = PROJECTS.slice(1)

  return (
    <div style={{ background: '#0D0D0D', paddingTop: '100px' }}>
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-end">
          <div>
            <FadeUp>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#A78BFA' }}>
                {tx.workPageTag} — {new Date().getFullYear()}
              </div>
            </FadeUp>
            <h1 className="font-serif" style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', color: '#F4F1EA', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
              <SplitHeadline text={tx.workPageH1} />
              <br />
              <SplitHeadline text={tx.workPageH2} delay={0.15} className="font-serif italic" />
            </h1>
          </div>
          <FadeUp delay={0.3}>
            <p className="font-sans text-base leading-relaxed" style={{ color: 'rgba(244,241,234,0.4)', maxWidth: '420px' }}>{tx.workPageDesc}</p>
          </FadeUp>
        </div>
      </div>

      {/* Full-width featured project */}
      <FadeUp className="px-8 mb-4 max-w-[1400px] mx-auto">
        <div style={{ height: '580px' }}>
          <ProjectCard project={heroProject} onClick={() => openProject(heroProject.id)} large index={0} lang={lang} />
        </div>
      </FadeUp>

      {/* Separator */}
      <div className="max-w-[1400px] mx-auto px-8 py-8 flex items-center gap-6">
        <div className="h-px flex-1" style={{ background: 'rgba(31,31,31,0.8)' }} />
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(244,241,234,0.2)' }}>MORE PROJECTS</span>
        <div className="h-px flex-1" style={{ background: 'rgba(31,31,31,0.8)' }} />
      </div>

      {/* Rest: editorial bento — first two side by side tall, last one full-width shorter */}
      <div className="max-w-[1400px] mx-auto px-8 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {restProjects.slice(0, 2).map((proj, i) => (
            <FadeUp key={proj.id} delay={i * 0.12}>
              <div style={{ height: '460px' }}>
                <ProjectCard project={proj} onClick={() => openProject(proj.id)} index={i + 1} lang={lang} />
              </div>
            </FadeUp>
          ))}
        </div>
        {restProjects[2] && (
          <FadeUp delay={0.2}>
            <div style={{ height: '400px' }}>
              <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 h-full">
                <ProjectCard project={restProjects[2]} onClick={() => openProject(restProjects[2].id)} large index={3} lang={lang} />
                {/* Editorial text card */}
                <div className="rounded-2xl flex flex-col justify-between p-10 border" style={{ background: '#111111', borderColor: '#1F1F1F' }}>
                  <div className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(244,241,234,0.2)' }}>MOORMAN CREATIVE — {new Date().getFullYear()}</div>
                  <div>
                    <div className="font-serif mb-4" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', color: '#F4F1EA', lineHeight: 1.1 }}>
                      {lang === 'en' ? <>Every frame.<br /><em>A decision.</em></> : <>Elk frame.<br /><em>Een keuze.</em></>}
                    </div>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.4)' }}>
                      {lang === 'en'
                        ? 'We never let AI replace creative judgement. Every output is reviewed, directed, and elevated by human craft.'
                        : 'Wij laten AI nooit het creatieve oordeel vervangen. Elke output wordt beoordeeld, gestuurd en verheven door menselijk vakmanschap.'}
                    </p>
                  </div>
                  <button
                    onClick={() => { setPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-full self-start transition-all duration-300"
                    style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', color: '#A78BFA' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.15)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.08)' }}
                  >
                    {tx.ctaBook} →
                  </button>
                </div>
              </div>
            </div>
          </FadeUp>
        )}
      </div>

      <CTASection setPage={setPage} lang={lang} />
      <Footer setPage={setPage} lang={lang} />
    </div>
  )
}

// ─── PROJECT DETAIL PAGE ──────────────────────────────────────────────────────

function ProjectDetailPage({ projectId, setPage, lang }: { projectId: string; setPage: (p: Page) => void; lang: Lang }) {
  const project = PROJECTS.find((p) => p.id === projectId) ?? PROJECTS[0]
  const tx = T[lang]
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div style={{ background: '#0D0D0D' }}>
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.img src={project.heroImg} alt={project.title} className="w-full h-full object-cover" style={{ scale: heroScale }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.2) 0%, rgba(13,13,13,0.6) 70%, #0D0D0D 100%)' }} />
        <motion.div className="absolute inset-0 flex flex-col justify-end pb-20 px-8 max-w-[1400px] mx-auto" style={{ opacity: heroOpacity }}>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#A78BFA' }}>{project.category}</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: '#F4F1EA', lineHeight: 1 }}>{project.title}</h1>
          <div className="font-sans text-base mt-3" style={{ color: 'rgba(244,241,234,0.5)' }}>{project.subtitle} — {project.year}</div>
        </motion.div>
      </div>
      <section className="py-28 max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeUp>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#F4F1EA', lineHeight: 1 }}>{project.title}<br /><em>{tx.projOverview}</em></h2>
            <div className="flex flex-wrap gap-2 mt-6">{project.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <FadeUp delay={0.1}>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: '#A78BFA' }}>{tx.projChallenge}</div>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.55)' }}>{project.challenge}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: '#A78BFA' }}>{tx.projSolution}</div>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.55)' }}>{project.solution}</p>
            </FadeUp>
          </div>
        </div>
      </section>
      <section className="py-16 border-t" style={{ borderColor: '#1F1F1F' }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <FadeUp className="mb-14">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: '#A78BFA' }}>{tx.projProcess}</div>
            <h3 className="font-serif text-3xl" style={{ color: '#F4F1EA' }}>{tx.projProcessTitle}</h3>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {([[tx.projRough, project.processImgs[0]], [tx.projGen, project.processImgs[1]], [tx.projFinal, project.processImgs[2]]] as [string, string][]).map(([label, img], i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <div className="overflow-hidden rounded-xl" style={{ border: '1px solid #1F1F1F', aspectRatio: '4/3' }}>
                  <ZoomCard className="w-full h-full"><img src={img} alt={label} className="w-full h-full object-cover" /></ZoomCard>
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase mt-3" style={{ color: 'rgba(139,92,246,0.6)' }}>{label}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <section className="py-28 border-t" style={{ borderColor: '#1F1F1F' }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            <FadeUp>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#A78BFA' }}>{tx.projTech}</div>
              <h3 className="font-serif text-3xl" style={{ color: '#F4F1EA' }}>{tx.projTechTitle}<br /><em>{tx.projTechTitle2}</em></h3>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.techStack.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-xl" style={{ background: '#111111', border: '1px solid #1F1F1F' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#A78BFA' }} />
                    <span className="font-mono text-[11px] tracking-wider" style={{ color: 'rgba(244,241,234,0.65)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <section className="py-28 border-t text-center" style={{ borderColor: '#1F1F1F' }}>
        <FadeUp>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#A78BFA' }}>{tx.projNext}</div>
          <h2 className="font-serif mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F4F1EA' }}>{tx.projNextTitle1}<br /><em>{tx.projNextTitle2}</em></h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => go('work')} className="font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 border" style={{ borderColor: 'rgba(139,92,246,0.3)', color: '#A78BFA', background: 'rgba(139,92,246,0.04)' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.04)' }}>{tx.projViewMore}</button>
            <button onClick={() => go('contact')} className="font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300" style={{ background: '#F4F1EA', color: '#0D0D0D' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#A78BFA' }} onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F1EA' }}>{tx.projStart}</button>
          </div>
        </FadeUp>
      </section>
      <Footer setPage={setPage} lang={lang} />
    </div>
  )
}

// ─── SERVICES: Sticky Scroll ──────────────────────────────────────────────────

function ServicesPage({ setPage, lang }: { setPage: (p: Page) => void; lang: Lang }) {
  const tx = T[lang]
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [activeService, setActiveService] = useState(0)

  const services = [
    { n: '01', title: tx.svc1Title, desc: tx.svc1Desc, tags: tx.svc1Tags, img: 'https://images.unsplash.com/photo-1779398555682-1ca05add6405?w=800&q=75&auto=format&fit=crop' },
    { n: '02', title: tx.svc2Title, desc: tx.svc2Desc, tags: tx.svc2Tags, img: 'https://images.unsplash.com/photo-1687894986595-da703eb96375?w=800&q=75&auto=format&fit=crop' },
    { n: '03', title: tx.svc3Title, desc: tx.svc3Desc, tags: tx.svc3Tags, img: 'https://images.unsplash.com/photo-1770819372133-1ca304fc0687?w=800&q=75&auto=format&fit=crop' },
  ]

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v < 0.33) setActiveService(0)
      else if (v < 0.66) setActiveService(1)
      else setActiveService(2)
    })
    return unsub
  }, [scrollYProgress])

  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div style={{ background: '#0D0D0D', paddingTop: '100px' }}>
      {/* Page header */}
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-20 text-center">
        <FadeUp>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#A78BFA' }}>{tx.svcWhat}</div>
        </FadeUp>
        <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: '#F4F1EA', lineHeight: 0.95 }}>
          <SplitHeadline text={tx.svcH1} />
          <br />
          <SplitHeadline text={tx.svcH2} delay={0.2} className="font-serif italic" />
        </h1>
        <FadeUp delay={0.4}>
          <p className="font-sans text-base mt-8 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(244,241,234,0.4)' }}>{tx.svcSub}</p>
        </FadeUp>
      </div>

      {/* Sticky scroll — 300vh */}
      <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

            {/* LEFT: service detail text */}
            <div className="flex flex-col justify-between h-full px-12 py-16 lg:py-20 order-2 lg:order-1" style={{ background: '#0D0D0D' }}>
              {/* Progress bar */}
              <div className="relative h-px" style={{ background: 'rgba(31,31,31,0.8)' }}>
                <motion.div className="absolute left-0 top-0 h-full" style={{ width: progressBar, background: '#A78BFA' }} />
              </div>

              {/* Active service detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex flex-col gap-6 flex-1 justify-center"
                >
                  <div className="font-serif" style={{ fontSize: 'clamp(5rem, 8vw, 7rem)', color: 'rgba(139,92,246,0.1)', lineHeight: 1 }}>
                    {services[activeService].n}
                  </div>
                  <h2
                    className="font-serif"
                    style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)', color: '#F4F1EA', lineHeight: 1.1, whiteSpace: 'pre-line' }}
                  >
                    {services[activeService].title}
                  </h2>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.5)', maxWidth: '420px' }}>
                    {services[activeService].desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {services[activeService].tags.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Service nav dots */}
              <div className="flex flex-col gap-3">
                {services.map((svc, i) => (
                  <div
                    key={svc.n}
                    className="flex items-center gap-4 py-4 border-t"
                    style={{ borderColor: 'rgba(31,31,31,0.6)', opacity: activeService === i ? 1 : 0.35, transition: 'opacity 0.4s' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-400" style={{ background: activeService === i ? '#A78BFA' : 'rgba(139,92,246,0.25)' }} />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: activeService === i ? '#F4F1EA' : 'rgba(244,241,234,0.35)' }}>
                      {svc.n} — {svc.title.split('\n')[0]}
                    </span>
                  </div>
                ))}
                <motion.div className="flex items-center gap-3 mt-3" animate={{ opacity: activeService === 2 ? 0 : 0.4 }} transition={{ duration: 0.4 }}>
                  <div className="w-px h-6" style={{ background: 'rgba(139,92,246,0.4)' }} />
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(244,241,234,0.4)' }}>{tx.svcScrollHint}</span>
                </motion.div>
              </div>
            </div>

            {/* RIGHT: crossfading images */}
            <div className="relative overflow-hidden h-full order-1 lg:order-2" style={{ minHeight: '40vh' }}>
              {services.map((svc, i) => (
                <motion.div key={svc.n} className="absolute inset-0" animate={{ opacity: activeService === i ? 1 : 0, scale: activeService === i ? 1 : 1.05 }} transition={{ duration: 0.9, ease: EASE }}>
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, transparent 50%, rgba(13,13,13,0.3) 100%)' }} />
                </motion.div>
              ))}
              {/* Floating service number on image */}
              <div className="absolute bottom-10 right-10 z-10 text-right">
                <AnimatePresence mode="wait">
                  <motion.div key={activeService} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: EASE }}>
                    <div className="font-serif" style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', color: 'rgba(244,241,234,0.06)', lineHeight: 1 }}>
                      {services[activeService].n}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection setPage={setPage} lang={lang} />
      <Footer setPage={setPage} lang={lang} />
    </div>
  )
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

function AboutPage({ setPage, lang }: { setPage: (p: Page) => void; lang: Lang }) {
  const tx = T[lang]
  const founder = {
    name: 'Joren Moorman',
    role: lang === 'en' ? 'Founder & Creative Director' : 'Oprichter & Creatief Directeur',
    img: 'https://images.unsplash.com/photo-1770062421988-7929b4748e29?w=900&q=82&auto=format&fit=crop',
  }

  return (
    <div style={{ background: '#0D0D0D', paddingTop: '100px' }}>
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-24">
        <FadeUp><div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#A78BFA' }}>{tx.aboutTag}</div></FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-end">
          <h1 className="font-serif" style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)', color: '#F4F1EA', lineHeight: 0.95 }}>
            <SplitHeadline text={tx.aboutH1} /><br />
            <SplitHeadline text={tx.aboutH2} delay={0.15} /><br />
            <SplitHeadline text={tx.aboutH3} delay={0.3} className="font-serif italic" />
          </h1>
          <FadeUp delay={0.4}>
            <p className="font-sans text-base leading-relaxed mb-5" style={{ color: 'rgba(244,241,234,0.5)' }}>{tx.aboutP1}</p>
            <p className="font-sans text-base leading-relaxed" style={{ color: 'rgba(244,241,234,0.5)' }}>{tx.aboutP2}</p>
          </FadeUp>
        </div>
      </div>
      <FadeUp>
        <div className="mx-8 lg:mx-16 overflow-hidden rounded-2xl mb-28" style={{ aspectRatio: '21/8', border: '1px solid #1F1F1F' }}>
          <ZoomCard className="w-full h-full"><img src="https://images.unsplash.com/photo-1784117954870-6235e05b09e0?w=1200&q=75&auto=format&fit=crop" alt="Moorman Creative studio" className="w-full h-full object-cover" /></ZoomCard>
        </div>
      </FadeUp>
      <div className="max-w-[1400px] mx-auto px-8 pb-28">
        <FadeUp className="mb-16">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#A78BFA' }}>{tx.aboutPrinciplesTag}</div>
          <h2 className="font-serif text-4xl" style={{ color: '#F4F1EA' }}>{tx.aboutPrinciplesTitle}</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {([['p1Title', 'p1Desc'], ['p2Title', 'p2Desc'], ['p3Title', 'p3Desc']] as [TKeys, TKeys][]).map(([tk, dk], i) => (
            <FadeUp key={tk} delay={i * 0.1}>
              <div className="p-8 rounded-2xl h-full" style={{ background: '#111111', border: '1px solid #1F1F1F' }}>
                <div className="font-serif text-xl mb-4" style={{ color: '#F4F1EA' }}>{tx[tk]}</div>
                <div className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.45)' }}>{tx[dk]}</div>
              </div>
            </FadeUp>
          ))}
        </div>
        <FounderProfile founder={founder} tx={tx} />
      </div>
      <CTASection setPage={setPage} lang={lang} />
      <Footer setPage={setPage} lang={lang} />
    </div>
  )
}

function FounderProfile({ founder, tx }: {
  founder: { name: string; role: string; img: string }
  tx: { teamTag: string; teamTitle1: string; teamTitle2: string; teamBio: string }
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <section ref={ref} className="luxury-founder">
      <motion.div
        className="luxury-founder-heading"
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#A78BFA' }}>{tx.teamTag}</div>
        <h2 className="font-serif" style={{ color: '#F4F1EA' }}>{tx.teamTitle1}<br /><em>{tx.teamTitle2}</em></h2>
      </motion.div>

      <div className="luxury-founder-layout">
        <motion.div
          className="luxury-founder-portrait"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 1.2, delay: 0.12, ease: EASE }}
        >
          <motion.img
            src={founder.img}
            alt={founder.name}
            className="luxury-founder-image"
            style={{ y: portraitY }}
            initial={{ scale: 1.12 }}
            animate={inView ? { scale: 1.04 } : {}}
            transition={{ duration: 1.5, ease: EASE }}
          />
          <div className="luxury-founder-shade" />
          <motion.span
            className="luxury-founder-index"
            initial={{ opacity: 0, x: -14 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.82, duration: 0.7 }}
          >
            FOUNDER — 001
          </motion.span>
        </motion.div>

        <div className="luxury-founder-copy">
          <motion.div
            className="luxury-founder-role"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.36, duration: 0.8, ease: EASE }}
          >
            {founder.role}
          </motion.div>

          <div className="luxury-founder-name">
            {founder.name.split(' ').map((word, index) => (
              <span key={word}>
                <motion.span
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ delay: 0.42 + index * 0.12, duration: 0.9, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.div
            className="luxury-founder-rule"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.72, duration: 0.9, ease: EASE }}
          />

          <motion.p
            className="luxury-founder-bio"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.78, duration: 0.9, ease: EASE }}
          >
            {tx.teamBio}
          </motion.p>

          <motion.div
            className="luxury-founder-location"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.7 }}
          >
            AMSTERDAM — GLOBAL
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

function ContactPage({ setPage, lang }: { setPage: (p: Page) => void; lang: Lang }) {
  const tx = T[lang]
  const [form, setForm] = useState({ name: '', email: '', company: '', brief: '', budget: '' })
  const [sent, setSent] = useState(false)
  const handle = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <div style={{ background: '#0D0D0D', paddingTop: '100px' }}>
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20">
          <div>
            <FadeUp>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#A78BFA' }}>{tx.contactTag}</div>
              <h1 className="font-serif mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#F4F1EA', lineHeight: 0.95 }}>
                <SplitHeadline text={tx.contactH1} /><br />
                <SplitHeadline text={tx.contactH2} delay={0.1} /><br />
                <SplitHeadline text={tx.contactH3} delay={0.2} className="font-serif italic" />
              </h1>
              <p className="font-sans text-sm leading-relaxed mb-12" style={{ color: 'rgba(244,241,234,0.45)', maxWidth: '380px' }}>{tx.contactSub}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-6">
                {([['contactNB', 'hello@moorman.studio'], ['contactPress', 'press@moorman.studio'], ['contactCareers', 'join@moorman.studio']] as [TKeys, string][]).map(([labelKey, email]) => (
                  <div key={email}>
                    <div className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: '#7A7265' }}>{tx[labelKey]}</div>
                    <div className="font-sans text-sm" style={{ color: '#F4F1EA' }}>{email}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.35} className="mt-16">
              <div className="pt-10 border-t" style={{ borderColor: '#1F1F1F' }}>
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase mb-4" style={{ color: '#7A7265' }}>{tx.contactCity}</div>
                <p className="font-sans text-sm" style={{ color: 'rgba(244,241,234,0.35)' }}>{tx.contactAddr}</p>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.15}>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form key="form" onSubmit={handle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-5 p-10 rounded-2xl" style={{ background: '#111111', border: '1px solid #1F1F1F' }}>
                  {([['name', tx.formName, 'text', 'Joren Moorman'], ['email', tx.formEmail, 'email', 'hello@brand.com'], ['company', tx.formCompany, 'text', 'Nike Global']] as [string, string, string, string][]).map(([id, label, type, ph]) => (
                    <div key={id}>
                      <label className="font-mono text-[9px] tracking-[0.25em] uppercase block mb-2" style={{ color: '#7A7265' }}>{label}</label>
                      <input type={type} placeholder={ph} value={form[id as keyof typeof form]} onChange={(e) => setForm({ ...form, [id]: e.target.value })} required className="w-full px-4 py-3.5 rounded-xl font-sans text-sm outline-none" style={{ background: '#161616', border: '1px solid #2A2A2A', color: '#F4F1EA' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#2A2A2A' }} />
                    </div>
                  ))}
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.25em] uppercase block mb-2" style={{ color: '#7A7265' }}>{tx.formBudget}</label>
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full px-4 py-3.5 rounded-xl font-sans text-sm outline-none cursor-pointer" style={{ background: '#161616', border: '1px solid #2A2A2A', color: form.budget ? '#F4F1EA' : '#7A7265' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#2A2A2A' }}>
                      <option value="" style={{ background: '#161616' }}>{tx.formBudgetPh}</option>
                      <option value="25k-50k" style={{ background: '#161616' }}>€25.000 — €50.000</option>
                      <option value="50k-150k" style={{ background: '#161616' }}>€50.000 — €150.000</option>
                      <option value="150k-500k" style={{ background: '#161616' }}>€150.000 — €500.000</option>
                      <option value="500k+" style={{ background: '#161616' }}>€500.000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.25em] uppercase block mb-2" style={{ color: '#7A7265' }}>{tx.formBrief}</label>
                    <textarea rows={4} placeholder={tx.formBriefPh} value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} className="w-full px-4 py-3.5 rounded-xl font-sans text-sm outline-none resize-none" style={{ background: '#161616', border: '1px solid #2A2A2A', color: '#F4F1EA' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#2A2A2A' }} />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl font-mono text-[11px] tracking-[0.25em] uppercase transition-all duration-300 mt-2" style={{ background: '#F4F1EA', color: '#0D0D0D' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#A78BFA' }} onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F1EA' }}>{tx.formSend}</button>
                </motion.form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center p-16 rounded-2xl text-center" style={{ background: '#111111', border: '1px solid rgba(139,92,246,0.2)', minHeight: '500px' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-8" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)' }}>
                    <span style={{ color: '#A78BFA', fontSize: '1.5rem' }}>✓</span>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#A78BFA' }}>{tx.formSuccessTag}</div>
                  <h3 className="font-serif text-3xl mb-4" style={{ color: '#F4F1EA' }}>{tx.formSuccessTitle}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.45)', maxWidth: '300px' }}>{tx.formSuccessDesc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeUp>
        </div>
      </div>
      <Footer setPage={setPage} lang={lang} />
    </div>
  )
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection({ setPage, lang }: { setPage: (p: Page) => void; lang: Lang }) {
  const tx = T[lang]
  const [email, setEmail] = useState('')
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <section className="mx-8 lg:mx-16 mb-4 overflow-hidden rounded-3xl" style={{ background: '#F4F1EA' }}>
      <div className="max-w-[1200px] mx-auto px-10 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(13,13,13,0.35)' }}>{tx.ctaLabel}</div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#0D0D0D', lineHeight: 1 }}>
              {tx.ctaTitle1}<br /><em>{tx.ctaTitle2}</em>
            </h2>
            <p className="font-sans text-sm mt-6 leading-relaxed" style={{ color: 'rgba(13,13,13,0.5)', maxWidth: '340px' }}>{tx.ctaDesc}</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder={tx.ctaPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl font-sans text-sm outline-none" style={{ background: 'rgba(13,13,13,0.06)', border: '1px solid rgba(13,13,13,0.12)', color: '#0D0D0D' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(13,13,13,0.3)' }} onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(13,13,13,0.12)' }} />
              <button onClick={() => go('contact')} className="w-full py-4 rounded-2xl font-mono text-[11px] tracking-[0.25em] uppercase transition-all duration-300" style={{ background: '#0D0D0D', color: '#F4F1EA' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#A78BFA'; e.currentTarget.style.color = '#0D0D0D' }} onMouseLeave={(e) => { e.currentTarget.style.background = '#0D0D0D'; e.currentTarget.style.color = '#F4F1EA' }}>{tx.ctaBtn}</button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ setPage, lang }: { setPage: (p: Page) => void; lang: Lang }) {
  const tx = T[lang]
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const year = new Date().getFullYear()

  const navLinks: [string, Page][] = [
    [lang === 'en' ? 'Home' : 'Home', 'home'],
    [tx.navWork, 'work'],
    [tx.navServices, 'services'],
    [tx.navAbout, 'about'],
    [tx.navContact, 'contact'],
  ]

  return (
    <footer className="max-w-[1400px] mx-auto px-8 py-16 border-t" style={{ borderColor: '#1F1F1F' }}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center" style={{ background: '#F4F1EA' }}>
              <img src={logoSrc} alt="Moorman Creative" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-sans text-xs tracking-[0.15em] uppercase" style={{ color: '#F4F1EA' }}>Moorman Creative</span>
          </div>
          <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(244,241,234,0.3)', maxWidth: '200px' }}>{tx.footerDesc}</p>
        </div>
        <div>
          <div className="font-mono text-[9px] tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(244,241,234,0.25)' }}>{tx.footerNav}</div>
          <div className="flex flex-col gap-2">
            {navLinks.map(([label, pg]) => (
              <button key={pg} onClick={() => go(pg)} className="font-sans text-xs text-left transition-colors duration-300" style={{ color: 'rgba(244,241,234,0.35)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#F4F1EA' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244,241,234,0.35)' }}>{label}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-[9px] tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(244,241,234,0.25)' }}>{tx.footerSvc}</div>
          <div className="flex flex-col gap-2">
            {[tx.svc1Title.split('\n')[0], tx.svc2Title.split('\n')[0], tx.svc3Title.split('\n')[0]].map((s) => (
              <button key={s} onClick={() => go('services')} className="font-sans text-xs text-left transition-colors duration-300" style={{ color: 'rgba(244,241,234,0.35)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#F4F1EA' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244,241,234,0.35)' }}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-[9px] tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(244,241,234,0.25)' }}>{tx.footerConnect}</div>
          <div className="flex flex-col gap-2">
            {['Instagram', 'LinkedIn', 'Vimeo'].map((name) => (
              <span key={name} className="font-sans text-xs cursor-pointer transition-colors duration-300" style={{ color: 'rgba(244,241,234,0.35)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#F4F1EA' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244,241,234,0.35)' }}>{name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t" style={{ borderColor: '#1A1A1A' }}>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(244,241,234,0.2)' }}>© {year} MOORMAN CREATIVE. {tx.footerRights}</span>
        <div className="flex gap-6">
          {[tx.footerPrivacy, tx.footerTerms].map((t) => (
            <span key={t} className="font-mono text-[9px] tracking-[0.2em] uppercase cursor-pointer transition-colors duration-300" style={{ color: 'rgba(244,241,234,0.2)' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(244,241,234,0.5)' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244,241,234,0.2)' }}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Page Transition ──────────────────────────────────────────────────────────

function PageTransition({ children, pageKey }: { children: React.ReactNode; pageKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pageKey} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Wrapper for react-router-dom navigation ─────────────────────────────────

function AppContent() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id)
  const [lang, setLang] = useState<Lang>('en')
  const [page, setPage] = useState<Page>('home')
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])

  const nav = (p: Page) => {
    const path = p === 'home' ? '/' : p === 'project' ? '/work/details/' + activeProject : p === 'services' ? '/service' : '/' + p
    setPage(p)
    navigate(path)
  }

  const pageMap: Record<string, Page> = {
    '/': 'home',
    '/work': 'work',
    '/service': 'services',
    '/about': 'about',
    '/contact': 'contact',
  }

  // Determine current page from URL
  const path = window.location.pathname
  const basePath = '/' + path.split('/')[1]
  const currentPage: Page = pageMap[basePath] || 'home'
  const routeProjectId = path.match(/^\/work\/details\/([^/]+)\/?$/)?.[1]
  const routeProject = PROJECTS.find((project) => project.id === routeProjectId)

  const renderPage = () => {
    if (basePath === '/work' && path.includes('/details/')) {
      return <ProjectDetailPage projectId={routeProject?.id ?? activeProject} setPage={nav} lang={lang} />
    }
    switch (basePath) {
      case '/': return <HomePage setPage={nav} setActiveProject={setActiveProject} lang={lang} />
      case '/work': return <WorkPage setPage={nav} setActiveProject={setActiveProject} lang={lang} />
      case '/service': return <ServicesPage setPage={nav} lang={lang} />
      case '/about': return <AboutPage setPage={nav} lang={lang} />
      case '/contact': return <ContactPage setPage={nav} lang={lang} />
      default: return <HomePage setPage={nav} setActiveProject={setActiveProject} lang={lang} />
    }
  }

  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh' }}>
      <Nav page={currentPage} setPage={nav} lang={lang} setLang={setLang} />
      <PageTransition pageKey={path}>
        {renderPage()}
      </PageTransition>
    </div>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
