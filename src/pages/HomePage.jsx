import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMe, logout } from "../api/authApi";

import "../styles/homePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setErrorMessage("");

        const data = await getMe();

        setUser(data);
      } catch (error) {
        console.error(error);

        navigate("/login");
      }
    }

    loadUser();
  }, [navigate]);

  async function handleLogout() {
    try {
      setErrorMessage("");

      await logout();

      navigate("/login");
    } catch (error) {
      console.error(error);

      setErrorMessage("로그아웃에 실패했습니다.");
    }
  }

  if (!user) {
    return <div className="home-page">로딩 중...</div>;
  }

  return (
    <div className="home-page">
      <h2>가계부 메인</h2>

      <p>로그인 성공!</p>

      <p>{user.username}님 로그인 중</p>

      {errorMessage && <div className="home-error">{errorMessage}</div>}

      <button
        type="button"
        className="home-category"
        onClick={() => navigate("/categories")}
      >
        카테고리 관리
      </button>

      <br />

      <button type="button" className="home-logout" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
