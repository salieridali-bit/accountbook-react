import { useNavigate } from "react-router-dom";

import "../styles/homePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h2>가계부</h2>

      <p>수입과 지출을 간편하게 관리하세요.</p>

      <button
        type="button"
        className="home-category"
        onClick={() => navigate("/login")}
      >
        로그인
      </button>

      <br />

      <button
        type="button"
        className="home-category"
        onClick={() => navigate("/signup")}
      >
        회원가입
      </button>
    </div>
  );
}
