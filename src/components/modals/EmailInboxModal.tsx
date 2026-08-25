import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Mail,
  X,
} from 'lucide-react';

export const EmailInboxModal: React.FC = () => {
  const { isEmailModalOpen, setIsEmailModalOpen, emails, fetchEmails, user } = useAuth();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  useEffect(() => {
    if (isEmailModalOpen) {
      fetchEmails();
    }
  }, [isEmailModalOpen]);

  useEffect(() => {
    if (emails.length > 0 && !selectedEmailId) {
      setSelectedEmailId(emails[0].id);
    }
  }, [emails, selectedEmailId]);

  if (!isEmailModalOpen) return null;

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || emails[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-odyssey-void/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[85vh] bg-odyssey-depth/95 border border-forge-cyan/30 rounded-3xl shadow-glass-card flex flex-col overflow-hidden text-paper-100">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-forge-cyan/20 flex items-center justify-between bg-odyssey-abyss/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forge-navy border border-forge-cyan/40 flex items-center justify-center">
              <Mail className="w-4 h-4 text-forge-sky" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-base text-paper-50 tracking-wider">
                Screenwriter Email Dispatch Inbox
              </h3>
              <p className="text-xs text-paper-400">
                Dispatched login credentials & security receipts for <span className="text-paper-100 font-semibold">{user?.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEmailModalOpen(false)}
            className="p-1.5 text-paper-400 hover:text-paper-100 hover:bg-odyssey-trench rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inbox Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Email List */}
          <div className="w-full md:w-80 border-r border-forge-cyan/15 bg-odyssey-abyss/60 overflow-y-auto p-3 space-y-2">
            <div className="text-[10px] font-mono uppercase text-forge-sky px-2 py-1 tracking-wider font-semibold">
              Dispatched Messages ({emails.length})
            </div>

            {emails.map((email) => {
              const isSelected = email.id === selectedEmailId;
              return (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmailId(email.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border text-left ${
                    isSelected
                      ? 'bg-forge-navy/90 border-forge-cyan shadow-glow-cyan/20'
                      : 'bg-odyssey-depth/50 hover:bg-odyssey-trench border-forge-cyan/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-paper-400 mb-1">
                    <span className="text-bronze-light font-bold">ScriptForge System</span>
                    <span>{new Date(email.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="font-semibold text-xs text-paper-100 truncate mb-1">
                    {email.subject}
                  </div>
                  <div className="text-[10px] text-paper-400 truncate">
                    To: {email.recipientEmail}
                  </div>
                </div>
              );
            })}

            {emails.length === 0 && (
              <div className="p-8 text-center text-paper-400 text-xs">
                No dispatched emails logged yet.
              </div>
            )}
          </div>

          {/* Right Email Preview (HTML rendered) */}
          <div className="flex-1 flex flex-col bg-odyssey-void/60 overflow-hidden">
            {selectedEmail ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Meta details */}
                <div className="p-4 border-b border-forge-cyan/15 bg-odyssey-abyss/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-cinzel font-bold text-sm text-paper-50">
                    <span>{selectedEmail.subject}</span>
                    <span className="text-[10px] font-mono font-normal text-paper-400">
                      {new Date(selectedEmail.sentAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-paper-300 font-mono text-[11px]">
                    From: <span className="text-forge-sky">notifications@scriptforge.studio</span> • To: <span className="text-bronze-light">{selectedEmail.recipientEmail}</span>
                  </div>
                </div>

                {/* Body frame */}
                <div className="flex-1 overflow-y-auto p-4 flex justify-center bg-odyssey-depth/30">
                  <div
                    className="w-full max-w-xl bg-odyssey-abyss p-6 rounded-2xl border border-forge-cyan/20 shadow-2xl text-paper-100 leading-relaxed text-xs overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.htmlBody }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-paper-400 text-xs">
                Select a message to view the dispatched email content.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
