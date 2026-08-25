import React from 'react';
import { useScript } from '../../context/ScriptContext';
import { useAuth } from '../../context/AuthContext';
import type { ActiveNavTab } from '../../types/script';
import {
  Scroll,
  Compass,
  PenTool,
  FolderKanban,
  FilePlus2,
  Mail,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const {
    activeNavTab,
    setActiveNavTab,
    setIsLandingPage,
    setIsUploadModalOpen,
    activeScript,
    scripts,
  } = useScript();

  const { user, logout, setIsEmailModalOpen, emails } = useAuth();

  const simplifiedNavItems: {
    id: ActiveNavTab;
    label: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
    isPrimary?: boolean;
  }[] = [
    {
      id: 'dashboard',
      label: 'Home Dashboard',
      description: 'Overview & recent projects',
      icon: LayoutDashboard,
    },
    {
      id: 'studio',
      label: 'Read & Edit Script',
      description: 'Authentic screenplay reader',
      icon: Scroll,
      isPrimary: true,
    },
    {
      id: 'story',
      label: 'Story Intelligence',
      description: 'Structure, characters & subtext',
      icon: Compass,
      badge: `${activeScript.storyIntelligenceScore}/100`,
    },
    {
      id: 'rewrite',
      label: 'Rewrite Studio',
      description: 'AI scene refinement workshop',
      icon: PenTool,
    },
    {
      id: 'scripts',
      label: 'My Script Library',
      description: 'All saved drafts & uploads',
      icon: FolderKanban,
      badge: `${scripts.length}`,
    },
  ];

  const handleNavClick = (id: ActiveNavTab) => {
    setActiveNavTab(id);
    setIsLandingPage(false);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-odyssey-void/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-odyssey-abyss/95 border-r border-forge-cyan/15 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header Logo */}
        <div className="h-16 px-5 border-b border-forge-cyan/15 flex items-center justify-between">
          <div
            onClick={() => {
              setActiveNavTab('dashboard');
              setIsLandingPage(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forge-navy to-odyssey-depth border border-forge-cyan/40 flex items-center justify-center shadow-inner-glow">
              <Compass className="w-4 h-4 text-bronze-light" />
            </div>
            <div>
              <div className="font-cinzel font-bold text-sm tracking-wider text-paper-50 flex items-center gap-1">
                <span>SCRIPTFORGE</span>
              </div>
              <div className="text-[9px] font-mono text-forge-sky uppercase tracking-widest">
                Odyssey Studio
              </div>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <button
            onClick={() => {
              setIsUploadModalOpen(true);
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-forge-navy to-forge-ocean hover:from-forge-ocean hover:to-forge-azure text-paper-50 border border-forge-cyan/40 shadow-glow-cyan transition-all mb-4"
          >
            <FilePlus2 className="w-4 h-4 text-bronze-light" />
            <span>+ Upload New Script</span>
          </button>

          <div className="text-[10px] uppercase font-mono tracking-widest text-paper-500 px-3 pb-1 font-semibold">
            Studio Navigation
          </div>

          {simplifiedNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-forge-navy/80 text-paper-50 border border-forge-cyan shadow-glow-cyan/20 ring-1 ring-forge-cyan'
                    : 'text-paper-300 hover:bg-odyssey-depth/70 hover:text-paper-100 border border-transparent hover:border-forge-cyan/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-forge-cyan' : 'text-paper-400 group-hover:text-forge-sky'
                    }`}
                  />
                  <div className="text-left">
                    <div className="font-semibold text-paper-100">{item.label}</div>
                    <div className="text-[10px] text-paper-400 leading-tight">{item.description}</div>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? 'bg-bronze/20 text-bronze-light border border-bronze/30'
                        : 'bg-forge-ocean/30 text-forge-sky border border-forge-cyan/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Email Inbox Link */}
          <button
            onClick={() => {
              setIsEmailModalOpen(true);
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-bronze-light hover:bg-odyssey-depth/70 border border-bronze/20 hover:border-bronze/40 transition-all mt-4"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-bronze" />
              <div className="text-left">
                <div className="font-semibold text-paper-100">Dispatched Emails</div>
                <div className="text-[10px] text-paper-400">View login receipts</div>
              </div>
            </div>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-bronze/20 text-bronze-light border border-bronze/30">
              {emails.length}
            </span>
          </button>
        </div>

        {/* Bottom User Profile with Logout */}
        <div className="p-3 border-t border-forge-cyan/15 bg-odyssey-void/60 space-y-2">
          <div className="p-2.5 rounded-xl bg-odyssey-depth/80 border border-forge-cyan/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-forge-navy border border-bronze/40 flex items-center justify-center text-bronze-light text-xs font-cinzel font-bold shrink-0">
                {user?.username ? user.username.slice(0, 2).toUpperCase() : 'WR'}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-paper-100 truncate">
                  @{user?.username || 'Screenwriter'}
                </div>
                <div className="text-[10px] text-paper-400 truncate font-mono">
                  {user?.email || 'writer@studio.com'}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 text-paper-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
