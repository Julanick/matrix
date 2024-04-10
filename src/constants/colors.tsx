interface ColorScheme {
  threshold: number;
  color: string;
  textColor: string;
}

export const colorsForTruePositive: ColorScheme[] = [
  { threshold: 25, color: '#F2F8FF', textColor: 'inherit' },
  { threshold: 50, color: '#BFDEFF', textColor: 'inherit' },
  { threshold: 75, color: '#59A9FF', textColor: '#FFFFFF' },
  { threshold: 100, color: '#007AFF', textColor: '#FFFFFF' }
];

export const colorsForOther: ColorScheme[] = [
  { threshold: 5, color: '#FFFFFF', textColor: 'inherit' },
  { threshold: 15, color: '#F3F4F6', textColor: 'inherit' },
  { threshold: 20, color: '#D1D4DB', textColor: 'inherit' },
  { threshold: 100, color: '#979EAE', textColor: 'inherit' },
];
