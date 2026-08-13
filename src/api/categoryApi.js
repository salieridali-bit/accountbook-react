const API_URL = import.meta.env.VITE_API_URL;

export async function getCategories() {
  const response = await fetch(`${API_URL}/api/categories`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("카테고리 조회에 실패했습니다.");
  }

  return response.json();
}

export async function getCategory(id) {
  const response = await fetch(`${API_URL}/api/categories/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("카테고리 상세 조회에 실패했습니다.");
  }

  return response.json();
}

export async function createCategory(name) {
  const response = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("카테고리 추가에 실패했습니다.");
  }

  return response.json();
}

export async function updateCategory(id, name) {
  const response = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("카테고리 수정에 실패했습니다.");
  }

  return response.json();
}

export async function deleteCategory(id) {
  const response = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("카테고리 삭제에 실패했습니다.");
  }
}
