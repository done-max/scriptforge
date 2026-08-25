import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ScriptProvider, useScript } from './context/ScriptContext';
import { OdysseyConstellation } from './components/common/OdysseyConstellation';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingView } from './components/views/LandingView';
import { DashboardHome } from './components/views/DashboardHome';
import { ScreenplayStudio } from './components/views/ScreenplayStudio';
import { StoryIntelligenceView } from './components/views/StoryIntelligenceView';
import { CharacterIntelligenceView } from './components/views/CharacterIntelligenceView';
import { DialogueIntelligenceView } from './components/views/DialogueIntelligenceView';
import { PacingAnalysisView } from './components/views/PacingAnalysisView';
import { ThemeStoryWallView } from './components/views/ThemeStoryWallView';
import { RewriteStudioView } from './components/views/RewriteStudioView';
import { ContinuityEngineView } from './components/views/ContinuityEngineView';
import { ScriptLibraryView } from './components/views/ScriptLibraryView';
import { WritingCoachView } from './components/views/WritingCoachView';
import { ScriptUploadModal } from './components/modals/ScriptUploadModal';
import { ExportModal } from './components/modals/ExportModal';
import { AIAssistantDrawer } from './components/modals/AIAssistantDrawer';
import { AuthModal } from './components/modals/AuthModal';
import { EmailInboxModal } from './components/modals/EmailInboxModal';
import { AdminDatabaseModal } from './components/modals/AdminDatabaseModal';

const AppContent: React.FC = () => {
  const { activeNavTab, isLandingPage } = useScript();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const renderActiveView = () => {
    if (isLandingPage) {
      return <LandingView />;
    }

    switch (activeNavTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'scripts':
        return <ScriptLibraryView />;
      case 'studio':
        return <ScreenplayStudio />;
      case 'story':
        return <StoryIntelligenceView />;
      case 'characters':
        return <CharacterIntelligenceView />;
      case 'dialogue':
        return <DialogueIntelligenceView />;
      case 'pacing':
        return <PacingAnalysisView />;
      case 'themes':
        return <ThemeStoryWallView />;
      case 'rewrite':
        return <RewriteStudioView />;
      case 'continuity':
        return <ContinuityEngineView />;
      case 'coach':
        return <WritingCoachView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="relative min-h-screen bg-odyssey-abyss text-paper-100 font-sans selection:bg-forge-ocean/50 selection:text-forge-light">
      {/* Background Starry Ocean Constellation Canvas */}
      <OdysseyConstellation />

      {/* Main App Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />

        <div className="flex-1 flex overflow-hidden">
          {!isLandingPage && (
            <Sidebar
              isMobileOpen={isMobileSidebarOpen}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />
          )}

          <main
            className={`flex-1 overflow-y-auto transition-all duration-300 ${
              !isLandingPage ? 'lg:pl-64' : ''
            }`}
          >
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Interactive Global Modals & Drawers */}
      <ScriptUploadModal />
      <ExportModal />
      <AIAssistantDrawer />
      <AuthModal />
      <EmailInboxModal />
      <AdminDatabaseModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ScriptProvider>
        <AppContent />
      </ScriptProvider>
    </AuthProvider>
  );
}

export default App;
