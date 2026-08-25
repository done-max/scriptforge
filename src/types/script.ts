export type ScriptGenre = 'Drama' | 'Thriller' | 'Sci-Fi' | 'Noir' | 'Horror' | 'Comedy' | 'Mystery' | 'Historical';

export interface DialogueLine {
  id: string;
  character: string;
  parenthetical?: string;
  line: string;
  subtextScore: number; // 0-100
  naturalnessScore: number; // 0-100
  tensionScore: number; // 0-100
  hasExpositionRisk?: boolean;
  isOnTheNose?: boolean;
  subtextAnalysis?: {
    surfaceMeaning: string;
    underlyingEmotion: string;
    whyItWorksOrStruggles: string;
    suggestedAlternative: string;
    highTensionAlternative?: string;
    visualTerseAlternative?: string;
  };
}

export interface ScriptScene {
  id: string;
  sceneNumber: number;
  slugline: string; // e.g. "INT. HARBOR WATCHTOWER - NIGHT"
  location: string;
  timeOfDay: 'DAY' | 'NIGHT' | 'DUSK' | 'DAWN' | 'CONTINUOUS';
  act: 'Act I' | 'Act IIA' | 'Act IIB' | 'Act III';
  pageNumber: number;
  estDurationMinutes: number;
  conflictIntensity: number; // 1-100
  dialogueDensity: number; // 1-100
  actionDensity: number; // 1-100
  emotionalValence: number; // -50 to +50 (dark to hopeful)
  summary: string;
  content: string; // Screenplay text
  dialogueLines: DialogueLine[];
  charactersPresent: string[];
  themesAddressed: string[];
  motifsPresent: string[];
  aiAnnotations: AIAnnotation[];
  rewriteSuggestions?: {
    tightenPacing: string;
    increaseTension: string;
    deepenSubtext: string;
    raiseStakes: string;
    strengthenVoice: string;
    reduceExposition: string;
  };
}

export interface AIAnnotation {
  id: string;
  lineSnippet: string;
  type: 'structure' | 'character' | 'dialogue' | 'pacing' | 'theme' | 'visual' | 'continuity';
  title: string;
  observation: string;
  whyItMatters: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
}

export interface CharacterProfile {
  id: string;
  name: string;
  role: 'Protagonist' | 'Antagonist' | 'Mentor' | 'Catalyst' | 'Confidant' | 'Foil';
  externalGoal: string;
  internalNeed: string;
  coreFear: string;
  stakes: string;
  arcSummary: string; // e.g. "Avoidance → Confrontation → Acceptance"
  arcStages: {
    stage: string;
    sceneNumber: number;
    description: string;
    emotionalState: number; // 0-100
  }[];
  voiceProfile: {
    vocabularyCadence: string;
    emotionalDefenseMechanism: string;
    dialogueRhythm: string;
    distinctivePhrasing: string;
  };
  screenTimePercentage: number;
  sceneAppearances: number[];
  relationships: {
    targetCharacter: string;
    dynamic: string;
    conflictVector: string;
    powerBalance: 'Dominant' | 'Submissive' | 'Volatile' | 'Balanced';
  }[];
}

export interface StoryBeat {
  id: string;
  beatName: string; // Save the Cat or 3-Act beat
  act: 'Act I' | 'Act IIA' | 'Act IIB' | 'Act III';
  targetPage: number;
  actualScene: number;
  dramaticFunction: string;
  craftEvaluation: 'Strong' | 'Needs Escalation' | 'Weak Subtext' | 'Pacing Drag';
  description: string;
  aiFeedback: {
    observation: string;
    whyItMatters: string;
    suggestion: string;
  };
}

export interface ThemeMotif {
  id: string;
  name: string;
  type: 'theme' | 'symbol' | 'object' | 'visual_motif';
  description: string;
  sceneChain: number[]; // e.g. [4, 9, 17, 23, 31]
  occurrences: {
    sceneNumber: number;
    contextQuote: string;
    thematicResonance: string;
  }[];
}

export interface ContinuityIssue {
  id: string;
  category: 'Character Knowledge' | 'Timeline' | 'Location' | 'Prop' | 'Relationship';
  severity: 'Critical' | 'Moderate' | 'Minor';
  title: string;
  firstScene: number;
  secondScene: number;
  description: string;
  evidenceA: string;
  evidenceB: string;
  resolutionOptions: {
    optionTitle: string;
    proposedPatch: string;
    impactDescription: string;
  }[];
  resolved?: boolean;
}

export interface ScriptCoverage {
  logline: string;
  synopsis: string;
  recommendation: 'RECOMMEND' | 'CONSIDER' | 'PASS';
  marketViability: 'Festival Contender' | 'Studio Spec' | 'Indie Arthouse' | 'Prestige TV Pilot';
  strengths: string[];
  areasForDevelopment: string[];
  executiveSummary: string;
}

export interface Screenplay {
  id: string;
  title: string;
  author: string;
  genre: ScriptGenre;
  pageCount: number;
  lastEdited: string;
  storyIntelligenceScore: number;
  categoryScores: {
    structure: number;
    character: number;
    dialogue: number;
    pacing: number;
    theme: number;
    visualStorytelling: number;
  };
  logline: string;
  scenes: ScriptScene[];
  characters: CharacterProfile[];
  storyBeats: StoryBeat[];
  themeMotifs: ThemeMotif[];
  continuityIssues: ContinuityIssue[];
  coverage: ScriptCoverage;
  fullRawText: string;
}

export type ActiveNavTab =
  | 'dashboard'
  | 'scripts'
  | 'upload'
  | 'studio'
  | 'story'
  | 'characters'
  | 'dialogue'
  | 'pacing'
  | 'themes'
  | 'rewrite'
  | 'continuity'
  | 'coach';
