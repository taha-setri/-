/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { PsuCalculator } from './components/PsuCalculator';
import { StorageConverter } from './components/StorageConverter';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'psu' | 'storage'>('psu');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['Tajawal',sans-serif]">
      {/* Top Header */}
      <header className="border-b border-neutral-800/90 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-950/40">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-neutral-100 flex items-center gap-2">
                حاسبات وتكوينات قطع الحاسوب والطاقة
                <span className="text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full border border-neutral-700">
                  v2.0
                </span>
              </h1>
              <p className="text-xs text-neutral-400">
                منصة هندسية لحساب استهلاك الـ PSU وتحويل وحدات التخزين الرقمية
              </p>
            </div>
          </div>

          {/* Primary Tool Switcher */}
          <div className="flex rounded-xl bg-neutral-950 p-1 border border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab('psu')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'psu'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>حاسبة طاقة المزود (PSU)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('storage')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'storage'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Database className="w-4 h-4 text-cyan-400" />
              <span>محول وحدات التخزين</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Banner with quick stats */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/70 to-neutral-950 border border-neutral-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-neutral-300">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {activeTab === 'psu' 
                ? 'حسابات فورية تعتمد على بيانات TDP الرسمية لمعالجات Intel / AMD وبطاقات NVIDIA RTX و Radeon مع هامش أمان Transients.'
                : 'تحويل ثنائي وعشري متزامن يوضح بدقة الفارق بين سعات الشركات التجارية والمعروض في نظام تشغيل ويندوز.'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>حسابات دقيقة 100%</span>
          </div>
        </div>

        {/* Tab views */}
        {activeTab === 'psu' ? <PsuCalculator /> : <StorageConverter />}

      </main>

      {/* Footer with Founder, Disclaimer, and Cookies */}
      <Footer />
    </div>
  );
}

