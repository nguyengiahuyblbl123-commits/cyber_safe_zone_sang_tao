export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizPack {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export type Page = 'home' | 'knowledge' | 'quiz' | 'about' | 'admin';

export interface KnowledgeArticle {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: {
    introduction: string;
    points: {
      heading: string;
      details: string;
    }[];
    conclusion: string;
  };
}
