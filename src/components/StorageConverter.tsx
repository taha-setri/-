import React, { useState, useMemo } from 'react';
import { 
  Database, 
  ArrowLeftRight, 
  HelpCircle, 
  FileText, 
  Film, 
  Gamepad2, 
  Camera, 
  Music, 
  Check, 
  Copy,
  Info,
  Layers
} from 'lucide-react';
import { STORAGE_UNITS, COMMON_DRIVES } from '../data/storageUnits';

export const StorageConverter: React.FC = () => {
  // Mode: 'decimal' (1000) or 'binary' (1024)
  const [calculationMode, setCalculationMode] = useState<'decimal' | 'binary'>('decimal');

  // Base value in Bytes for synchronized conversion
  const [bytesValue, setBytesValue] = useState<number>(1_000_000_000_000); // default 1 TB decimal

  // Commercial drive test input (GB)
  const [commercialDriveGb, setCommercialDriveGb] = useState<number>(1000);

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Convert bytes into specific unit
  const getUnitValue = (unitId: string): string => {
    const unit = STORAGE_UNITS.find(u => u.id === unitId);
    if (!unit) return '0';

    let factor = calculationMode === 'decimal' ? unit.bytesDecimal : unit.bytesBinary;
    if (unitId === 'b') {
      const bits = bytesValue * 8;
      return bits.toLocaleString('en-US', { maximumFractionDigits: 4 });
    }
    const val = bytesValue / factor;
    if (val === 0) return '0';
    if (val < 0.000001) return val.toExponential(4);
    if (val >= 1000000000) return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return val.toLocaleString('en-US', { maximumFractionDigits: 6 });
  };

  // Update bytes from unit input
  const handleUnitInput = (unitId: string, inputVal: string) => {
    const cleanStr = inputVal.replace(/,/g, '');
    const num = parseFloat(cleanStr);
    if (isNaN(num) || num < 0) {
      setBytesValue(0);
      return;
    }

    const unit = STORAGE_UNITS.find(u => u.id === unitId);
    if (!unit) return;

    let factor = calculationMode === 'decimal' ? unit.bytesDecimal : unit.bytesBinary;
    if (unitId === 'b') {
      setBytesValue(num / 8);
    } else {
      setBytesValue(num * factor);
    }
  };

  // Preset buttons
  const setQuickValue = (bytes: number) => {
    setBytesValue(bytes);
  };

  // Copy to clipboard
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Real-world practical estimations based on current GB size
  const currentTotalGbDecimal = bytesValue / 1_000_000_000;
  const currentTotalGiBBinary = bytesValue / 1_073_741_824;

  const realWorldStats = useMemo(() => {
    const gb = currentTotalGbDecimal;
    return {
      movies4k: Math.floor(gb / 22),       // ~22 GB per 4K movie
      aaaGames: Math.floor(gb / 85),       // ~85 GB per modern AAA game
      rawPhotos: Math.floor((gb * 1000) / 35), // ~35 MB per RAW 30MP photo
      flacSongs: Math.floor((gb * 1000) / 30), // ~30 MB per FLAC song
    };
  }, [currentTotalGbDecimal]);

  // Windows mystery calculation
  const windowsActualSpace = useMemo(() => {
    if (commercialDriveGb <= 0) return 0;
    // Commercial drive bytes = commercialDriveGb * 1,000,000,000
    const rawBytes = commercialDriveGb * 1_000_000_000;
    // Windows reports in GiB (divided by 1024^3)
    const inWindowsGiB = rawBytes / (1024 * 1024 * 1024);
    const difference = commercialDriveGb - inWindowsGiB;
    const diffPercent = ((difference / commercialDriveGb) * 100).toFixed(1);
    return {
      inWindowsGiB: inWindowsGiB.toFixed(2),
      difference: difference.toFixed(2),
      diffPercent,
    };
  }, [commercialDriveGb]);

  return (
    <div id="storage-converter" className="space-y-6">
      {/* Mode Switcher & Explainer */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-neutral-100 font-bold text-base">
              <ArrowLeftRight className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>نظام الحساب المعتمد في التحويل:</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              اختر بين النظام العشري التجاري المعتمد لدى مصنعي الأقراص أو النظام الثنائي المعتمد في أنظمة التشغيل
            </p>
          </div>

          <div className="flex rounded-xl bg-neutral-950 p-1 border border-neutral-800 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setCalculationMode('decimal')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                calculationMode === 'decimal'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              العشري SI (قوة 1000)
              <span className="block text-[10px] font-normal text-neutral-400">1 KB = 1,000 Bytes</span>
            </button>

            <button
              type="button"
              onClick={() => setCalculationMode('binary')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                calculationMode === 'binary'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              الثنائي IEC (قوة 1024)
              <span className="block text-[10px] font-normal text-neutral-400">1 KiB = 1,024 Bytes</span>
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-neutral-800/80 text-xs">
          <span className="text-neutral-400 text-[11px] font-medium">سعات شائعة سريعة:</span>
          {[
            { label: '512 MB', bytes: 512 * (calculationMode === 'decimal' ? 1_000_000 : 1_048_576) },
            { label: '8 GB', bytes: 8 * (calculationMode === 'decimal' ? 1_000_000_000 : 1_073_741_824) },
            { label: '16 GB (RAM)', bytes: 16 * (calculationMode === 'decimal' ? 1_000_000_000 : 1_073_741_824) },
            { label: '32 GB (RAM)', bytes: 32 * (calculationMode === 'decimal' ? 1_000_000_000 : 1_073_741_824) },
            { label: '500 GB (SSD)', bytes: 500 * (calculationMode === 'decimal' ? 1_000_000_000 : 1_073_741_824) },
            { label: '1 TB (SSD)', bytes: 1 * (calculationMode === 'decimal' ? 1_000_000_000_000 : 1_099_511_627_776) },
            { label: '2 TB (SSD)', bytes: 2 * (calculationMode === 'decimal' ? 1_000_000_000_000 : 1_099_511_627_776) },
            { label: '4 TB (HDD)', bytes: 4 * (calculationMode === 'decimal' ? 1_000_000_000_000 : 1_099_511_627_776) },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQuickValue(item.bytes)}
              className="bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Synchronized Unit Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STORAGE_UNITS.map((unit) => {
          const val = getUnitValue(unit.id);
          const activeSymbol = calculationMode === 'binary' ? unit.binarySymbol : unit.symbol;
          const isCopied = copiedKey === unit.id;

          return (
            <div 
              key={unit.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 transition-all hover:border-neutral-700 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-neutral-100 text-sm">{unit.nameAr}</span>
                    <span className="text-xs text-neutral-400 font-mono">({unit.nameEn})</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-cyan-400">
                    {activeSymbol}
                  </span>
                </div>

                <div className="relative mt-2">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleUnitInput(unit.id, e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm font-mono text-neutral-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 pl-16 text-left"
                    dir="ltr"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                    <span className="text-xs font-mono text-neutral-500 font-bold">{activeSymbol}</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  {unit.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-neutral-800/70 flex justify-between items-center text-xs">
                <span className="text-[10px] text-neutral-500 font-mono">
                  {calculationMode === 'decimal' ? `10^${Math.log10(unit.bytesDecimal).toFixed(0)}` : `2^${(Math.log2(unit.bytesBinary) || 0).toFixed(0)}`}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(val, unit.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-cyan-400 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ الرقم</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-world Estimator Cards */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-neutral-200 flex items-center gap-2 mb-3">
          <Film className="w-4 h-4 text-emerald-400" />
          ماذا يمكنك أن تخزن بهذه السعة تقريباً؟ ({currentTotalGbDecimal.toFixed(1)} GB)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-neutral-950/70 border border-neutral-800/90 rounded-xl p-3">
            <Film className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
            <div className="text-xl font-mono font-black text-neutral-100">{realWorldStats.movies4k.toLocaleString()}</div>
            <div className="text-xs text-neutral-400 mt-0.5">فيلم بدقة 4K HDR (~22GB)</div>
          </div>

          <div className="bg-neutral-950/70 border border-neutral-800/90 rounded-xl p-3">
            <Gamepad2 className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
            <div className="text-xl font-mono font-black text-neutral-100">{realWorldStats.aaaGames.toLocaleString()}</div>
            <div className="text-xs text-neutral-400 mt-0.5">لعبة AAA ضخمة (~85GB)</div>
          </div>

          <div className="bg-neutral-950/70 border border-neutral-800/90 rounded-xl p-3">
            <Camera className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
            <div className="text-xl font-mono font-black text-neutral-100">{realWorldStats.rawPhotos.toLocaleString()}</div>
            <div className="text-xs text-neutral-400 mt-0.5">صورة احترافية RAW (~35MB)</div>
          </div>

          <div className="bg-neutral-950/70 border border-neutral-800/90 rounded-xl p-3">
            <Music className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
            <div className="text-xl font-mono font-black text-neutral-100">{realWorldStats.flacSongs.toLocaleString()}</div>
            <div className="text-xs text-neutral-400 mt-0.5">مقطع صوتي فائق الدقة FLAC (~30MB)</div>
          </div>
        </div>
      </div>

      {/* Windows Missing Storage Space Solver */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
            <h3 className="text-base font-bold text-neutral-100">
              حل لغز "المساحة المفقودة" في نظام ويندوز (Windows Usable Storage)
            </h3>
          </div>
          <span className="text-xs bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 px-3 py-1 rounded-full font-medium">
            تفسير هندسي تقني دقيق
          </span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          عندما تشتري قرص تخزين بسعة <strong className="text-white">1 تيرابايت (1000 جيجابايت)</strong>، تجد نظام ويندوز يعرض سعته كـ <strong className="text-cyan-400">931 جيجابايت فقط</strong>!
          السبب ليس عطلاً أو مساحة مسروقة، بل لأن الشركات المصنعة تحسب بالنظام العشري (1000^3 بايت لكل GB)، بينما ويندوز يحسب بالنظام الثنائي (1024^3 بايت لكل GiB) ولكنه يكتب الرمز GB خطأً!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-2">
          {/* Input Drive Size */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-medium text-neutral-300 block">
              اختر أو اكتب السعة المكتوبة على علبة القرص (GB):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="10"
                max="100000"
                value={commercialDriveGb}
                onChange={(e) => setCommercialDriveGb(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm font-mono text-neutral-100 focus:outline-none focus:border-cyan-500"
                dir="ltr"
              />
              <span className="bg-neutral-800 text-neutral-200 text-xs font-mono font-bold px-3 py-2 rounded-xl flex items-center">
                GB
              </span>
            </div>

            {/* Quick commercial buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {COMMON_DRIVES.map(drive => (
                <button
                  key={drive.commercialSize}
                  type="button"
                  onClick={() => setCommercialDriveGb(drive.commercialSize)}
                  className={`text-[11px] font-mono px-2 py-1 rounded border transition-colors ${
                    commercialDriveGb === drive.commercialSize
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {drive.commercialSize >= 1000 ? `${drive.commercialSize / 1000} TB` : `${drive.commercialSize} GB`}
                </button>
              ))}
            </div>
          </div>

          {/* Results Comparison */}
          <div className="md:col-span-7 bg-neutral-950/80 border border-neutral-800 rounded-xl p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="p-2 bg-neutral-900/60 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block mb-0.5">مكتوب على العلبة</span>
                <span className="text-base font-mono font-bold text-neutral-200">{commercialDriveGb} GB</span>
                <span className="text-[10px] text-neutral-500 block">{(commercialDriveGb * 1_000_000_000).toLocaleString()} Byte</span>
              </div>

              <div className="p-2 bg-cyan-950/40 rounded-lg border border-cyan-800/40">
                <span className="text-[10px] text-cyan-300 block mb-0.5">المساحة الفعلية في ويندوز</span>
                <span className="text-lg font-mono font-black text-cyan-400">{windowsActualSpace.inWindowsGiB} GiB</span>
                <span className="text-[10px] text-cyan-300/80 block">معروضة كـ GB بالويندوز</span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-2 bg-neutral-900/60 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block mb-0.5">الفرق الظاهري</span>
                <span className="text-base font-mono font-bold text-amber-400">-{windowsActualSpace.difference} GB</span>
                <span className="text-[10px] text-amber-500/80 block font-mono">({windowsActualSpace.diffPercent}% فرق الحساب)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
