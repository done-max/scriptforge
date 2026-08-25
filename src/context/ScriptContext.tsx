import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Screenplay, ActiveNavTab, ScriptScene } from '../types/script';
import { MOCK_SCRIPTS } from '../data/mockScripts';
import { parseScreenplayText } from '../utils/fountainParser';
import { ambientAudio } from '../utils/ambientAudio';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface ScriptContextType {
  scripts: Screenplay[];
  activeScript: Screenplay;
  activeSceneIndex: number;
  activeScene: ScriptScene | undefined;
  activeNavTab: ActiveNavTab;
  isLandingPage: boolean;
  isUploadModalOpen: boolean;
  isExportModalOpen: boolean;
  isAIAssistantOpen: boolean;
  isAudioPlaying: boolean;
  selectedCharacterId: string | null;
  searchQuery: string;
  filterGenre: string;
  sortBy: 'recent' | 'score' | 'pages';
  
  // Actions
  setActiveScriptById: (id: string) => void;
  setActiveSceneIndex: (index: number) => void;
  setActiveNavTab: (tab: ActiveNavTab) => void;
  setIsLandingPage: (val: boolean) => void;
  setIsUploadModalOpen: (val: boolean) => void;
  setIsExportModalOpen: (val: boolean) => void;
  setIsAIAssistantOpen: (val: boolean) => void;
  setSelectedCharacterId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterGenre: (genre: string) => void;
  setSortBy: (sort: 'recent' | 'score' | 'pages') => void;
  toggleAmbientAudio: () => void;
  
  // Core Workflows
  uploadAndProcessScreenplay: (rawText: string, title?: string, author?: string) => Promise<Screenplay>;
  applySceneRewrite: (sceneId: string, newContent: string) => Promise<void>;
  resolveContinuityIssue: (issueId: string, optionIndex: number) => Promise<void>;
  updateSceneContent: (sceneId: string, content: string) => Promise<void>;
  createBlankScript: () => Promise<void>;
  deleteScript: (id: string) => Promise<void>;
  reloadScripts: () => Promise<void>;
}

const ScriptContext = createContext<ScriptContextType | undefined>(undefined);

