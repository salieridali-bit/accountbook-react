import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCategory } from "../api/categoryApi";

import "../styles/categoryForm.css";

export default function CategoryCreatePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("카테고리명을 입력해주세요.");
      return;
    }

    try {
      await createCategory(name);

      navigate("/categories");
    } catch (error) {
      console.error(error);

      setErrorMessage("카테고리 등록에 실패했습니다.");
    }
  }

  return (
    <div className="category-form-page">
      <div className="category-form-box">
        <h2>카테고리 등록</h2>

        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="category-form-error">{errorMessage}</div>
          )}

          <input
            className="category-form-input"
            type="text"
            value={name}
            placeholder="카테고리명 입력"
            onChange={(e) => setName(e.target.value)}
          />

          <button className="category-form-save" type="submit">
            저장
          </button>

          <button
            className="category-form-list"
            type="button"
            onClick={() => navigate("/categories")}
          >
            목록
          </button>
        </form>
      </div>
    </div>
  );
}
