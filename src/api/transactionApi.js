const API_URL = import.meta.env.VITE_API_URL;

// 거래내역 상세 조회
export async function getTransaction(id) {
  const response = await fetch(`${API_URL}/api/transactions/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("거래내역 상세 조회에 실패했습니다.");
  }

  return response.json();
}

// 거래내역 추기
export async function createTransaction(type, amount, memo, date, categoryId) {
  const response = await fetch(`${API_URL}/api/transactions`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      amount: Number(amount),
      memo,
      date,
      categoryId: Number(categoryId),
    }),
  });

  if (!response.ok) {
    throw new Error("거래내역 추가에 실패했습니다.");
  }

  return response.json();
}

// 거래내역 수정
export async function updateTransaction(
  id,
  type,
  amount,
  memo,
  date,
  categoryId,
) {
  const response = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      amount: Number(amount),
      memo,
      date,
      categoryId: Number(categoryId),
    }),
  });

  if (!response.ok) {
    throw new Error("거래내역 수정에 실패했습니다.");
  }

  return response.json();
}

// 거래내역 삭제
export async function deleteTransaction(id) {
  const response = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("거래내역 삭제에 실패했습니다.");
  }
}

// 검색조건 만들기
function makeSearchParams(year, month, keyword, type, categoryId) {
  const params = new URLSearchParams();

  params.append("year", year);
  params.append("month", month);

  if (keyword) {
    params.append("keyword", keyword);
  }

  if (type) {
    params.append("type", type);
  }

  if (categoryId) {
    params.append("categoryId", categoryId);
  }

  return params.toString();
}

// 월별 거래내역
export async function getMonthTransactions(
  year,
  month,
  keyword,
  type,
  categoryId,
) {
  const params = makeSearchParams(year, month, keyword, type, categoryId);

  const response = await fetch(`${API_URL}/api/transactions/month?${params}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("월별 거래내역 조회에 실패했습니다.");
  }

  return response.json();
}

// 월별 총수입 / 총지출 / 잔액
export async function getMonthSummary(year, month, keyword, type, categoryId) {
  const params = makeSearchParams(year, month, keyword, type, categoryId);

  const response = await fetch(
    `${API_URL}/api/transactions/month/summary?${params}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("월별 요약 조회에 실패했습니다.");
  }

  return response.json();
}

// 카테고리별 지출
export async function getCategorySummary(
  year,
  month,
  keyword,
  type,
  categoryId,
) {
  const params = makeSearchParams(year, month, keyword, type, categoryId);

  const response = await fetch(
    `${API_URL}/api/transactions/month/category?${params}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("카테고리별 지출 조회에 실패했습니다.");
  }

  return response.json();
}
