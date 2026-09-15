import React, { useState, useEffect } from 'react';
import { 
  User, 
  ShieldAlert, 
  Cookie, 
  Check, 
  X, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Settings2, 
  Trash2,
  Lock
} from 'lucide-react';

export function Footer() {
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    preferences: true,
    performance: false
  });

  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem('cookie_consent');
      if (savedConsent) {
        setCookieConsent(savedConsent);
      }
      const savedPrefs = localStorage.getItem('cookie_preferences');
      if (savedPrefs) {
        setCookiePreferences(JSON.parse(savedPrefs));
      }
    } catch {
      // LocalStorage access handling
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('cookie_consent', 'accepted_all');
      localStorage.setItem('cookie_preferences', JSON.stringify({
        necessary: true,
        preferences: true,
        performance: true
      }));
    } catch {
      // Silent error handling
    }
    setCookieConsent('accepted_all');
    setShowCookieModal(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('cookie_consent', 'custom');
      localStorage.setItem('cookie_preferences', JSON.stringify(cookiePreferences));
    } catch {
      // Silent error handling
    }
    setCookieConsent('custom');
    setShowCookieModal(false);
  };

  const handleClearData = () => {
    try {
      localStorage.removeItem('cookie_consent');
      localStorage.removeItem('cookie_preferences');
      localStorage.removeItem('psu_custom_config');
    } catch {
      // Silent error handling
    }
    setCookieConsent(null);
    setShowCookieModal(false);
  };

  return (
    <footer id="app-footer" className="border-t border-neutral-900 bg-neutral-950 text-neutral-300 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid: Founder, Disclaimer, and Cookies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Founder Section */}
          <div id="founder-section" className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                <User className="w-4 h-4" />
                <span>المؤسس والمطور</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2 font-mono">
                Taha setri
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                مطور ومهندس ومؤسس المنصة. تم تصميم المنصة لتقديم أدوات تقنية دقيقة وسريعة لحساب أحمال الطاقة الكهربائية وتحويلات وسائط التخزين الرقمية باحترافية عالية.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono text-neutral-300 font-semibold">Taha setri</span>
              <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md text-[11px]">
                المؤسس المعتمد
              </span>
            </div>
          </div>

          {/* 2. Disclaimer Section */}
          <div id="disclaimer-section" className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                <ShieldAlert className="w-4 h-4" />
                <span>إخلاء المسؤولية (Disclaimer)</span>
              </div>
              <h3 className="text-base font-bold text-white">
                تنبيه وإخلاء مسؤولية فنية
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                كافة التقديرات والأرقام الصادرة عن حاسبة الطاقة ومحول السعات هي لأغراض إرشادية وتقريبية. قد تتغير قراءات الطاقة الفعلية وفقاً لارتفاعات الأحمال اللحظية (Transient Spikes) وجودة مزود الطاقة.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
              <button
                id="toggle-full-disclaimer-btn"
                type="button"
                onClick={() => setShowFullDisclaimer(!showFullDisclaimer)}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <span>{showFullDisclaimer ? 'إخفاء التفاصيل' : 'قراءة الإخلاء الكامل'}</span>
                {showFullDisclaimer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              <span className="text-[11px] text-neutral-500">محدثة 2026</span>
            </div>
          </div>

          {/* 3. Cookies & Local Storage Section */}
          <div id="cookies-section" className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase">
                <Cookie className="w-4 h-4" />
                <span>قسم الكوكيز والخصوصية</span>
              </div>
              <h3 className="text-base font-bold text-white">
                ملفات تعريف الارتباط والتخزين
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                نستخدم التخزين المحلي (Local Storage) وملفات الارتباط لحفظ خياراتك وتفضيلات القطع ووحدات القياس فقط لراحتك، دون تتبع أو جمع بيانات تعريف شخصية.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
              <button
                id="manage-cookies-btn"
                type="button"
                onClick={() => setShowCookieModal(true)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>إدارة إعدادات الكوكيز</span>
              </button>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>آمن 100%</span>
              </span>
            </div>
          </div>

        </div>

        {/* Expandable Full Disclaimer Text */}
        {showFullDisclaimer && (
          <div id="full-disclaimer-panel" className="bg-neutral-900/80 border border-amber-900/40 rounded-2xl p-6 text-xs text-neutral-300 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              <span>نص إخلاء المسؤولية القانونية والفنية الكامل</span>
            </h4>
            <p className="leading-relaxed text-neutral-300">
              1. <strong>الأغراض الإرشادية:</strong> المعلومات والحسابات الناتجة عن منصة الحاسبات، بما فيها حاسبة قدرة مزود الطاقة (PSU Wattage Calculator) ومحول وحدات التخزين، تم إعدادها بالاعتماد على المواصفات القياسية المعلنة من المصنعين (Intel, AMD, NVIDIA, Seagate, Western Digital وغيرها). هذه البيانات مقدمة لأغراض استرشادية فقط.
            </p>
            <p className="leading-relaxed text-neutral-300">
              2. <strong>تقلبات الجهد والأحمال اللحظية:</strong> بعض بطاقات الرسوميات والمعالجات الحديثة تشهد قفزات استهلاك طاقة لحظية (Transient Power Excursions) قد تتجاوز قيم TDP الرسمية بنسبة ملحوظة، كما قد يختلف الاستهلاك عند كسر السرعة (Overclocking) أو تغيير إعدادات الفولتية في اللوحة الأم.
            </p>
            <p className="leading-relaxed text-neutral-300">
              3. <strong>سلامة الأجهزة:</strong> لا يتحمل المؤسس <strong>Taha setri</strong> أو أي من المساهمين في هذا الموقع أي مسؤولية قانونية، مباشرة أو غير مباشرة، عن أي أعطال أو أضرار في العتاد أو فقدان للبيانات قد ينجم عن اختيار مزود طاقة غير ملائم أو سوء تقدير للعتاد. نوصي بمراجعة دليل اللوحة الأم والمكونات قبل اتخاذ قرار الشراء والتركيب.
            </p>
          </div>
        )}

        {/* Bottom Bar: Copyright, Founder Note, Clean Branding */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center sm:text-right">
            جميع الحقوق محفوظة © {new Date().getFullYear()} • تأسيس وتطوير{' '}
            <strong className="text-neutral-300 font-mono">Taha setri</strong>
          </p>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <button
              type="button"
              onClick={() => setShowFullDisclaimer(true)}
              className="hover:text-amber-400 transition-colors"
            >
              إخلاء المسؤولية
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowCookieModal(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              سياسة الكوكيز
            </button>
            <span>•</span>
            <span className="text-neutral-500 font-mono">Taha setri Edition</span>
          </div>
        </div>

      </div>

      {/* Cookie Settings Modal */}
      {showCookieModal && (
        <div 
          id="cookie-modal-overlay" 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCookieModal(false)}
        >
          <div 
            id="cookie-modal-box"
            className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">إعدادات ملفات تعريف الارتباط (Cookies)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCookieModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              نحن نحترم خصوصيتك بالكامل. لا نقوم ببيع أو مشاركة أي بيانات مع أطراف ثالثة. يمكنك تخصيص فئات ملفات الارتباط والتخزين المحلي المستخدمة:
            </p>

            <div className="space-y-3 text-xs">
              {/* Necessary */}
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-start justify-between gap-3">
                <div>
                  <h5 className="font-semibold text-neutral-200">الملفات الضرورية (Strictly Necessary)</h5>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    مطلوبة لعمل أدوات الحساب وعرض الواجهة بسلاسة. لا يمكن تعطيلها.
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-neutral-800 text-neutral-400 font-mono text-[10px]">
                  دائماً مفعل
                </span>
              </div>

              {/* Preferences */}
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-start justify-between gap-3">
                <div>
                  <h5 className="font-semibold text-neutral-200">ملفات تفضيلات المستخدم (Preferences)</h5>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    حفظ خيارات العتاد المختارة وحاسبة وحدات التخزين لتجدها جاهزة في زياراتك القادمة.
                  </p>
                </div>
                <input 
                  type="checkbox"
                  checked={cookiePreferences.preferences}
                  onChange={(e) => setCookiePreferences({ ...cookiePreferences, preferences: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded mt-1 cursor-pointer"
                />
              </div>

              {/* Performance / Anonymous */}
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-start justify-between gap-3">
                <div>
                  <h5 className="font-semibold text-neutral-200">تحسين الأداء المجهول (Performance)</h5>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    قياس سرعة استجابة محرك الحسابات محلياً لتحسين الاستقرار.
                  </p>
                </div>
                <input 
                  type="checkbox"
                  checked={cookiePreferences.performance}
                  onChange={(e) => setCookiePreferences({ ...cookiePreferences, performance: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded mt-1 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={handleClearData}
                className="px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح البيانات المحفوظة</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                >
                  حفظ الخيارات
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>قبول الكل</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtle First-Time Cookie Notice Banner */}
      {!cookieConsent && (
        <div 
          id="cookie-consent-bar"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-40 bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-bottom duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-cyan-950/80 text-cyan-400 rounded-xl border border-cyan-800/60 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-white">إشعار ملفات تعريف الارتباط</h4>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                نستخدم ملفات تعريف الارتباط والتخزين المحلي لتحسين تجربتك وحفظ تكويناتك. بتصفحك للموقع توافق على سياسة الخصوصية.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 text-xs pt-1 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={() => setShowCookieModal(true)}
              className="px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              تخصيص
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
            >
              موافق
            </button>
          </div>
        </div>
      )}

    </footer>
  );
}
