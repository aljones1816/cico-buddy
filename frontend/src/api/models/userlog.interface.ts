export interface iUserLog {
  _id: string;
  breakfast: { calories: number; protein: number };
  lunch: { calories: number; protein: number };
  dinner: { calories: number; protein: number };
  snacks: { calories: number; protein: number };
  exercise: { calories: number };
  bodyweight: number;
  date: Date;
  user_id: string;
}
