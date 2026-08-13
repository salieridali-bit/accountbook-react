import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCategories, deleteCategory } from "../api/categoryApi";

import "../styles/categoryPage.css";

export default function CategoryPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        setErrorMessage("");

        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(error);

        setErrorMessage("카테고리를 불러오지 못했습니다.");
      }
    }

    loadCategories();
  }, []);

  async function handleDelete(id) {
    const ok = window.confirm("정말 삭제하시겠습니까?");

    if (!ok) {
      return;
    }

    try {
      setErrorMessage("");

      await deleteCategory(id);

      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      console.error(error);

      setErrorMessage("카테고리 삭제에 실패했습니다.");
    }
  }

  return (
    <div className="category-page">
      <div className="category-box">
        <div className="category-top">
          <h2>카테고리 목록</h2>

          <div>
            <button
              type="button"
              className="category-add category-transactions"
              onClick={() => navigate("/transactions")}
            >
              거래내역
            </button>

            <button
              type="button"
              className="category-add"
              onClick={() => navigate("/categories/new")}
            >
              + 카테고리 추가
            </button>
          </div>
        </div>

        {errorMessage && <div className="category-error">{errorMessage}</div>}

        {categories.length === 0 ? (
          <div className="category-empty">등록된 카테고리가 없습니다.</div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <div className="category-name">{category.name}</div>

              <div>
                <button
                  type="button"
                  className="category-edit"
                  onClick={() => navigate(`/categories/${category.id}/edit`)}
                >
                  수정
                </button>

                <button
                  type="button"
                  className="category-delete"
                  onClick={() => handleDelete(category.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
