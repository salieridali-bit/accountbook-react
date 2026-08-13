import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMonthTransactions,
  getMonthSummary,
  getCategorySummary,
  deleteTransaction,
} from "../api/transactionApi";

import { getCategories } from "../api/categoryApi";

import "../styles/transactionPage.css";

export default function TransactionPage() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  // 검색용 state
  const [searchYear, setSearchYear] = useState(2026);
  const [searchMonth, setSearchMonth] = useState(8);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCategoryId, setSearchCategoryId] = useState("");

  // 통계 state
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [balance, setBalance] = useState(0);

  const [categoryExpenseTotal, setCategoryExpenseTotal] = useState({});

  // 에러
  const [errorMessage, setErrorMessage] = useState("");

  async function loadData(
    year = searchYear,
    month = searchMonth,
    keyword = searchKeyword,
    type = searchType,
    categoryId = searchCategoryId,
  ) {
    try {
      setErrorMessage("");

      const transactionData = await getMonthTransactions(
        year,
        month,
        keyword,
        type,
        categoryId,
      );

      const summaryData = await getMonthSummary(
        year,
        month,
        keyword,
        type,
        categoryId,
      );

      const categorySummaryData = await getCategorySummary(
        year,
        month,
        keyword,
        type,
        categoryId,
      );

      setTransactions(transactionData);

      setIncomeTotal(summaryData.incomeTotal);
      setExpenseTotal(summaryData.expenseTotal);
      setBalance(summaryData.balance);

      setCategoryExpenseTotal(categorySummaryData);
    } catch (error) {
      console.error(error);

      setErrorMessage("거래내역을 불러오지 못했습니다.");
    }
  }

  useEffect(() => {
    async function initialLoad() {
      try {
        setErrorMessage("");

        const categoryData = await getCategories();

        setCategories(categoryData);

        await loadData(2026, 8, "", "", "");
      } catch (error) {
        console.error(error);

        setErrorMessage("카테고리를 불러오지 못했습니다.");
      }
    }

    initialLoad();
  }, []);

  async function handleDelete(id) {
    const ok = window.confirm("정말 삭제하시겠습니까?");

    if (!ok) {
      return;
    }

    try {
      setErrorMessage("");

      await deleteTransaction(id);

      await loadData();
    } catch (error) {
      console.error(error);

      setErrorMessage("거래내역 삭제에 실패했습니다.");
    }
  }

  async function handleReset() {
    setSearchYear(2026);
    setSearchMonth(8);
    setSearchKeyword("");
    setSearchType("");
    setSearchCategoryId("");

    await loadData(2026, 8, "", "", "");
  }

  return (
    <div className="transaction-page">
      <div className="transaction-container">
        {/* 상단 */}
        <div className="transaction-top">
          <div>
            <h2>거래내역</h2>

            <div className="transaction-sub">
              월별 수입과 지출을 확인하세요.
            </div>
          </div>

          <div className="transaction-actions">
            <button
              type="button"
              className="transaction-btn transaction-btn-light"
              onClick={() => navigate("/categories")}
            >
              카테고리
            </button>

            <button
              type="button"
              className="transaction-btn transaction-btn-primary"
              onClick={() => navigate("/transactions/new")}
            >
              + 거래내역 추가
            </button>
          </div>
        </div>

        {/* 에러 */}
        {errorMessage && (
          <div className="transaction-error">{errorMessage}</div>
        )}

        {/* 검색 */}
        <div className="transaction-filter-box">
          <div className="transaction-filter-form">
            <select
              value={searchYear}
              onChange={(e) => setSearchYear(Number(e.target.value))}
            >
              <option value={2026}>2026년</option>
              <option value={2025}>2025년</option>
              <option value={2024}>2024년</option>
            </select>

            <select
              value={searchMonth}
              onChange={(e) => setSearchMonth(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}월
                </option>
              ))}
            </select>

            <input
              type="text"
              value={searchKeyword}
              placeholder="메모 검색"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="">전체 구분</option>
              <option value="INCOME">수입</option>
              <option value="EXPENSE">지출</option>
            </select>

            <select
              value={searchCategoryId}
              onChange={(e) => setSearchCategoryId(e.target.value)}
            >
              <option value="">전체 카테고리</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="transaction-btn transaction-btn-primary"
              onClick={() => loadData()}
            >
              검색
            </button>

            <button
              type="button"
              className="transaction-btn transaction-btn-light"
              onClick={handleReset}
            >
              초기화
            </button>
          </div>
        </div>

        {/* 총 수입 / 총 지출 / 잔액 */}
        <div className="transaction-summary">
          <div className="transaction-summary-card">
            <div className="transaction-summary-title">총 수입</div>

            <div className="transaction-summary-money transaction-income">
              {incomeTotal.toLocaleString()}원
            </div>
          </div>

          <div className="transaction-summary-card">
            <div className="transaction-summary-title">총 지출</div>

            <div className="transaction-summary-money transaction-expense">
              {expenseTotal.toLocaleString()}원
            </div>
          </div>

          <div className="transaction-summary-card">
            <div className="transaction-summary-title">잔액</div>

            <div className="transaction-summary-money transaction-balance">
              {balance.toLocaleString()}원
            </div>
          </div>
        </div>

        {/* 카테고리별 지출 */}
        <div className="transaction-stat-card">
          <h3 className="transaction-stat-title">카테고리별 지출</h3>

          {Object.keys(categoryExpenseTotal).length === 0 ? (
            <div className="transaction-empty">지출 통계가 없습니다.</div>
          ) : (
            Object.entries(categoryExpenseTotal).map(([name, amount]) => (
              <div className="transaction-stat-row" key={name}>
                <span className="transaction-stat-name">{name}</span>

                <span className="transaction-stat-money">
                  {amount.toLocaleString()}원
                </span>
              </div>
            ))
          )}
        </div>

        {/* 거래내역 표 */}
        <div className="transaction-table-card">
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>구분</th>
                <th>카테고리</th>
                <th>메모</th>
                <th>금액</th>
                <th>관리</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="transaction-empty">
                    해당 월의 거래내역이 없습니다.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>

                    <td>
                      <span
                        className={
                          transaction.type === "INCOME"
                            ? "transaction-badge transaction-badge-income"
                            : "transaction-badge transaction-badge-expense"
                        }
                      >
                        {transaction.type === "INCOME" ? "수입" : "지출"}
                      </span>
                    </td>

                    <td>
                      <span className="transaction-category">
                        {transaction.categoryName}
                      </span>
                    </td>

                    <td>{transaction.memo}</td>

                    <td>{transaction.amount.toLocaleString()}원</td>

                    <td>
                      <div className="transaction-actions">
                        <button
                          type="button"
                          className="transaction-edit"
                          onClick={() =>
                            navigate(`/transactions/${transaction.id}/edit`)
                          }
                        >
                          수정
                        </button>

                        <button
                          type="button"
                          className="transaction-delete"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
