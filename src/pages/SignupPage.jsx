import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../api/authApi";

import "../styles/signupPage.css";

export default function SignupPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!username || !password1 || !password2 || !email) {
      setErrorMessage("모든 항목을 입력해주세요.");
      return;
    }

    if (username.length < 3 || username.length > 25) {
      setErrorMessage("사용자 ID는 3자 이상 25자 이하로 입력해주세요.");
      return;
    }

    if (password1 !== password2) {
      setErrorMessage("2개의 패스워드가 일치하지 않습니다.");
      return;
    }

    try {
      await signup(username, password1, password2, email);

      navigate("/login");
    } catch (error) {
      console.error(error);

      setErrorMessage("회원가입에 실패했습니다.");
    }
  }

  return (
    <div className="signup-page">
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="signup-error">{errorMessage}</div>}

        <div className="signup-field">
          <label htmlFor="username">사용자 ID</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="signup-field">
          <label htmlFor="password1">비밀번호</label>

          <input
            id="password1"
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>

        <div className="signup-field">
          <label htmlFor="password2">비밀번호 확인</label>

          <input
            id="password2"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div className="signup-field">
          <label htmlFor="email">이메일</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>

      <button
        type="button"
        className="signup-login"
        onClick={() => navigate("/login")}
      >
        로그인으로
      </button>
    </div>
  );
}
