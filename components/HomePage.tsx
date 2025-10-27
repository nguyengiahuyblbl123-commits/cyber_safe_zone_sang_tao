import React from 'react';
import type { Page } from '../types';
import { ShieldCheckIcon, BookOpenIcon, QuestionMarkCircleIcon } from './icons';

interface HomePageProps {
  setActivePage: (page: Page) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; buttonText: string; onClick: () => void }> = ({ icon, title, description, buttonText, onClick }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-blue-900/50 transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full p-4 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
    <button
      onClick={onClick}
      className="mt-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
    >
      {buttonText}
    </button>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  return (
    <div className="animate-fade-in">
      <section className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 rounded-lg shadow-xl">
        <div className="max-w-4xl mx-auto">
          <ShieldCheckIcon className="w-20 h-20 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Chào mừng đến với CyberSafe Zone</h2>
          <p className="text-lg md:text-xl mb-8">Nơi trang bị cho học sinh THCS những kỹ năng cần thiết để lướt web an toàn và thông minh.</p>
          <button
            onClick={() => setActivePage('knowledge')}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
          >
            Bắt đầu Khám phá
          </button>
        </div>
      </section>

      <section className="py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Mục tiêu của chúng tôi</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Cung cấp một môi trường học tập vui vẻ, trực quan để nâng cao nhận thức về an toàn trên không gian mạng.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpenIcon className="w-10 h-10" />}
            title="Trang bị Kiến thức"
            description="Tìm hiểu các chủ đề quan trọng như bảo vệ mật khẩu, nhận diện lừa đảo, và sử dụng mạng xã hội an toàn."
            buttonText="Học ngay"
            onClick={() => setActivePage('knowledge')}
          />
          <FeatureCard
            icon={<QuestionMarkCircleIcon className="w-10 h-10" />}
            title="Kiểm tra qua Quiz"
            description="Thử thách bản thân với các câu hỏi trắc nghiệm thú vị để củng cố kiến thức và nhận phản hồi tức thì."
            buttonText="Thử tài"
            onClick={() => setActivePage('quiz')}
          />
          <FeatureCard
            icon={<ShieldCheckIcon className="w-10 h-10" />}
            title="Xây dựng Kỹ năng"
            description="Trở thành một công dân số có trách nhiệm, biết cách tự bảo vệ mình và những người xung quanh trên Internet."
            buttonText="Tìm hiểu thêm"
            onClick={() => setActivePage('about')}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;