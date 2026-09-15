export interface StorageUnit {
  id: string;
  nameAr: string;
  nameEn: string;
  symbol: string;
  binarySymbol: string;
  bytesDecimal: number; // 10^x
  bytesBinary: number;  // 2^(10*x)
  description: string;
}

export const STORAGE_UNITS: StorageUnit[] = [
  {
    id: 'b',
    nameAr: 'بت',
    nameEn: 'Bit',
    symbol: 'b',
    binarySymbol: 'b',
    bytesDecimal: 0.125,
    bytesBinary: 0.125,
    description: 'أصغر وحدة بيانات رقمية (0 أو 1)',
  },
  {
    id: 'B',
    nameAr: 'بايت',
    nameEn: 'Byte',
    symbol: 'B',
    binarySymbol: 'B',
    bytesDecimal: 1,
    bytesBinary: 1,
    description: 'يساوي 8 بت، ويكفي لتخزين حرف واحد',
  },
  {
    id: 'KB',
    nameAr: 'كيلوبايت',
    nameEn: 'Kilobyte / Kibibyte',
    symbol: 'KB',
    binarySymbol: 'KiB',
    bytesDecimal: 1000,
    bytesBinary: 1024,
    description: '1000 بايت بالنظام العشري أو 1024 بالنظام الثنائي',
  },
  {
    id: 'MB',
    nameAr: 'ميجابايت',
    nameEn: 'Megabyte / Mebibyte',
    symbol: 'MB',
    binarySymbol: 'MiB',
    bytesDecimal: 1_000_000,
    bytesBinary: 1_048_576,
    description: 'مناسب لقياس حجم ملفات الموسيقى والصور',
  },
  {
    id: 'GB',
    nameAr: 'جيجابايت',
    nameEn: 'Gigabyte / Gibibyte',
    symbol: 'GB',
    binarySymbol: 'GiB',
    bytesDecimal: 1_000_000_000,
    bytesBinary: 1_073_741_824,
    description: 'الحجم المعتاد لذواكر RAM والأقراص المحمولة',
  },
  {
    id: 'TB',
    nameAr: 'تيرابايت',
    nameEn: 'Terabyte / Tebibyte',
    symbol: 'TB',
    binarySymbol: 'TiB',
    bytesDecimal: 1_000_000_000_000,
    bytesBinary: 1_099_511_627_776,
    description: 'السعة القياسية لأقراص التخزين الحديثة SSD و HDD',
  },
  {
    id: 'PB',
    nameAr: 'بيتَابايت',
    nameEn: 'Petabyte / Pebibyte',
    symbol: 'PB',
    binarySymbol: 'PiB',
    bytesDecimal: 1_000_000_000_000_000,
    bytesBinary: 1_125_899_906_842_624,
    description: 'سعات مراكز البيانات والخوادم السحابية الضخمة',
  },
];

export interface DriveSizeExample {
  commercialSize: number; // in GB
  label: string;
  manufacturerBytes: number;
  actualWindowsGiB: number;
}

export const COMMON_DRIVES: DriveSizeExample[] = [
  { commercialSize: 250, label: '250 GB SSD', manufacturerBytes: 250_000_000_000, actualWindowsGiB: 232.83 },
  { commercialSize: 500, label: '500 GB SSD', manufacturerBytes: 500_000_000_000, actualWindowsGiB: 465.66 },
  { commercialSize: 1000, label: '1 TB (1000 GB) SSD/HDD', manufacturerBytes: 1_000_000_000_000, actualWindowsGiB: 931.32 },
  { commercialSize: 2000, label: '2 TB (2000 GB) SSD/HDD', manufacturerBytes: 2_000_000_000_000, actualWindowsGiB: 1862.65 },
  { commercialSize: 4000, label: '4 TB (4000 GB) HDD', manufacturerBytes: 4_000_000_000_000, actualWindowsGiB: 3725.29 },
  { commercialSize: 8000, label: '8 TB (8000 GB) HDD', manufacturerBytes: 8_000_000_000_000, actualWindowsGiB: 7450.58 },
];
