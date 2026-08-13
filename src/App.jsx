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
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

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
