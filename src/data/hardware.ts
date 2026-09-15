export interface HardwareOption {
  id: string;
  name: string;
  wattage: number;
  category?: string;
}

export const CPU_OPTIONS: HardwareOption[] = [
  // Intel 14th & 13th Gen
  { id: 'intel-i9-14900k', name: 'Intel Core i9-14900K / 13900K', wattage: 253, category: 'Intel' },
  { id: 'intel-i7-14700k', name: 'Intel Core i7-14700K / 13700K', wattage: 253, category: 'Intel' },
  { id: 'intel-i5-14600k', name: 'Intel Core i5-14600K / 13600K', wattage: 181, category: 'Intel' },
  { id: 'intel-i5-14400', name: 'Intel Core i5-14400 / 13400', wattage: 148, category: 'Intel' },
  { id: 'intel-i3-14100', name: 'Intel Core i3-14100 / 12100', wattage: 89, category: 'Intel' },
  { id: 'intel-ultra-9', name: 'Intel Core Ultra 9 285K', wattage: 250, category: 'Intel' },
  { id: 'intel-ultra-7', name: 'Intel Core Ultra 7 265K', wattage: 250, category: 'Intel' },
  { id: 'intel-ultra-5', name: 'Intel Core Ultra 5 245K', wattage: 159, category: 'Intel' },
  // AMD Ryzen 9000 & 7000
  { id: 'amd-9950x', name: 'AMD Ryzen 9 9950X / 7950X', wattage: 230, category: 'AMD' },
  { id: 'amd-7800x3d', name: 'AMD Ryzen 7 7800X3D (Gaming King)', wattage: 120, category: 'AMD' },
  { id: 'amd-9800x3d', name: 'AMD Ryzen 7 9800X3D', wattage: 120, category: 'AMD' },
  { id: 'amd-7700x', name: 'AMD Ryzen 7 7700X / 9700X', wattage: 105, category: 'AMD' },
  { id: 'amd-7600x', name: 'AMD Ryzen 5 7600X / 9600X', wattage: 105, category: 'AMD' },
  { id: 'amd-7600', name: 'AMD Ryzen 5 7600 / 7500F', wattage: 65, category: 'AMD' },
  { id: 'amd-5800x3d', name: 'AMD Ryzen 7 5800X3D (AM4)', wattage: 105, category: 'AMD' },
  { id: 'amd-5600x', name: 'AMD Ryzen 5 5600X / 5600', wattage: 65, category: 'AMD' },
  { id: 'amd-threadripper', name: 'AMD Ryzen Threadripper 7000', wattage: 350, category: 'Workstation' },
  { id: 'custom-cpu', name: 'معالج مخصص (Custom TDP)', wattage: 125, category: 'Custom' },
];

export const GPU_OPTIONS: HardwareOption[] = [
  // NVIDIA RTX 40 & 50
  { id: 'rtx-5090', name: 'NVIDIA GeForce RTX 5090', wattage: 600, category: 'NVIDIA RTX 50' },
  { id: 'rtx-5080', name: 'NVIDIA GeForce RTX 5080', wattage: 400, category: 'NVIDIA RTX 50' },
  { id: 'rtx-4090', name: 'NVIDIA GeForce RTX 4090', wattage: 450, category: 'NVIDIA RTX 40' },
  { id: 'rtx-4080s', name: 'NVIDIA GeForce RTX 4080 / Super', wattage: 320, category: 'NVIDIA RTX 40' },
  { id: 'rtx-4070tis', name: 'NVIDIA GeForce RTX 4070 Ti / Super', wattage: 285, category: 'NVIDIA RTX 40' },
  { id: 'rtx-4070s', name: 'NVIDIA GeForce RTX 4070 / Super', wattage: 220, category: 'NVIDIA RTX 40' },
  { id: 'rtx-4060ti', name: 'NVIDIA GeForce RTX 4060 Ti', wattage: 165, category: 'NVIDIA RTX 40' },
  { id: 'rtx-4060', name: 'NVIDIA GeForce RTX 4060', wattage: 115, category: 'NVIDIA RTX 40' },
  // NVIDIA RTX 30
  { id: 'rtx-3090ti', name: 'NVIDIA GeForce RTX 3090 Ti / 3090', wattage: 400, category: 'NVIDIA RTX 30' },
  { id: 'rtx-3080', name: 'NVIDIA GeForce RTX 3080 / 3080 Ti', wattage: 350, category: 'NVIDIA RTX 30' },
  { id: 'rtx-3070', name: 'NVIDIA GeForce RTX 3070 / 3070 Ti', wattage: 250, category: 'NVIDIA RTX 30' },
  { id: 'rtx-3060', name: 'NVIDIA GeForce RTX 3060 / 3060 Ti', wattage: 200, category: 'NVIDIA RTX 30' },
  // AMD Radeon
  { id: 'rx-7900xtx', name: 'AMD Radeon RX 7900 XTX', wattage: 355, category: 'AMD Radeon' },
  { id: 'rx-7900xt', name: 'AMD Radeon RX 7900 XT', wattage: 315, category: 'AMD Radeon' },
  { id: 'rx-7800xt', name: 'AMD Radeon RX 7800 XT', wattage: 263, category: 'AMD Radeon' },
  { id: 'rx-7700xt', name: 'AMD Radeon RX 7700 XT', wattage: 245, category: 'AMD Radeon' },
  { id: 'rx-7600', name: 'AMD Radeon RX 7600 / XT', wattage: 190, category: 'AMD Radeon' },
  { id: 'rx-6700xt', name: 'AMD Radeon RX 6700 XT', wattage: 230, category: 'AMD Radeon' },
  { id: 'integrated', name: 'كرت شاشة مدمج (Integrated Graphics)', wattage: 15, category: 'Integrated' },
  { id: 'custom-gpu', name: 'كرت شاشة مخصص (Custom Wattage)', wattage: 250, category: 'Custom' },
];

