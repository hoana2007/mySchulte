# 🧠 Schulte Master - Focus & Brain Training

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/SVG-FFB13B?style=for-the-badge&logo=svg&logoColor=white" alt="SVG" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
</p>

**Schulte Master** là một ứng dụng web hiện đại giúp rèn luyện khả năng tập trung cao độ, mở rộng tầm nhìn ngoại vi (peripheral vision), tăng tốc độ đọc nhanh và phản xạ não bộ thông qua phương pháp **Bảng Schulte (Schulte Table)** kinh điển.

---

## 📖 Bảng Schulte là gì?

**Bảng Schulte** ban đầu được phát triển bởi bác sĩ tâm thần người Đức Walter Schulte như một bài kiểm tra tâm lý chẩn đoán để nghiên cứu các đặc tính của sự chú ý. 

Khi luyện tập, người chơi giữ mắt nhìn vào trung tâm bảng và cố gắng tìm các số theo thứ tự tăng dần bằng cách sử dụng tầm nhìn ngoại vi. Luyện tập thường xuyên giúp:
- 🚀 Mở rộng góc nhìn và tầm nhìn ngoại vi.
- ⚡ Tăng tốc độ đọc hiểu và quét thông tin (Speed Reading).
- 🎯 Nâng cao khả năng tập trung chú ý và khả năng quan sát nhanh.
- 🧠 Kích thích hoạt động của vỏ não và phản xạ tư duy.

---

## ✨ Tính Năng Nổi Bật

### 1. Đa dạng chế độ chơi (Game Modes)
- **Lưới Ô Số (Grid Matrix):**
  - Tùy chỉnh kích thước bảng linh hoạt từ **3x3** (9 số) đến **9x9** (81 số).
  - Tùy chọn kiểu dáng nút bấm: **Hình vuông bo góc** (`Square`) hoặc **Hình tròn** (`Circle`).
  - Font chữ tự động co giãn (`dynamic scaling`) phù hợp với kích thước từng ô.
- **Bánh Xe / Hình Tròn Toán Học (SVG Wheel Mode):**
  - Sử dụng đồ họa vector SVG và thuật toán lượng giác để dựng bảng hình tròn tương tác mượt mà.
  - **Vòng Đồng Tâm (Concentric Rings - 30 ô):** Gồm 3 vòng số đồng tâm (12 ô vòng ngoài, 12 ô vòng giữa, 6 ô vòng trong).
  - **Mặt Đồng Hồ (Clock Radial - 24 ô):** Bố cục 2 vòng số (12 ô ngoài, 12 ô trong).
  - **Vòng Đơn (Single Ring - 16 ô):** Vòng tròn đơn giản 16 số.
  - Tự động đánh dấu nhận diện số đầu tiên (số 1) và số lớn nhất (`maxNumber`).

### 2. Trải nghiệm tương tác chân thực
- **Bắt đầu tự động:** Đồng hồ đo thời gian (chính xác đến mili-giây `00:00.000`) tự động kích hoạt ngay khi bạn chạm vào số **1**.
- **Chỉ báo mục tiêu trực quan:** Hộp trạng thái hiển thị rõ ràng số tiếp theo cần tìm.
- **Phản hồi tức thì (Instant Feedback):**
  - **Chọn đúng:** Ô chuyển sang màu xanh dương neon (`#38bdf8`) nổi bật.
  - **Chọn sai:** Ô chuyển màu cảnh báo cam (`#fb923c`) kết hợp hiệu ứng rung lắc (Shake Animation).
- **Tối ưu cảm ứng di động (Mobile Optimized):** Tích hợp sự kiện `pointerdown` loại bỏ độ trễ bấm 300ms trên màn hình cảm ứng điện thoại, chống bôi đen văn bản khi thao tác nhanh.

