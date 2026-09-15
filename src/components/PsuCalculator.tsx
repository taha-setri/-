import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Cpu, 
  Layers, 
  Fan, 
  HardDrive, 
  ShieldCheck, 
  AlertTriangle, 
  RotateCcw,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { 
  CPU_OPTIONS, 
  GPU_OPTIONS, 
  MOTHERBOARD_OPTIONS, 
  COOLING_OPTIONS, 
  PRESET_BUILDS,
  PresetBuild 
} from '../data/hardware';

export const PsuCalculator: React.FC = () => {
  // Selections
  const [selectedCpuId, setSelectedCpuId] = useState<string>('amd-7800x3d');
  const [customCpuWattage, setCustomCpuWattage] = useState<number>(125);

  const [selectedGpuId, setSelectedGpuId] = useState<string>('rtx-4070s');
  const [customGpuWattage, setCustomGpuWattage] = useState<number>(250);

  const [selectedMbId, setSelectedMbId] = useState<string>('mb-atx');

  const [ramType, setRamType] = useState<'ddr4' | 'ddr5'>('ddr5');
  const [ramCount, setRamCount] = useState<number>(2);

  const [nvmeCount, setNvmeCount] = useState<number>(2);
  const [sataCount, setSataCount] = useState<number>(0);
  const [hddCount, setHddCount] = useState<number>(0);

  const [selectedCoolingId, setSelectedCoolingId] = useState<string>('cool-aio-240');
  const [fansCount, setFansCount] = useState<number>(4);
  const [rgbLighting, setRgbLighting] = useState<boolean>(true);
  const [pcieCardsCount, setPcieCardsCount] = useState<number>(0);

  // Buffer headroom percentage (20%, 30%, 40%)
  const [headroomPct, setHeadroomPct] = useState<number>(30);
  const [isOverclocking, setIsOverclocking] = useState<boolean>(false);

  // Active preset note
  const [activePresetName, setActivePresetName] = useState<string | null>('تجميعة ألعاب متوازنة (Sweet Spot 1440p)');

  // Calculations
  const cpuWatts = useMemo(() => {
    if (selectedCpuId === 'custom-cpu') return customCpuWattage;
    const item = CPU_OPTIONS.find(c => c.id === selectedCpuId);
    return item ? item.wattage : 100;
  }, [selectedCpuId, customCpuWattage]);

  const gpuWatts = useMemo(() => {
    if (selectedGpuId === 'custom-gpu') return customGpuWattage;
    const item = GPU_OPTIONS.find(g => g.id === selectedGpuId);
    return item ? item.wattage : 200;
  }, [selectedGpuId, customGpuWattage]);

  const mbWatts = useMemo(() => {
    const item = MOTHERBOARD_OPTIONS.find(m => m.id === selectedMbId);
    return item ? item.wattage : 50;
  }, [selectedMbId]);

  const ramWatts = useMemo(() => {
    const perStick = ramType === 'ddr5' ? 4.5 : 3.5;
    return Math.round(ramCount * perStick);
  }, [ramType, ramCount]);

  const storageWatts = useMemo(() => {
    return (nvmeCount * 7) + (sataCount * 4) + (hddCount * 12);
  }, [nvmeCount, sataCount, hddCount]);

  const coolingWatts = useMemo(() => {
    const coolItem = COOLING_OPTIONS.find(c => c.id === selectedCoolingId);
    return coolItem ? coolItem.wattage : 15;
  }, [selectedCoolingId]);

  const fansAndExtrasWatts = useMemo(() => {
    const fanW = fansCount * 2.5;
    const rgbW = rgbLighting ? 12 : 0;
    const pcieW = pcieCardsCount * 15;
    return Math.round(fanW + rgbW + pcieW);
  }, [fansCount, rgbLighting, pcieCardsCount]);

  // Base raw wattage
  const rawBaseWatts = useMemo(() => {
    return cpuWatts + gpuWatts + mbWatts + ramWatts + storageWatts + coolingWatts + fansAndExtrasWatts;
  }, [cpuWatts, gpuWatts, mbWatts, ramWatts, storageWatts, coolingWatts, fansAndExtrasWatts]);

  // If overclocking is checked, add 15% to CPU & GPU
  const totalEstimatedWatts = useMemo(() => {
    let sum = rawBaseWatts;
    if (isOverclocking) {
      sum += Math.round((cpuWatts + gpuWatts) * 0.15);
    }
    return sum;
  }, [rawBaseWatts, isOverclocking, cpuWatts, gpuWatts]);

  // Recommended PSU size with chosen headroom
  const recommendedWattsCalculated = useMemo(() => {
    return Math.round(totalEstimatedWatts * (1 + headroomPct / 100));
  }, [totalEstimatedWatts, headroomPct]);

  // Nearest standard commercial PSU capacity
  const standardPsuTiers = [450, 550, 650, 750, 850, 1000, 1200, 1500];
  const recommendedStandardPsu = useMemo(() => {
    for (const tier of standardPsuTiers) {
      if (tier >= recommendedWattsCalculated) {
        return tier;
      }
    }
    return 1600;
  }, [recommendedWattsCalculated]);

  // Calculate efficiency sweet spot (PSUs are most efficient at 50% to 70% load)
  const currentPsuLoadPercent = useMemo(() => {
    return Math.min(100, Math.round((totalEstimatedWatts / recommendedStandardPsu) * 100));
  }, [totalEstimatedWatts, recommendedStandardPsu]);

  // Apply preset build
  const applyPreset = (preset: PresetBuild) => {
    setSelectedCpuId(preset.cpuId);
    setSelectedGpuId(preset.gpuId);
    setSelectedMbId(preset.motherboardId);
    setRamType(preset.ramType);
    setRamCount(preset.ramCount);
    setNvmeCount(preset.nvmeCount);
    setSataCount(preset.sataCount);
    setHddCount(preset.hddCount);
    setSelectedCoolingId(preset.coolingId);
    setFansCount(preset.fansCount);
    setRgbLighting(preset.rgbLighting);
    setActivePresetName(preset.name);
  };

  const handleCustomChange = () => {
    setActivePresetName(null);
  };

  return (
    <div id="psu-calculator" className="space-y-6">
      {/* Preset Quick Chooser */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>تكوينات جاهزة سريعة (Build Presets):</span>
          </div>
          {activePresetName && (
            <span className="text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              محدد حالياً: {activePresetName}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {PRESET_BUILDS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              id={`preset-${preset.id}`}
              onClick={() => applyPreset(preset)}
              className={`p-3 text-right rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between ${
                activePresetName === preset.name
                  ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/40'
                  : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/50'
              }`}
            >
              <span className="font-bold text-neutral-100 mb-1">{preset.name.split(' (')[0]}</span>
              <span className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">{preset.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs (2 cols) & Results (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Main Column: Hardware Pickers (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Section 1: Core Processing (CPU & GPU) */}
          <div className="bg-neutral-900/80 border border-neutral-800/90 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-neutral-200 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Cpu className="w-4 h-4 text-cyan-400" />
              المعالجة المركزية والرسومية (القطع الأعلى استهلاكاً)
            </h3>

            {/* CPU Select */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="cpu-select" className="font-medium text-neutral-300">
                  المعالج المركزي (Processor / CPU):
                </label>
                <span className="font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {cpuWatts} واط
                </span>
              </div>
              <select
                id="cpu-select"
                value={selectedCpuId}
                onChange={(e) => {
                  setSelectedCpuId(e.target.value);
                  handleCustomChange();
                }}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              >
                <optgroup label="معالجات Intel Core">
                  {CPU_OPTIONS.filter(c => c.category === 'Intel').map(c => (
                    <option key={c.id} value={c.id}>{c.name} (~{c.wattage}W TDP)</option>
                  ))}
                </optgroup>
                <optgroup label="معالجات AMD Ryzen">
                  {CPU_OPTIONS.filter(c => c.category === 'AMD').map(c => (
                    <option key={c.id} value={c.id}>{c.name} (~{c.wattage}W TDP)</option>
                  ))}
                </optgroup>
                <optgroup label="محطات عمل وتخصيص">
                  {CPU_OPTIONS.filter(c => c.category === 'Workstation' || c.category === 'Custom').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </optgroup>
              </select>

              {selectedCpuId === 'custom-cpu' && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>حدد أقصى استهلاك للمعالج:</span>
                    <span className="font-mono text-cyan-300">{customCpuWattage}W</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="450"
                    step="5"
                    value={customCpuWattage}
                    onChange={(e) => setCustomCpuWattage(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* GPU Select */}
            <div className="space-y-2 pt-2 border-t border-neutral-800/60">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="gpu-select" className="font-medium text-neutral-300">
                  بطاقة الرسوميات (Graphics Card / GPU):
                </label>
                <span className="font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  {gpuWatts} واط
                </span>
              </div>
              <select
                id="gpu-select"
                value={selectedGpuId}
                onChange={(e) => {
                  setSelectedGpuId(e.target.value);
                  handleCustomChange();
                }}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              >
                <optgroup label="NVIDIA RTX 50 Series">
                  {GPU_OPTIONS.filter(g => g.category === 'NVIDIA RTX 50').map(g => (
                    <option key={g.id} value={g.id}>{g.name} (~{g.wattage}W)</option>
                  ))}
                </optgroup>
                <optgroup label="NVIDIA RTX 40 Series">
                  {GPU_OPTIONS.filter(g => g.category === 'NVIDIA RTX 40').map(g => (
                    <option key={g.id} value={g.id}>{g.name} (~{g.wattage}W)</option>
                  ))}
                </optgroup>
                <optgroup label="NVIDIA RTX 30 Series">
                  {GPU_OPTIONS.filter(g => g.category === 'NVIDIA RTX 30').map(g => (
                    <option key={g.id} value={g.id}>{g.name} (~{g.wattage}W)</option>
                  ))}
                </optgroup>
                <optgroup label="AMD Radeon RX Series">
                  {GPU_OPTIONS.filter(g => g.category === 'AMD Radeon').map(g => (
                    <option key={g.id} value={g.id}>{g.name} (~{g.wattage}W)</option>
                  ))}
                </optgroup>
                <optgroup label="خيارات أخرى">
                  {GPU_OPTIONS.filter(g => g.category === 'Integrated' || g.category === 'Custom').map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </optgroup>
              </select>

              {selectedGpuId === 'custom-gpu' && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>حدد أقصى استهلاك لكرت الشاشة (TDP/TGP):</span>
                    <span className="font-mono text-emerald-300">{customGpuWattage}W</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="650"
                    step="10"
                    value={customGpuWattage}
                    onChange={(e) => setCustomGpuWattage(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Motherboard & Memory */}
          <div className="bg-neutral-900/80 border border-neutral-800/90 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-neutral-200 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Layers className="w-4 h-4 text-purple-400" />
              اللوحة الأم والذاكرة العشوائية (Motherboard & RAM)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Motherboard */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="mb-select" className="font-medium text-neutral-300">
                    نوع وحجم اللوحة الأم:
                  </label>
                  <span className="font-mono text-purple-400 text-xs font-bold">{mbWatts}W</span>
                </div>
                <select
                  id="mb-select"
                  value={selectedMbId}
                  onChange={(e) => {
                    setSelectedMbId(e.target.value);
                    handleCustomChange();
                  }}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-purple-500"
                >
                  {MOTHERBOARD_OPTIONS.map(m => (
                    <option key={m.id} value={m.id}>{m.name} (~{m.wattage}W)</option>
                  ))}
                </select>
              </div>

              {/* RAM */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-neutral-300">الذاكرة العشوائية (RAM):</span>
                  <span className="font-mono text-purple-400 text-xs font-bold">{ramWatts}W</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex rounded-xl bg-neutral-950 border border-neutral-800 p-1">
                    <button
                      type="button"
                      onClick={() => { setRamType('ddr4'); handleCustomChange(); }}
                      className={`flex-1 py-1 text-xs rounded-lg font-medium transition-colors ${
                        ramType === 'ddr4' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      DDR4
                    </button>
                    <button
                      type="button"
                      onClick={() => { setRamType('ddr5'); handleCustomChange(); }}
                      className={`flex-1 py-1 text-xs rounded-lg font-medium transition-colors ${
                        ramType === 'ddr5' ? 'bg-purple-950 text-purple-200 font-bold border border-purple-700/50' : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      DDR5
                    </button>
                  </div>

                  <select
                    id="ram-count-select"
                    value={ramCount}
                    onChange={(e) => {
                      setRamCount(Number(e.target.value));
                      handleCustomChange();
                    }}
                    aria-label="عدد قطع الرام"
                    className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-sm text-neutral-100 focus:outline-none focus:border-purple-500"
                  >
                    <option value={1}>قطعة واحدة (1 Stick)</option>
                    <option value={2}>قطعتين (2 Sticks - Dual Channel)</option>
                    <option value={4}>4 قطع (4 Sticks - Quad)</option>
                    <option value={8}>8 قطع (Workstation 8 Sticks)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Storage Drives */}
          <div className="bg-neutral-900/80 border border-neutral-800/90 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-neutral-200 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-amber-400" />
                وحدات التخزين (Storage Drives)
              </h3>
              <span className="font-mono text-amber-400 text-xs font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                {storageWatts} واط
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* NVMe */}
              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-neutral-200">M.2 NVMe SSD</span>
                  <span className="text-neutral-400 font-mono">~7W / قرص</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={nvmeCount}
                    onChange={(e) => { setNvmeCount(Number(e.target.value)); handleCustomChange(); }}
                    className="flex-1 accent-amber-500 cursor-pointer"
                  />
                  <span className="w-6 text-center font-mono font-bold text-sm text-neutral-100">{nvmeCount}</span>
                </div>
              </div>

              {/* SATA SSD */}
              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-neutral-200">2.5" SATA SSD</span>
                  <span className="text-neutral-400 font-mono">~4W / قرص</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={sataCount}
                    onChange={(e) => { setSataCount(Number(e.target.value)); handleCustomChange(); }}
                    className="flex-1 accent-amber-500 cursor-pointer"
                  />
                  <span className="w-6 text-center font-mono font-bold text-sm text-neutral-100">{sataCount}</span>
                </div>
              </div>

              {/* HDD */}
              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-neutral-200">3.5" HDD (7200 RPM)</span>
                  <span className="text-neutral-400 font-mono">~12W / قرص</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={hddCount}
                    onChange={(e) => { setHddCount(Number(e.target.value)); handleCustomChange(); }}
                    className="flex-1 accent-amber-500 cursor-pointer"
                  />
                  <span className="w-6 text-center font-mono font-bold text-sm text-neutral-100">{hddCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Cooling & Fans & Extras */}
          <div className="bg-neutral-900/80 border border-neutral-800/90 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-neutral-200 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Fan className="w-4 h-4 text-blue-400" />
              نظام التبريد ومراوح الصندوق والملحقات
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cooler */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="cooling-select" className="font-medium text-neutral-300">
                    نظام تبريد المعالج:
                  </label>
                  <span className="font-mono text-blue-400 text-xs font-bold">{coolingWatts}W</span>
                </div>
                <select
                  id="cooling-select"
                  value={selectedCoolingId}
                  onChange={(e) => { setSelectedCoolingId(e.target.value); handleCustomChange(); }}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-blue-500"
                >
                  {COOLING_OPTIONS.map(c => (
                    <option key={c.id} value={c.id}>{c.name} (~{c.wattage}W)</option>
                  ))}
                </select>
              </div>

              {/* Case Fans */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="fans-slider" className="font-medium text-neutral-300">
                    عدد مراوح الصندوق (Case Fans 120/140mm):
                  </label>
                  <span className="font-mono text-blue-400 text-xs font-bold">{fansCount} مراوح (~{Math.round(fansCount * 2.5)}W)</span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <input
                    id="fans-slider"
                    type="range"
                    min="0"
                    max="12"
                    value={fansCount}
                    onChange={(e) => { setFansCount(Number(e.target.value)); handleCustomChange(); }}
                    className="flex-1 accent-blue-500 cursor-pointer"
                  />
                  <span className="font-mono text-neutral-200 text-sm font-bold w-6 text-center">{fansCount}</span>
                </div>
              </div>
            </div>

            {/* Extras: RGB & Overclocking */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 cursor-pointer hover:border-neutral-700">
                <span className="text-xs text-neutral-300 font-medium">إضاءة RGB ووحدات تحكم</span>
                <input
                  type="checkbox"
                  checked={rgbLighting}
                  onChange={(e) => { setRgbLighting(e.target.checked); handleCustomChange(); }}
                  className="w-4 h-4 accent-emerald-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 cursor-pointer hover:border-neutral-700">
                <span className="text-xs text-neutral-300 font-medium">بطاقات توسعة PCIe إضافية</span>
                <select
                  value={pcieCardsCount}
                  onChange={(e) => { setPcieCardsCount(Number(e.target.value)); handleCustomChange(); }}
                  className="bg-neutral-900 border border-neutral-700 text-xs rounded px-2 py-1 text-neutral-200"
                >
                  <option value={0}>لا يوجد (0)</option>
                  <option value={1}>1 (كرت صوت/شبكة)</option>
                  <option value={2}>2 بطاقتين</option>
                </select>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 cursor-pointer hover:border-neutral-700">
                <div>
                  <span className="text-xs text-neutral-300 font-medium block">كسر سرعة المعالج/الكرت</span>
                  <span className="text-[10px] text-amber-400">إضافة +15% ذروة</span>
                </div>
                <input
                  type="checkbox"
                  checked={isOverclocking}
                  onChange={(e) => setIsOverclocking(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Results & PSU Recommendation Card (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Main Recommended PSU Card */}
          <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500"></div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                سعة مزود الطاقة الموصى بها
              </span>
              <span className="text-xs font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 px-2.5 py-0.5 rounded-full">
                موصى به
              </span>
            </div>

            {/* Big Wattage Display */}
            <div className="text-center py-4 my-1 border-y border-neutral-800/70">
              <div className="text-5xl font-black font-mono text-emerald-400 tracking-tight flex items-center justify-center gap-2">
                <span>{recommendedStandardPsu}</span>
                <span className="text-2xl font-bold text-neutral-300">واط</span>
              </div>
              <div className="text-xs text-neutral-400 mt-2">
                قيمة تجارية قياسية مناسبة تماماً لجهازك
              </div>
            </div>

            {/* Power breakdown stats */}
            <div className="space-y-3 pt-4 text-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">الاستهلاك الفعلي للقطع (Load):</span>
                <span className="font-mono font-bold text-neutral-100">{totalEstimatedWatts} واط</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">هامش الأمان المضاف (Safety Buffer):</span>
                <span className="font-mono font-bold text-cyan-400">+{headroomPct}% ({recommendedWattsCalculated - totalEstimatedWatts}W)</span>
              </div>

              {/* Headroom selector buttons */}
              <div className="pt-2">
                <div className="text-[11px] text-neutral-400 mb-1.5 flex items-center justify-between">
                  <span>نسبة الأمان واستيعاب قفزات الطاقة (Transients):</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setHeadroomPct(20)}
                    className={`py-1.5 rounded-lg border font-mono font-semibold transition-colors ${
                      headroomPct === 20
                        ? 'bg-neutral-800 border-neutral-600 text-neutral-200'
                        : 'bg-neutral-950/50 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    20%
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeadroomPct(30)}
                    className={`py-1.5 rounded-lg border font-mono font-semibold transition-colors ${
                      headroomPct === 30
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-neutral-950/50 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    30% (الأفضل)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeadroomPct(40)}
                    className={`py-1.5 rounded-lg border font-mono font-semibold transition-colors ${
                      headroomPct === 40
                        ? 'bg-neutral-800 border-neutral-600 text-neutral-200'
                        : 'bg-neutral-950/50 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    40% (تطوير)
                  </button>
                </div>
              </div>

              {/* Load gauge */}
              <div className="pt-3 border-t border-neutral-800/80">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-neutral-400">نسبة تحميل الباور في أقصى ضغط:</span>
                  <span className="font-mono font-bold text-neutral-200">{currentPsuLoadPercent}%</span>
                </div>
                <div className="w-full bg-neutral-950 rounded-full h-2.5 overflow-hidden border border-neutral-800">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      currentPsuLoadPercent > 85 ? 'bg-rose-500' : currentPsuLoadPercent > 65 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${currentPsuLoadPercent}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
                  💡 أفضل كفاءة كهربائية وأقل ضجيج مروحة لمزودات الطاقة تكون عند حمل بين <strong className="text-neutral-200">50% إلى 70%</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Component Consumption Breakdown Progress */}
          <div className="bg-neutral-900/80 border border-neutral-800/90 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              توزيع استهلاك الطاقة حسب القطع:
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>كرت الشاشة (GPU)</span>
                  <span className="font-mono font-semibold text-neutral-200">{gpuWatts}W ({Math.round((gpuWatts / totalEstimatedWatts) * 100)}%)</span>
                </div>
                <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${(gpuWatts / totalEstimatedWatts) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>المعالج (CPU)</span>
                  <span className="font-mono font-semibold text-neutral-200">{cpuWatts}W ({Math.round((cpuWatts / totalEstimatedWatts) * 100)}%)</span>
                </div>
                <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full" style={{ width: `${(cpuWatts / totalEstimatedWatts) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>اللوحة الأم والرام (MB & RAM)</span>
                  <span className="font-mono font-semibold text-neutral-200">{mbWatts + ramWatts}W ({Math.round(((mbWatts + ramWatts) / totalEstimatedWatts) * 100)}%)</span>
                </div>
                <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full" style={{ width: `${((mbWatts + ramWatts) / totalEstimatedWatts) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>التبريد والمراوح والتخزين</span>
                  <span className="font-mono font-semibold text-neutral-200">
                    {storageWatts + coolingWatts + fansAndExtrasWatts}W ({Math.round(((storageWatts + coolingWatts + fansAndExtrasWatts) / totalEstimatedWatts) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: `${((storageWatts + coolingWatts + fansAndExtrasWatts) / totalEstimatedWatts) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Efficiency Guide & Tips */}
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4 text-xs space-y-2.5 text-neutral-300">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Info className="w-4 h-4" />
              <span>نصائح اختيار كفاءة 80 PLUS:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-neutral-950/60 p-2 rounded-lg border border-neutral-800">
                <span className="font-bold text-amber-500 block mb-0.5">80+ Bronze</span>
                <span className="text-neutral-400">كفاءة ~85%، خيار اقتصادي ومناسب للأجهزة الخفيفة.</span>
              </div>
              <div className="bg-neutral-950/60 p-2 rounded-lg border border-neutral-800">
                <span className="font-bold text-yellow-400 block mb-0.5">80+ Gold (الأنسب)</span>
                <span className="text-neutral-400">كفاءة ~90%، المعيار الذهبي لأجهزة الألعاب والتصميم.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