export const MOTHERBOARD_OPTIONS: HardwareOption[] = [
  { id: 'mb-itx', name: 'Mini-ITX (لوحة صغيرة)', wattage: 30 },
  { id: 'mb-matx', name: 'Micro-ATX (لوحة متوسطة قياسية)', wattage: 45 },
  { id: 'mb-atx', name: 'ATX قياسية (Standard Gaming)', wattage: 60 },
  { id: 'mb-eatx', name: 'E-ATX احترافية لكسر السرعة (High-End / OC)', wattage: 85 },
];

export const COOLING_OPTIONS: HardwareOption[] = [
  { id: 'cool-stock', name: 'مبرد هوائي افتراضي (Stock Cooler)', wattage: 5 },
  { id: 'cool-air-dual', name: 'مبرد هوائي برجي مزدوج (Dual Tower Air)', wattage: 12 },
  { id: 'cool-aio-120', name: 'تبريد مائي مغلق AIO 120/140mm', wattage: 15 },
  { id: 'cool-aio-240', name: 'تبريد مائي مغلق AIO 240/280mm', wattage: 22 },
  { id: 'cool-aio-360', name: 'تبريد مائي ثلاثي AIO 360/420mm', wattage: 30 },
  { id: 'cool-custom', name: 'تبريد مائي مفتوح بمضخة احترافية (Custom Loop)', wattage: 45 },
];

export interface PresetBuild {
  id: string;
  name: string;
  desc: string;
  cpuId: string;
  gpuId: string;
  motherboardId: string;
  ramType: 'ddr4' | 'ddr5';
  ramCount: number;
  nvmeCount: number;
  sataCount: number;
  hddCount: number;
  coolingId: string;
  fansCount: number;
  rgbLighting: boolean;
}

export const PRESET_BUILDS: PresetBuild[] = [
  {
    id: 'budget-gaming',
    name: 'تجميعة ألعاب اقتصادية (Budget 1080p)',
    desc: 'معالج Ryzen 5 5600 + كرت RTX 4060 + لوحة mATX + 16GB RAM',
    cpuId: 'amd-5600x',
    gpuId: 'rtx-4060',
    motherboardId: 'mb-matx',
    ramType: 'ddr4',
    ramCount: 2,
    nvmeCount: 1,
    sataCount: 0,
    hddCount: 0,
    coolingId: 'cool-stock',
    fansCount: 3,
    rgbLighting: false,
  },
  {
    id: 'mid-gaming',
    name: 'تجميعة ألعاب متوازنة (Sweet Spot 1440p)',
    desc: 'معالج Ryzen 7 7800X3D + كرت RTX 4070 Super + لوحة ATX + 32GB DDR5',
    cpuId: 'amd-7800x3d',
    gpuId: 'rtx-4070s',
    motherboardId: 'mb-atx',
    ramType: 'ddr5',
    ramCount: 2,
    nvmeCount: 2,
    sataCount: 0,
    hddCount: 0,
    coolingId: 'cool-aio-240',
    fansCount: 4,
    rgbLighting: true,
  },
  {
    id: 'enthusiast-4k',
    name: 'تجميعة القوة القصوى (Enthusiast 4K)',
    desc: 'معالج Core i9-14900K + كرت RTX 4090 + لوحة E-ATX + 64GB DDR5 + AIO 360',
    cpuId: 'intel-i9-14900k',
    gpuId: 'rtx-4090',
    motherboardId: 'mb-eatx',
    ramType: 'ddr5',
    ramCount: 4,
    nvmeCount: 3,
    sataCount: 1,
    hddCount: 1,
    coolingId: 'cool-aio-360',
    fansCount: 7,
    rgbLighting: true,
  },
  {
    id: 'creator-workstation',
    name: 'محطة عمل وتصميم ومونتاج (Content Creator)',
    desc: 'معالج Ryzen 9 9950X + كرت RTX 4080 Super + لوحة ATX + 64GB DDR5',
    cpuId: 'amd-9950x',
    gpuId: 'rtx-4080s',
    motherboardId: 'mb-atx',
    ramType: 'ddr5',
    ramCount: 4,
    nvmeCount: 4,
    sataCount: 2,
    hddCount: 2,
    coolingId: 'cool-aio-360',
    fansCount: 6,
    rgbLighting: true,
  },
  {
    id: 'office-home',
    name: 'حاسوب مكتبي وتصفح منزلي (Office / Daily)',
    desc: 'معالج Core i3-14100 + كرت شاشة مدمج + لوحة mATX + 16GB RAM',
    cpuId: 'intel-i3-14100',
    gpuId: 'integrated',
    motherboardId: 'mb-matx',
    ramType: 'ddr4',
    ramCount: 2,
    nvmeCount: 1,
    sataCount: 0,
    hddCount: 0,
    coolingId: 'cool-stock',
    fansCount: 1,
    rgbLighting: false,
  }
];
