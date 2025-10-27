import React, { useState } from 'react';
import { KNOWLEDGE_ARTICLES } from '../constants';
import type { KnowledgeArticle } from '../types';

const KnowledgePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle>(KNOWLEDGE_ARTICLES[0]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="md:w-1/4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Chủ đề</h2>
        <nav className="space-y-2">
          {KNOWLEDGE_ARTICLES.map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${
                selectedArticle.id === article.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white hover:bg-blue-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <article.icon className="w-6 h-6 mr-3" />
              <span className="font-semibold">{article.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="md:w-3/4">
        <article className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md animate-fade-in">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-lg p-3 mr-4">
              <selectedArticle.icon className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedArticle.title}</h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 italic">{selectedArticle.content.introduction}</p>

          <div className="space-y-6">
            {selectedArticle.content.points.map((point, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{point.heading}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{point.details}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
             <p className="text-md text-gray-700 bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg dark:bg-yellow-900/40 dark:text-yellow-200 dark:border-yellow-500">
                <strong>Lời khuyên:</strong> {selectedArticle.content.conclusion}
             </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default KnowledgePage;