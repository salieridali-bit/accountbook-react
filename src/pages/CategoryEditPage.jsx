import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCategory, updateCategory } from "../api/categoryApi";

import "../styles/categoryForm.css";

export default function CategoryEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCategory() {
      try {
        setErrorMessage("");

        const data = await getCategory(id);

        setName(data.name);
      } catch (error) {
        console.error(error);

        setErrorMessage("카테고리를 불러오지 못했습니다.");
      }
    }

    loadCategory();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("카테고리명을 입력해주세요.");
      return;
    }

    try {
      await updateCategory(id, name);

      navigate("/categories");
    } catch (error) {
      console.error(error);

      setErrorMessage("카테고리 수정에 실패했습니다.");
    }
  }

  return (
    <div className="category-form-page">
      <div className="category-form-box">
        <h2>카테고리 수정</h2>

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
