import React from 'react';
import { OperationMode } from '../types/scada';
import { LayoutDashboard, FileText, Settings, ShieldAlert, BatteryCharging, Zap, RefreshCw, Cpu, Lock, ListChecks } from 'lucide-react';

export type ActiveViewType = 'dashboard' | 'sequence' | 'history' | 'settings' | 'engSettings';

interface NavigationTabsProps {
  currentMode: OperationMode;
  onSelectMode: (mode: OperationMode) => void;
  activeView: ActiveViewType;
  onSelectView: (view: ActiveViewType) => void;
  isOutputOn?: boolean;
  isTestRunning?: boolean;
  protocolType?: 'RS485' | 'RS232';
}

const MODES: { id: OperationMode; label: string; icon: React.ReactNode }[] = [
  { id: 'CV', label: 'CV MODE', icon: <Zap size={16} /> },
  { id: 'CC', label: 'CC MODE', icon: <RefreshCw size={16} /> },
  { id: 'CR', label: 'CR MODE', icon: <ShieldAlert size={16} /> },
  { id: 'CP', label: 'CP MODE', icon: <Zap size={16} /> },
  { id: 'BAT TEST', label: 'BAT TEST MODE', icon: <BatteryCharging size={16} /> },
];

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  currentMode,
  onSelectMode,
  activeView,
  onSelectView,
  isOutputOn = false,
  isTestRunning = false,
  protocolType = 'RS485',
}) => {
  return (
    <div className="mode-tabs-bar">
      {/* View Switchers */}
      <button
        className={`btn-nav-tab ${activeView === 'dashboard' ? 'active' : ''}`}
        onClick={() => onSelectView('dashboard')}
      >
        <LayoutDashboard size={18} />
        <span>Control Dashboard</span>
      </button>

      <button
        className={`btn-nav-tab ${activeView === 'engSettings' ? 'active' : ''}`}
        onClick={() => {
          if (isOutputOn) return;
          onSelectView('engSettings');
        }}
        disabled={isOutputOn}
        title={isOutputOn ? 'Output is ON — Engineering Settings locked. Turn Output OFF first.' : ''}
        style={isOutputOn ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
      >
        <Cpu size={18} />
        <span>ENG SETTING</span>
        {isOutputOn && <Lock size={12} style={{ color: '#ef4444', marginLeft: '4px' }} />}
      </button>

      <button
        className={`btn-nav-tab ${activeView === 'history' ? 'active' : ''}`}
        onClick={() => {
          if (isOutputOn) return;
          onSelectView('history');
        }}
        disabled={isOutputOn}
        title={isOutputOn ? 'Output is ON — Screen navigation locked. Turn Output OFF first.' : ''}
        style={isOutputOn ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
      >
        <FileText size={18} />
        <span>History & PDF Reports</span>
        {isOutputOn && <Lock size={12} style={{ color: '#ef4444', marginLeft: '4px' }} />}
      </button>

      <button
        className={`btn-nav-tab ${activeView === 'settings' ? 'active' : ''}`}
        onClick={() => {
          if (isOutputOn) return;
          onSelectView('settings');
        }}
        disabled={isOutputOn}
        title={isOutputOn ? `Output is ON — ${protocolType} Settings locked. Turn Output OFF first.` : ''}
        style={isOutputOn ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
      >
        <Settings size={18} />
        <span>{protocolType} Settings</span>
        {isOutputOn && <Lock size={12} style={{ color: '#ef4444', marginLeft: '4px' }} />}
      </button>

      <div style={{ width: '1px', background: 'rgba(51, 65, 85, 0.6)', margin: '0 8px' }} />

      {/* When in Single Power Supply Mode (15), hide normal load modes and show ONLY Single PS Mode */}
      {currentMode === 'PS_MODE' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="btn-mode-tab active"
            style={{
              cursor: 'default',
              background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
              color: '#ffffff',
              border: '1.5px solid #60a5fa',
              boxShadow: '0 0 12px rgba(37, 99, 235, 0.4)',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '6px'
            }}
            title="Single Power Supply Mode is active (Switched from hardware button - write 15). Press hardware button again to return to CV mode (write 6)."
          >
            <Zap size={16} style={{ color: '#fbbf24' }} />
            <span>SINGLE POWER SUPPLY MODE</span>
            <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>
              HW MODE 15
            </span>
          </div>

          {/* UI Preview Mode Switcher back to CV */}
          <button
            className="btn-mode-tab"
            style={{
              cursor: isOutputOn ? 'not-allowed' : 'pointer',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid #475569',
              color: '#94a3b8',
              fontSize: '0.8rem',
              padding: '5px 12px',
              borderRadius: '6px'
            }}
            disabled={isOutputOn}
            onClick={() => {
              if (isOutputOn) return;
              onSelectMode('CV');
            }}
            title="UI Preview Toggle: Return to CV Mode (Hardware button write 6)"
          >
            <span>Exit to CV Mode</span>
          </button>
        </div>
      ) : (
        <>
          {/* 5 Hardware Load Mode Tabs */}
          {MODES.map((m) => {
            const isCurrent = currentMode === m.id;
            const isDisabled = (isTestRunning || isOutputOn) && !isCurrent;
            const tooltip = isOutputOn
              ? (isCurrent ? 'Current active mode (Output is ON)' : 'Output is ON — Mode locked. Turn Output OFF to switch modes.')
              : (isTestRunning ? 'Mode switching locked during active test. Turn Output OFF first.' : '');

            return (
              <button
                key={m.id}
                disabled={isDisabled}
                title={tooltip}
                className={`btn-mode-tab ${isCurrent ? 'active' : ''}`}
                style={isDisabled ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
                onClick={() => {
                  if (isTestRunning || isOutputOn) return;
                  onSelectMode(m.id);
                  if (activeView !== 'dashboard') onSelectView('dashboard');
                }}
              >
                {m.icon}
                <span>{m.label}</span>
                {(isTestRunning || isOutputOn) && isCurrent && (
                  <Lock size={12} style={{ color: '#ffffff', marginLeft: '4px' }} />
                )}
              </button>
            );
          })}

          {/* Single PS Mode Tab (Clickable for UI Preview, and switches to Mode 15) */}
          <button
            className="btn-mode-tab"
            style={{
              cursor: (isTestRunning || isOutputOn) ? 'not-allowed' : 'pointer',
              border: '1.5px solid #3b82f6',
              background: 'rgba(30, 58, 138, 0.35)',
              color: '#93c5fd',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px'
            }}
            disabled={isTestRunning || isOutputOn}
            onClick={() => {
              if (isTestRunning || isOutputOn) return;
              onSelectMode('PS_MODE');
              if (activeView !== 'dashboard') onSelectView('dashboard');
            }}
            title="Single Power Supply Mode (Hardware Mode 15). Click to preview UI."
          >
            <Zap size={15} style={{ color: '#60a5fa' }} />
            <span>SINGLE PS MODE</span>
            <span style={{ fontSize: '0.65rem', background: '#2563eb', color: '#fff', padding: '1px 5px', borderRadius: '3px' }}>
              PREVIEW
            </span>
          </button>
        </>
      )}
    </div>
  );
};
