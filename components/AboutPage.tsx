import React from 'react';
import { UserGroupIcon } from './icons';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <div className="flex items-center mb-6">
        <UserGroupIcon className="w-12 h-12 text-blue-600 mr-4"/>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Báo cáo dự án</h1>
      </div>
      
      <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-headings:text-white dark:prose-strong:text-white">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. Tên đề tài</h2>
        <p className="font-bold text-xl text-blue-700 dark:text-blue-400">Website tuyên truyền kỹ năng an toàn mạng cho học sinh THCS - "CyberSafe Zone"</p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-6 dark:text-white">2. Lý do chọn đề tài</h2>
        <p>Trong thời đại số hiện nay, Internet đã trở thành một phần không thể thiếu trong cuộc sống và học tập của chúng em. Tuy nhiên, bên cạnh những lợi ích to lớn, không gian mạng cũng tiềm ẩn rất nhiều rủi ro như lừa đảo, đánh cắp thông tin, bắt nạt trực tuyến... Đặc biệt, học sinh THCS như chúng em là đối tượng dễ bị tổn thương do còn thiếu kinh nghiệm và kỹ năng tự bảo vệ. Vì vậy, chúng em quyết định xây dựng website "CyberSafe Zone" với mong muốn tạo ra một cẩm nang hữu ích, giúp các bạn trang bị kiến thức để lướt web an toàn và có trách nhiệm hơn.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-6 dark:text-white">3. Mục tiêu và ý nghĩa</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Mục tiêu:</strong>
            <ul className="list-circle pl-6 mt-2">
              <li>Cung cấp kiến thức cơ bản và cần thiết về các vấn đề an toàn mạng phổ biến.</li>
              <li>Tạo ra các bài trắc nghiệm (quiz) để người dùng tự kiểm tra và củng cố kiến thức.</li>
              <li>Xây dựng một giao diện thân thiện, dễ sử dụng, phù hợp với lứa tuổi học sinh.</li>
            </ul>
          </li>
          <li><strong>Ý nghĩa:</strong>
            <ul className="list-circle pl-6 mt-2">
              <li>Nâng cao nhận thức về tầm quan trọng của an toàn thông tin trên mạng.</li>
              <li>Giúp học sinh hình thành thói quen và kỹ năng tự bảo vệ bản thân trong môi trường số.</li>
              <li>Góp phần xây dựng một cộng đồng mạng lành mạnh và an toàn hơn cho lứa tuổi học đường.</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-6 dark:text-white">4. Cách thực hiện</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Công nghệ sử dụng:</strong> Dự án được xây dựng dưới dạng một trang web tĩnh, sử dụng các công nghệ web cơ bản:
            <ul className="list-circle pl-6 mt-2">
              <li><strong>HTML (HyperText Markup Language):</strong> Dùng để xây dựng cấu trúc và nội dung cho các trang web.</li>
              <li><strong>CSS (Cascading Style Sheets) & Tailwind CSS:</strong> Dùng để thiết kế giao diện, màu sắc, bố cục, giúp trang web trở nên đẹp mắt và dễ nhìn.</li>
              <li><strong>JavaScript (JS):</strong> Dùng để tạo ra các tính năng tương tác như quiz, chuyển trang, giúp trang web "sống động" hơn.</li>
            </ul>
          </li>
          <li><strong>Cấu trúc website:</strong> Website được chia thành các trang chính:
            <ul className="list-circle pl-6 mt-2">
              <li><strong>Trang chủ:</strong> Giới thiệu tổng quan về dự án, mục tiêu và các tính năng chính.</li>
              <li><strong>Trang kiến thức:</strong> Cung cấp thông tin chi tiết về 4 chủ đề cốt lõi: Bảo vệ mật khẩu, Nhận biết lừa đảo, An toàn trên mạng xã hội, và Quản lý thông tin cá nhân.</li>
              <li><strong>Trang Quiz:</strong> Nơi người dùng làm các bài trắc nghiệm để kiểm tra kiến thức đã học. Hệ thống sẽ tự động chấm điểm và đưa ra giải thích cho từng câu trả lời.</li>
              <li><strong>Trang giới thiệu:</strong> Nơi đặt báo cáo này, giới thiệu về nhóm thực hiện và các kế hoạch tương lai.</li>
              <li><strong>Trang Admin:</strong> Một trang đơn giản cho phép người quản trị (giáo viên hoặc trưởng nhóm) đăng nhập và thêm các câu hỏi mới vào bộ quiz.</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-6 dark:text-white">5. Tính sáng tạo, điểm nổi bật</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Nội dung gần gũi:</strong> Tất cả kiến thức và ví dụ đều được trình bày bằng ngôn ngữ dễ hiểu, gắn liền với các tình huống thực tế mà học sinh thường gặp.</li>
          <li><strong>Học đi đôi với hành:</strong> Thay vì chỉ đọc lý thuyết, người dùng có thể ngay lập tức kiểm tra kiến thức qua các bài quiz tương tác, giúp việc học trở nên thú vị và hiệu quả hơn.</li>
          <li><strong>Giao diện hiện đại:</strong> Trang web có thiết kế đơn giản, sạch sẽ, màu sắc tươi sáng, và tương thích tốt trên cả máy tính và điện thoại.</li>
          <li><strong>Khả năng mở rộng:</strong> Tính năng "Admin" cho phép dễ dàng cập nhật, bổ sung câu hỏi mới mà không cần sửa đổi mã nguồn phức tạp, giúp website luôn mới mẻ.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-6 dark:text-white">6. Hướng phát triển</h2>
        <p>Trong tương lai, chúng em dự định sẽ tiếp tục phát triển dự án với các tính năng nâng cao hơn:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li>Bổ sung thêm nhiều chủ đề kiến thức mới như tin tức giả (fake news), quản lý thời gian sử dụng Internet,...</li>
            <li>Xây dựng các mini-game hoặc video hoạt hình để truyền tải kiến thức một cách sinh động hơn.</li>
            <li>Tạo một diễn đàn nhỏ để các bạn học sinh có thể chia sẻ câu chuyện, kinh nghiệm và học hỏi lẫn nhau.</li>
            <li>Lưu trữ điểm số của người dùng để họ có thể theo dõi sự tiến bộ của mình qua thời gian.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;