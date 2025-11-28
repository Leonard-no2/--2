import { LucideIcon } from 'lucide-react';

export enum ProcessType {
  TRADITIONAL = 'TRADITIONAL',
  PYROLYSIS = 'PYROLYSIS'
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  temperature?: string;
  duration?: string;
  output?: string;
  icon: LucideIcon;
  details: string; // Long form description for the side panel
  x?: number; // For manual positioning if needed, though we'll use flex/grid
  y?: number;
}

export interface ComparisonMetric {
  name: string;
  traditional: number;
  pyrolysis: number;
  unit: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}