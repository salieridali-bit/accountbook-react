import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/authApi";

import "../styles/loginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("사용자 ID 또는 비밀번호를 확인해주세요.");
      return;
    }

    try {
      await login(username, password);

      // 로그인 성공 후 실제 가계부 화면으로 이동
      navigate("/transactions");
    } catch (error) {
      console.error(error);

      setErrorMessage("사용자 ID 또는 비밀번호를 확인해주세요.");
    }
  }

  return (
    <div className="login-page">
      <h2>로그인</h2>

      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="login-error">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="login-field">
          <label htmlFor="username">사용자 ID</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">비밀번호</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">
          로그인
        </button>
      </form>

      <button
        type="button"
        className="login-signup"
        onClick={() => navigate("/signup")}
      >
        회원가입
      </button>
    </div>
  );
}
