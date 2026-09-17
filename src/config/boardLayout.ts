// Official 10x10 Sequence board layout (100 tiles)
// Corners at indices 0, 9, 90, 99 act as wild spaces for all players.
// Notice Jacks are excluded from the board, as they function as wild/removal cards in hand.

export const BOARD_LAYOUT: readonly string[] = [
  // Row 0 (Indices 0 - 9)
  'CORNER', '2S',  '3S',  '4S',  '5S',  '6S',  '7S',  '8S',  '9S',  'CORNER',

  // Row 1 (Indices 10 - 19)
  '6C',     '5C',  '4C',  '3C',  '2C',  'AH',  'KH',  'QH',  '10H', '10S',

  // Row 2 (Indices 20 - 29)
  '7C',     'AS',  '2D',  '3D',  '4D',  '5D',  '6D',  '7D',  '9H',  'QS',

  // Row 3 (Indices 30 - 39)
  '8C',     'KS',  '6C',  '5C',  '4C',  '3C',  '2C',  '8D',  '8H',  'KS',

  // Row 4 (Indices 40 - 49)
  '9C',     'QS',  '7C',  '6H',  '5H',  '4H',  'AH',  '9D',  '7H',  'AS',

  // Row 5 (Indices 50 - 59)
  '10C',    '10S', '8C',  '7H',  '2H',  '3H',  'KH',  '10D', '6H',  '2D',

  // Row 6 (Indices 60 - 69)
  'QC',     '9S',  '9C',  '8H',  '9H',  '10H', 'QH',  'QD',  '5H',  '3D',

  // Row 7 (Indices 70 - 79)
  'KC',     '8S',  '10C', 'QC',  'KC',  'AC',  'AD',  'KD',  '4H',  '4D',

  // Row 8 (Indices 80 - 89)
  'AC',     '7S',  '6S',  '5S',  '4S',  '3S',  '2S',  '2H',  '3H',  '5D',

  // Row 9 (Indices 90 - 99)
  'CORNER', 'AD',  'KD',  'QD',  '10D', '9D',  '8D',  '7D',  '6D',  'CORNER',
] as const;

export type BoardCardCode = (typeof BOARD_LAYOUT)[number];
export type JackCardCode = 'JH' | 'JS' | 'JC' | 'JD';
export type CardCode = Exclude<BoardCardCode, 'CORNER'> | JackCardCode;