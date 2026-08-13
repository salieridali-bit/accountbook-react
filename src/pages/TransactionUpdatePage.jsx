import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTransaction, updateTransaction } from "../api/transactionApi";

import { getCategories } from "../api/categoryApi";

import "../styles/transactionForm.css";

export default function TransactionUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setErrorMessage("");

        const transactionData = await getTransaction(id);

        const categoryData = await getCategories();

        setType(transactionData.type);
        setAmount(transactionData.amount);
        setMemo(transactionData.memo ?? "");
        setDate(transactionData.date);

        setCategoryId(
          transactionData.categoryId ? String(transactionData.categoryId) : "",
        );

        setCategories(categoryData);
      } catch (error) {
        console.error(error);

        setErrorMessage("거래내역을 불러오지 못했습니다.");
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!type || !amount || !date || !categoryId) {
      setErrorMessage("구분, 금액, 날짜, 카테고리를 입력해주세요.");

      return;
    }

    if (Number(amount) <= 0) {
      setErrorMessage("금액은 0보다 커야 합니다.");

      return;
    }

    try {
      await updateTransaction(id, type, amount, memo, date, categoryId);

      navigate("/transactions");
    } catch (error) {
      console.error(error);

      setErrorMessage("거래내역 수정에 실패했습니다.");
    }
  }

  return (
    <div className="transaction-form-page">
      <div className="transaction-form-card">
        <div className="transaction-form-header">
          <div className="transaction-form-badge">Account Book</div>

          <h2>거래내역 수정</h2>

          <div className="transaction-form-desc">
            날짜, 금액, 카테고리를 수정해서 가계부를 기록하세요.
          </div>
        </div>

        {errorMessage && (
          <div className="transaction-form-error">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="transaction-form-grid">
            <div className="transaction-form-field">
              <label htmlFor="type">구분</label>

              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">선택하세요</option>

                <option value="INCOME">수입</option>

                <option value="EXPENSE">지출</option>
              </select>
            </div>

            <div className="transaction-form-field">
              <label htmlFor="amount">금액</label>

              <input
                id="amount"
                type="number"
                value={amount}
                placeholder="예: 9000"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="transaction-form-grid">
            <div className="transaction-form-field">
              <label htmlFor="date">날짜</label>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="transaction-form-field">
              <label htmlFor="category">카테고리</label>

              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">선택하세요</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="transaction-form-field">
            <label htmlFor="memo">메모</label>

            <textarea
              id="memo"
              rows="4"
              value={memo}
              placeholder="예: 점심, 버스비, 월급"
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          <div className="transaction-form-actions">
            <button
              type="button"
              className="transaction-form-btn transaction-form-btn-cancel"
              onClick={() => navigate("/transactions")}
            >
              취소
            </button>

            <button
              type="submit"
              className="transaction-form-btn transaction-form-btn-save"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
