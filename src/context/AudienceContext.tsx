import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type Audience = "recruiter" | "admissions" | "client";

export type AudienceProfile = {
  id: Audience;
  label: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  iconName: "briefcase" | "graduation" | "handshake";
  sectionLabel: string;
  proofPoints: Array<{ value: string; label: string }>;
  routeDescription: string;
};

export const audienceProfiles: AudienceProfile[] = [
  {
    id: "recruiter",
    label: "I’m hiring",
    shortLabel: "Recruiter",
    eyebrow: "Software engineer · builder · teammate",
    title: "A young engineer who turns ambitious ideas into shipped products.",
    description: "See the technical range, ownership, and leadership behind the work — from AI prototypes to production-minded applications.",
    primaryCta: "Explore my work",
    primaryHref: "/work",
    secondaryCta: "Download CV",
    iconName: "briefcase",
    sectionLabel: "A quick scan for hiring teams",
    proofPoints: [
      { value: "3+ yrs", label: "building software" },
      { value: "100%", label: "project delivery" },
      { value: "AI + mobile", label: "technical range" }
    ],
    routeDescription: "Start with selected work, then trace the engineering habits and ownership behind it."
  },
  {
    id: "admissions",
    label: "I’m reviewing an application",
    shortLabel: "Admissions",
    eyebrow: "Student founder · scholar · community builder",
    title: "Curiosity with a track record of turning learning into impact.",
    description: "Follow the projects, academic foundation, and leadership experiences shaping how I think and what I build next.",
    primaryCta: "See my journey",
    primaryHref: "/portfolio",
    secondaryCta: "Download CV",
    iconName: "graduation",
    sectionLabel: "A closer look at the person behind the application",
    proofPoints: [
      { value: "4.0", label: "predicted GPA" },
      { value: "Top 1.37%", label: "JPLP selection" },
      { value: "300+", label: "students engaged" }
    ],
    routeDescription: "Explore the academic foundation, initiative, and curiosity that shape what I build next."
  },
  {
    id: "client",
    label: "I have a project in mind",
    shortLabel: "Client",
    eyebrow: "Product thinking · engineering · execution",
    title: "Let’s make the next useful thing people remember.",
    description: "Explore selected work and services for teams who need thoughtful product strategy, fast iteration, and dependable delivery.",
    primaryCta: "See what I can build",
    primaryHref: "/services",
    secondaryCta: "Start a conversation",
    iconName: "handshake",
    sectionLabel: "A practical path from idea to launch",
    proofPoints: [
      { value: "Web + apps", label: "delivery formats" },
      { value: "From scope", label: "to deployment" },
      { value: "Human-first", label: "collaboration" }
    ],
    routeDescription: "See the kind of work I take on, how I think through it, and the easiest way to start a conversation."
  }
];

type AudienceContextValue = {
  audience: Audience | null;
  profile: AudienceProfile | null;
  isTransitioning: boolean;
  transitionTarget: AudienceProfile | null;
  setAudience: (audience: Audience) => void;
  clearAudience: () => void;
};

const AudienceContext = createContext<AudienceContextValue | undefined>(undefined);
const STORAGE_KEY = "mahmoud-portfolio-audience";

export const AudienceProvider = ({ children }: { children: ReactNode }) => {
  const [audience, setAudienceState] = useState<Audience | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<AudienceProfile | null>(null);
  const previousAudienceRef = useRef<Audience | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Audience | null;
    if (stored && audienceProfiles.some((profile) => profile.id === stored)) setAudienceState(stored);
  }, []);

  const value = useMemo<AudienceContextValue>(() => {
    const setAudience = (nextAudience: Audience) => {
      const fromAudience = audience ?? previousAudienceRef.current;
      if (fromAudience && fromAudience !== nextAudience) {
        if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
        setTransitionTarget(audienceProfiles.find((profile) => profile.id === nextAudience) ?? null);
        setIsTransitioning(true);
        transitionTimerRef.current = window.setTimeout(() => {
          setIsTransitioning(false);
          setTransitionTarget(null);
          transitionTimerRef.current = null;
        }, 1050);
      }
      setAudienceState(nextAudience);
      window.localStorage.setItem(STORAGE_KEY, nextAudience);
      previousAudienceRef.current = null;
    };

    const clearAudience = () => {
      previousAudienceRef.current = audience;
      setAudienceState(null);
      window.localStorage.removeItem(STORAGE_KEY);
    };

    return {
      audience,
      profile: audienceProfiles.find((profile) => profile.id === audience) ?? null,
      isTransitioning,
      transitionTarget,
      setAudience,
      clearAudience
    };
  }, [audience, isTransitioning, transitionTarget]);

  useEffect(() => () => {
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
  }, []);

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>;
};

export const useAudience = () => {
  const context = useContext(AudienceContext);
  if (!context) throw new Error("useAudience must be used inside AudienceProvider");
  return context;
};
