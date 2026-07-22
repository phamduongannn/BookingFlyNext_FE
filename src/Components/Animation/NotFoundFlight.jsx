// Import React library để sử dụng JSX và các tính năng của React
import React from 'react';

// Import Lottie library để hiển thị animation dạng Lottie (file JSON)
import Lottie from 'lottie-react';

// Import file JSON chứa animation khi không tìm thấy chuyến bay
import notFoundFlightAnimation from './../../assets/animation/Animation-Flight-Not-Found.json';

// Định nghĩa component NotFoundFlight dưới dạng functional component
const NotFoundFlight = () => {
  // Return JSX để hiển thị component
  return (
    // Đặt một div bao bọc với class "mx-auto" để căn giữa nội dung theo chiều ngang
    <div className="mx-auto">
      {/* Sử dụng component Lottie để hiển thị animation */}
      <Lottie
        // Thiết lập width của animation là 600px
        style={{ width: '600px' }}
        // Truyền dữ liệu animation từ file JSON vào Lottie
        animationData={notFoundFlightAnimation}
        // Thiết lập loop để animation chạy lặp đi lặp lại
        loop={true}n
      />
    </div>
  );
};

// Xuất component để có thể sử dụng ở nơi khác trong project
export default NotFoundFlight;