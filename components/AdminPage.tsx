import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '../types';

interface AdminPageProps {
  adminQuestions: QuizQuestion[];
  addQuestion: (question: Omit<QuizQuestion, 'id'>) => void;
  updateQuestion: (question: QuizQuestion) => void;
  deleteQuestion: (questionId: number) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ adminQuestions, addQuestion, updateQuestion, deleteQuestion }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  
  const ADMIN_PASSWORD = 'admin123'; // Simple hardcoded password

  useEffect(() => {
    // Ensure the correct answer is still valid if options change
    if (correctAnswer && !options.includes(correctAnswer)) {
      setCorrectAnswer('');
    }
  }, [options, correctAnswer]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const resetForm = () => {
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setExplanation('');
    setEditingQuestionId(null);
  };

  const handleEdit = (q: QuizQuestion) => {
    setEditingQuestionId(q.id);
    setQuestion(q.question);
    setOptions(q.options);
    setCorrectAnswer(q.correctAnswer);
    setExplanation(q.explanation);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?')) {
      deleteQuestion(id);
      setSuccessMessage('Xóa câu hỏi thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || options.some(opt => !opt) || !correctAnswer || !explanation) {
        alert('Vui lòng điền đầy đủ tất cả các trường.');
        return;
    }
    if (!options.includes(correctAnswer)) {
        alert('Đáp án đúng phải là một trong các lựa chọn.');
        return;
    }
    
    if (editingQuestionId) {
        // Update existing question
        updateQuestion({ id: editingQuestionId, question, options, correctAnswer, explanation });
        setSuccessMessage('Cập nhật câu hỏi thành công!');
    } else {
        // Add new question
        addQuestion({ question, options, correctAnswer, explanation });
        setSuccessMessage('Thêm câu hỏi thành công!');
    }
    
    resetForm();
    setTimeout(() => setSuccessMessage(''), 3000);
  };


  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Trang Quản trị viên</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {editingQuestionId ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi Quiz mới'}
        </h2>
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 dark:bg-green-900/40 dark:text-green-300 dark:border-green-600 p-4 mb-4" role="alert">
            <p>{successMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmitQuestion} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Câu hỏi</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            />
          </div>
          {options.map((opt, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lựa chọn {index + 1}</label>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Đáp án đúng</label>
             <select 
              value={correctAnswer}
              onChange={e => setCorrectAnswer(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
                <option value="" disabled>-- Chọn đáp án đúng --</option>
                {options.filter(opt => opt.trim() !== '').map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
             </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Giải thích</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
              {editingQuestionId && (
                <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                    Hủy
                </button>
              )}
              <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                  {editingQuestionId ? 'Cập nhật' : 'Thêm câu hỏi'}
              </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Danh sách câu hỏi đã thêm</h3>
        {adminQuestions.length > 0 ? (
          <ul className="space-y-4">
            {adminQuestions.map(q => (
              <li key={q.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{q.question}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Đáp án: {q.correctAnswer}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(q)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded hover:bg-yellow-600">Sửa</button>
                  <button onClick={() => handleDelete(q.id)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded hover:bg-red-600">Xóa</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Chưa có câu hỏi nào được thêm bởi Admin.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;