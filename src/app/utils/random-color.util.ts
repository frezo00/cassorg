import { Color } from '../enums';

export function getRandomColor(): Color[keyof Color] {
  const enumValues = (Object.values(Color) as unknown) as Color[keyof Color][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}