export const ScriptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [scripts, setScripts] = useState<Screenplay[]>(MOCK_SCRIPTS);
  const [activeScriptId, setActiveScriptId] = useState<string>(MOCK_SCRIPTS[0].id);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(1);
  const [activeNavTab, setActiveNavTab] = useState<ActiveNavTab>('dashboard');
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterGenre, setFilterGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'score' | 'pages'>('recent');

  const reloadScripts = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.getScripts();
      if (res.scripts && res.scripts.length > 0) {
        setScripts(res.scripts);
        // Ensure active script exists in list
        if (!res.scripts.find((s) => s.id === activeScriptId)) {
          setActiveScriptId(res.scripts[0].id);
        }
      }
    } catch {
      // fallback to mock scripts
    }
  }, [isAuthenticated, activeScriptId]);

  useEffect(() => {
    if (isAuthenticated) {
      reloadScripts();
    }
  }, [isAuthenticated, reloadScripts]);

  const activeScript = scripts.find((s) => s.id === activeScriptId) || scripts[0] || MOCK_SCRIPTS[0];
  const activeScene = (activeScript.scenes && activeScript.scenes.find((s) => s.sceneNumber === activeSceneIndex)) || (activeScript.scenes && activeScript.scenes[0]) || MOCK_SCRIPTS[0].scenes[0];

  const setActiveScriptById = (id: string) => {
    setActiveScriptId(id);
    setActiveSceneIndex(1);
    setSelectedCharacterId(null);
  };

  const toggleAmbientAudio = () => {
    const status = ambientAudio.toggle();
    setIsAudioPlaying(status);
  };

  const uploadAndProcessScreenplay = async (rawText: string, title?: string, author?: string): Promise<Screenplay> => {
    const authorName = author || user?.username || 'Screenwriter';
    const parsed = parseScreenplayText(rawText, title || 'UNTITLED SCREENPLAY', authorName);

    try {
      if (isAuthenticated) {
        const res = await api.createScript(parsed);
        const saved = res.script;
        setScripts((prev) => [saved, ...prev]);
        setActiveScriptId(saved.id);
        setActiveSceneIndex(1);
        setActiveNavTab('studio');
        return saved;
      }
    } catch (err) {
      console.warn('Backend upload fallback:', err);
    }

    // Local fallback
    setScripts((prev) => [parsed, ...prev]);
    setActiveScriptId(parsed.id);
    setActiveSceneIndex(1);
    setActiveNavTab('studio');
    return parsed;
  };

  const applySceneRewrite = async (sceneId: string, newContent: string) => {
    const updatedScenes = (activeScript.scenes || []).map((sc) => {
      if (sc.id !== sceneId) return sc;
      return {
        ...sc,
        content: newContent,
      };
    });

    const fullText = updatedScenes.map((s) => s.content).join('\n\n');

    setScripts((prev) =>
      prev.map((scr) => {
        if (scr.id !== activeScript.id) return scr;
        return {
          ...scr,
          lastEdited: 'Just now',
          scenes: updatedScenes,
          fullRawText: fullText,
        };
      })
    );

    try {
      if (isAuthenticated) {
        await api.updateScript(activeScript.id, {
          scenes: updatedScenes,
          fullRawText: fullText,
        });
      }
    } catch {
      // ignore
    }
  };

  const updateSceneContent = async (sceneId: string, content: string) => {
    await applySceneRewrite(sceneId, content);
  };

  const resolveContinuityIssue = async (issueId: string, optionIndex: number) => {
    const targetIssue = (activeScript.continuityIssues || []).find((i) => i.id === issueId);
    if (!targetIssue) return;

    const updatedIssues = (activeScript.continuityIssues || []).map((issue) =>
      issue.id === issueId ? { ...issue, resolved: true } : issue
    );

    const chosenOption = targetIssue.resolutionOptions[optionIndex];
    const updatedScenes = [...(activeScript.scenes || [])];
    const targetSceneIdx = updatedScenes.findIndex((s) => s.sceneNumber === targetIssue.firstScene);
    if (targetSceneIdx >= 0 && chosenOption) {
      updatedScenes[targetSceneIdx] = {
        ...updatedScenes[targetSceneIdx],
        content: `${updatedScenes[targetSceneIdx].content}\n\n[CONTINUITY RESOLUTION APPLIED]:\n${chosenOption.proposedPatch}`,
      };
    }

    setScripts((prev) =>
      prev.map((scr) => {
        if (scr.id !== activeScript.id) return scr;
        return {
          ...scr,
          continuityIssues: updatedIssues,
          scenes: updatedScenes,
          lastEdited: 'Just now',
        };
      })
    );

    try {
      if (isAuthenticated) {
        await api.updateScript(activeScript.id, {
          continuityIssues: updatedIssues,
          scenes: updatedScenes,
        });
      }
    } catch {
      // ignore
    }
  };

  const createBlankScript = async () => {
    const blankText = `INT. WRITER'S ROOM - NIGHT\n\nThe cursor blinks on the dark screen. The story begins here.\n\nWRITER\n(to the empty room)\nLet's find the story hiding inside the page.`;
    await uploadAndProcessScreenplay(blankText, 'NEW STORY PROJECT', user?.username || 'Writer');
  };

  const deleteScript = async (id: string) => {
    try {
      if (isAuthenticated) {
        await api.deleteScript(id);
      }
    } catch {
      // ignore
    }
    setScripts((prev) => prev.filter((s) => s.id !== id));
    if (activeScriptId === id) {
      const remaining = scripts.filter((s) => s.id !== id);
      if (remaining.length > 0) {
        setActiveScriptId(remaining[0].id);
      }
    }
  };

  return (
    <ScriptContext.Provider
      value={{
        scripts,
        activeScript,
        activeSceneIndex,
        activeScene,
        activeNavTab,
        isLandingPage,
        isUploadModalOpen,
        isExportModalOpen,
        isAIAssistantOpen,
        isAudioPlaying,
        selectedCharacterId,
        searchQuery,
        filterGenre,
        sortBy,
        setActiveScriptById,
        setActiveSceneIndex,
        setActiveNavTab,
        setIsLandingPage,
        setIsUploadModalOpen,
        setIsExportModalOpen,
        setIsAIAssistantOpen,
        setSelectedCharacterId,
        setSearchQuery,
        setFilterGenre,
        setSortBy,
        toggleAmbientAudio,
        uploadAndProcessScreenplay,
        applySceneRewrite,
        resolveContinuityIssue,
        updateSceneContent,
        createBlankScript,
        deleteScript,
        reloadScripts,
      }}
    >
      {children}
    </ScriptContext.Provider>
  );
};

export const useScript = () => {
  const context = useContext(ScriptContext);
  if (!context) {
    throw new Error('useScript must be used within a ScriptProvider');
  }
  return context;
};
