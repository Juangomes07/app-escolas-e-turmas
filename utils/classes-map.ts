type ShiftMap = {
  [key: string]: string;
};

export const SHIFT_MAP: ShiftMap = {
  'Morning': 'Manhã',
  'Afternoon': 'Tarde',
  'Night': 'Noite',
};

export const REVERSE_SHIFT_MAP: ShiftMap = {
  'Manhã': 'Morning',
  'Tarde': 'Afternoon',
  'Noite': 'Night',
};