### 3. Cá nhân hóa & Lưu trữ dữ liệu
- **Bảng Thành Tích (Leaderboard):** Tự động lưu trữ Top 5 kỷ lục thời gian nhanh nhất vào `localStorage`, phân loại theo tên người chơi và chế độ bảng.
- **Bảo mật hiển thị:** Lọc mã độc HTML (XSS prevention) đối với tên người chơi nhập vào.
- **Chế độ Giao diện Sáng / Tối (Light & Dark Theme):** Bảng màu Dark Slate hiện đại và Light Mode trang nhã, lưu trạng thái yêu thích của người dùng.
- **Hỗ trợ Song ngữ (i18n):** Chuyển đổi tức thì giữa **Tiếng Việt (VI)** và **Tiếng Anh (EN)**.

---

## 📁 Cấu Trúc Dự Án

```
mySchulte/
│
├── index.html        # Cấu trúc giao diện HTML5 ngữ nghĩa và bảng SVG
├── style.css         # Hệ thống Design Tokens, Responsive CSS, Themes & Animations
├── script.js         # Logic trò chơi, thuật toán xáo trộn Fisher-Yates, SVG Render & i18n
└── README.md         # Tài liệu hướng dẫn sử dụng và giới thiệu dự án
```

---

## 🛠️ Công Nghệ Sử Dụng

- **Ngôn ngữ:** HTML5, CSS3, JavaScript (ES6+ thuần, không phụ thuộc thư viện ngoài).
- **Đồ họa & Hiệu ứng:** SVG (Scalable Vector Graphics), CSS Grid & Flexbox, CSS Keyframes.
- **Kiểu chữ (Typography):** Google Fonts (*Cinzel*, *Plus Jakarta Sans*, *JetBrains Mono*).
- **Lưu trữ cục bộ:** Web Storage API (`localStorage`).
- **Thuật toán:** Fisher-Yates Shuffle Algorithm (xáo trộn ngẫu nhiên phân phối đều).

---

## 🚀 Hướng Dẫn Cài Đặt & Sử Dụng

Dự án là một ứng dụng Web tĩnh (Client-side), không yêu cầu cài đặt môi trường backend hay npm package phức tạp.

### Cách 1: Mở trực tiếp trên trình duyệt
1. Tải về hoặc clone repository về máy tính của bạn:
   ```bash
   git clone https://github.com/hoana2007/mySchulte.git
   ```
2. Mở file `index.html` bằng bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari).

### Cách 2: Sử dụng VS Code Live Server
1. Mở thư mục dự án trong Visual Studio Code.
2. Cài đặt tiện ích mở rộng **Live Server** (Ritwick Dey).
3. Nhấp chuột phải vào `index.html` và chọn **Open with Live Server** (hoặc phím tắt `Alt + L, Alt + O`).

---

## 🎮 Cách Chơi

1. **Nhập tên** của bạn tại ô *Tên người chơi*.
2. **Chọn chế độ chơi** mong muốn:
   - *Lưới Ô Số:* Chọn kích thước (từ 3x3 đến 9x9) và kiểu nút (Vuông/Tròn).
   - *Bánh Xe:* Chọn kiểu vòng bánh xe (30 ô, 24 ô, 16 ô).
3. Nhấn **Trò Chơi Mới** (hoặc thay đổi tùy chọn để tự tạo bảng mới).
4. **Nhìn vào tâm bảng** và nhấn vào **số 1** để kích hoạt đồng hồ tính giờ.
5. Lần lượt tìm và bấm các số tiếp theo theo thứ tự tăng dần (**1 ➔ 2 ➔ 3 ➔ ...**).
6. Hoàn thành toàn bộ các số để lập kỷ lục mới trên Bảng Xếp Hạng!

---

## 👤 Tác Giả & Bản Quyền

- **Tác giả:** [hoana2007](https://github.com/hoana2007)
- **Hỗ trợ phát triển:** Powered by GeminiAI
- **Năm phát hành:** 2026
- **Giấy phép:** [MIT License](LICENSE)
