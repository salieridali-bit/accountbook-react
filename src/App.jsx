import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import CategoryPage from "./pages/CategoryPage";
import CategoryCreatePage from "./pages/CategoryCreatePage";
import CategoryEditPage from "./pages/CategoryEditPage";

import TransactionPage from "./pages/TransactionPage";
import TransactionCreatePage from "./pages/TransactionCreatePage";
import TransactionUpdatePage from "./pages/TransactionUpdatePage";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* 홈은 바로 보여줌 */}
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      {/* 카테고리 */}
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories/new"
        element={
          <ProtectedRoute>
            <CategoryCreatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories/:id/edit"
        element={
          <ProtectedRoute>
            <CategoryEditPage />
          </ProtectedRoute>
        }
      />

      {/* 거래내역 */}
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions/new"
        element={
          <ProtectedRoute>
            <TransactionCreatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions/:id/edit"
        element={
          <ProtectedRoute>
            <TransactionUpdatePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
