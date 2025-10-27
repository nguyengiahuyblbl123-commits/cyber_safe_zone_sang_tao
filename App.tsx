import React, { useState, useCallback, useEffect } from 'react';
import type { Page, QuizQuestion, QuizPack } from './types';
import { QUIZ_PACKS } from './constants';
import HomePage from './components/HomePage';
import KnowledgePage from './components/KnowledgePage';
import QuizPage from './components/QuizPage';
import AboutPage from './components/AboutPage';
import AdminPage from './components/AdminPage';
import { HomeIcon, BookOpenIcon, QuestionMarkCircleIcon, InformationCircleIcon, Cog6ToothIcon, ShieldCheckIcon } from './components/icons';

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-2 text-sm font-medium rounded-md transition-colors duration-200 ${isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
      }`}
  >
    {icon}
    <span className="mt-1 sm:mt-0 sm:ml-2">{label}</span>
  </button>
);

const ThemeToggle: React.FC<{ theme: 'light' | 'dark'; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
  <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
    {theme === 'light' ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 008.25-4.502z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    )}
  </button>
);

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [quizPacks, setQuizPacks] = useState<QuizPack[]>(QUIZ_PACKS);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const adminPackId = 'admin-added';

  const addQuestion = useCallback((newQuestion: Omit<QuizQuestion, 'id'>) => {
    setQuizPacks(prevPacks => {
      const newPacks = [...prevPacks];
      let adminPackIndex = newPacks.findIndex(p => p.id === adminPackId);

      if (adminPackIndex === -1) {
        newPacks.push({
          id: adminPackId,
          title: 'Câu hỏi do Admin thêm',
          description: 'Các câu hỏi được bổ sung bởi quản trị viên.',
          questions: [],
        });
        adminPackIndex = newPacks.length - 1;
      }

      const updatedPack = { ...newPacks[adminPackIndex] };
      updatedPack.questions = [
        ...updatedPack.questions,
        { ...newQuestion, id: Date.now() }
      ];
      newPacks[adminPackIndex] = updatedPack;

      return newPacks;
    });
  }, []);

  const updateQuestion = useCallback((updatedQuestion: QuizQuestion) => {
    setQuizPacks(prevPacks => {
      const newPacks = [...prevPacks];
      const adminPackIndex = newPacks.findIndex(p => p.id === adminPackId);

      if (adminPackIndex !== -1) {
        const updatedPack = { ...newPacks[adminPackIndex] };
        const questionIndex = updatedPack.questions.findIndex(q => q.id === updatedQuestion.id);
        if (questionIndex !== -1) {
          updatedPack.questions[questionIndex] = updatedQuestion;
          newPacks[adminPackIndex] = updatedPack;
        }
      }
      return newPacks;
    });
  }, []);

  const deleteQuestion = useCallback((questionId: number) => {
    setQuizPacks(prevPacks => {
      const newPacks = [...prevPacks];
      const adminPackIndex = newPacks.findIndex(p => p.id === adminPackId);

      if (adminPackIndex !== -1) {
        const updatedPack = { ...newPacks[adminPackIndex] };
        updatedPack.questions = updatedPack.questions.filter(q => q.id !== questionId);
        newPacks[adminPackIndex] = updatedPack;
      }
      return newPacks;
    });
  }, []);


  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'quiz':
        return <QuizPage packs={quizPacks} />;
      case 'about':
        return <AboutPage />;
      case 'admin':
        return <AdminPage
          adminQuestions={quizPacks.find(p => p.id === adminPackId)?.questions || []}
          addQuestion={addQuestion}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
        />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'home', label: 'Trang chủ', icon: <HomeIcon className="w-5 h-5" /> },
    { page: 'knowledge', label: 'Kiến thức', icon: <BookOpenIcon className="w-5 h-5" /> },
    { page: 'quiz', label: 'Quiz', icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },
    { page: 'about', label: 'Giới thiệu', icon: <InformationCircleIcon className="w-5 h-5" /> },
    { page: 'admin', label: 'Admin', icon: <Cog6ToothIcon className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200">
      <header className="bg-white shadow-md sticky top-0 z-10 dark:bg-gray-800 dark:border-b dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">CyberSafe Zone</h1>
            </div>
            <div className="flex items-center">
              <nav className="hidden sm:flex sm:space-x-2">
                {navItems.map(item => (
                  <NavItem
                    key={item.page}
                    label={item.label}
                    icon={item.icon}
                    isActive={activePage === item.page}
                    onClick={() => setActivePage(item.page)}
                  />
                ))}
              </nav>
              <div className="ml-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>

      <footer className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CyberSafe Zone. Dự án học tập của học sinh.</p>
        </div>
      </footer>

      {/* Bottom Navigation for Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around dark:bg-gray-800 dark:border-gray-700">
        {navItems.map(item => (
          <NavItem
            key={item.page}
            label={item.label}
            icon={item.icon}
            isActive={activePage === item.page}
            onClick={() => setActivePage(item.page)}
          />
        ))}
      </nav>
      {/* Spacer for bottom nav */}
      <div className="sm:hidden h-16"></div>
    </div>
  );
};

export default App;