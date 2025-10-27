import React, { useState, useMemo } from 'react';
import type { QuizQuestion, QuizPack } from '../types';

interface QuizPageProps {
  packs: QuizPack[];
}

const QuizPage: React.FC<QuizPageProps> = ({ packs }) => {
  const [selectedPack, setSelectedPack] = useState<QuizPack | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const questions = useMemo(() => selectedPack?.questions || [], [selectedPack]);

  const score = useMemo(() => {
    if (!selectedPack) return 0;
    return questions.reduce((total, question) => {
      return total + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
  }, [questions, selectedAnswers, selectedPack]);

  const handleStartQuiz = (pack: QuizPack) => {
    setSelectedPack(pack);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setShowReview(false);
  };
  
  const handleBackToPacks = () => {
      setSelectedPack(null);
  }

  const handleAnswerSelect = (questionId: number, answer: string) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };
  
  const handleRestart = () => {
    if (!selectedPack) return;
    handleStartQuiz(selectedPack);
  };

  if (!selectedPack) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Chọn gói câu hỏi</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map(pack => (
            <div 
              key={pack.id} 
              onClick={() => handleStartQuiz(pack)} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-blue-900/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">{pack.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{pack.description}</p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-4 font-semibold">{pack.questions.length} câu hỏi</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl animate-fade-in">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Bạn đã hoàn thành gói câu hỏi!</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">"{selectedPack.title}"</p>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Điểm số của bạn: <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> / <span className="font-bold">{questions.length}</span>
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleRestart}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Làm lại
          </button>
          <button
            onClick={() => setShowReview(prev => !prev)}
            className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            {showReview ? 'Ẩn đáp án' : 'Xem lại đáp án'}
          </button>
          <button
            onClick={handleBackToPacks}
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            Chọn gói khác
          </button>
        </div>
        {showReview && (
          <div className="mt-8 text-left space-y-4">
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700'} border`}>
                  <p className="font-bold dark:text-white">{index + 1}. {q.question}</p>
                  <p className="mt-2 dark:text-gray-300">Đáp án của bạn: <span className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{userAnswer || "Chưa trả lời"}</span></p>
                  {!isCorrect && <p className="dark:text-gray-300">Đáp án đúng: <span className="font-semibold text-green-700 dark:text-green-400">{q.correctAnswer}</span></p>}
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded"><em>Giải thích:</em> {q.explanation}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
      return (
        <div className="text-center">
            <p className="dark:text-white">Gói câu hỏi này không có câu hỏi nào.</p>
            <button onClick={handleBackToPacks} className="mt-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                Quay lại
            </button>
        </div>
      )
  }
  const selectedOption = selectedAnswers[currentQuestion.id];

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">{selectedPack.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Câu hỏi {currentQuestionIndex + 1} / {questions.length}</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{currentQuestion.question}</h2>
      <div className="space-y-3">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerSelect(currentQuestion.id, option)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedOption === option
                ? 'bg-blue-100 border-blue-500 font-semibold ring-2 ring-blue-300 dark:bg-blue-900/50 dark:border-blue-500 dark:text-white'
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleBackToPacks}
          className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          &larr; Chọn gói khác
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors dark:disabled:bg-gray-600"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;