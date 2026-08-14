const API_URL = import.meta.env.VITE_API_URL;

export async function login(username, password) {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",

    // Spring의 JSESSIONID 쿠키를 주고받기 위해 필요
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "로그인에 실패했습니다.");
  }

  return data;
}

export async function getMe() {
  const response = await fetch(`${API_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("로그인되어 있지 않습니다.");
  }

  return response.json();
}

export async function logout() {
  const response = await fetch(`${API_URL}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("로그아웃에 실패했습니다.");
  }

  return response.json();
}

export async function signup(username, password1, password2, email) {
  const response = await fetch(`${API_URL}/api/users/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password1,
      password2,
      email,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
