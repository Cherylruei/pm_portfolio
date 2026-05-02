import { useState, useEffect } from 'react';

const DEFAULT_CONFIG = {
  home_subtitle:
    'Frontend engineer turned AI PM.\nI write PRDs and ship prototypes—\nsometimes in the same afternoon.',
  home_quote:
    "V1 failed POC. V2 shipped.\nThat's not failure — that's product thinking.",
  portfolio_description:
    'A collection of product work spanning UX research, automation, and e-commerce. Each project tells a story of problems solved and users delighted.',
  about_hero_subtitle:
    'Builder PM. Frontend engineer. Former cross-national project manager.',
  about_bio_1:
    'Frontend engineer with 2 years of hands-on React experience, now building AI products as a PM. I write code and ship PRDs—my engineering background means fewer spec gaps and faster iteration with dev teams.',
  about_bio_2:
    'Before pivoting to tech, I spent 5+ years as a cross-national PM—managing 50+ projects at a Czech-China trade company, leading a 10-person team to trade shows in China, and resolving enterprise client escalations (Microsoft Surface, Facebook Portal) within 2 weeks.',
  about_bio_3:
    "Now I'm building AI-native products: an LLM career coach for 104 (Taiwan's largest job platform) and a gamified coffee origin card game with LINE Login and a Gacha mechanic. Both built with real PRDs, real users, and real deployments.",
  about_skills:
    'React,Node.js,Supabase,Vercel,Prompt Engineering,LLM API,AI Agent,PRD,OKR,User Research,Competitive Analysis,User Interviews,Persona,User Journey',
  about_timeline: JSON.stringify([
    {
      period: '2023 Aug. – Present',
      role: 'Frontend Engineer',
      company: '雄獅資訊',
      note: 'React development, building internal tools and consumer-facing features.',
    },
    {
      period: '2021 Sep. – 2022 Sep.',
      role: 'PMC Supervisor',
      company: 'Chicony（捷克）',
      note: 'Managed 40% market share region across European accounts.',
    },
    {
      period: '2018 Nov. – 2021 Apr.',
      role: 'PM',
      company: '歐中貿易（捷克）',
      note: '50+ projects, led 10-person team to trade shows in China, expanded Shopify revenue 2×.',
    },
    {
      period: '2016 Apr. – 2018 Sep.',
      role: 'PM',
      company: '巨騰蘇州',
      note: 'Collaborated with Microsoft (Surface) and Facebook (Portal). Resolved enterprise escalations in 2 weeks, saving 50% cost.',
    },
  ]),
};

export function useSiteConfig() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    fetch('/api/site-config')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setConfig((prev) => ({ ...prev, ...data.config }));
      })
      .catch(() => {
        // silently use DEFAULT_CONFIG
      });
  }, []);

  return config;
}
