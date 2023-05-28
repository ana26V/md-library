import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Page404 } from "../pages/Page404";
import SignUp from "../pages/SignUp";
import BookPreview from "../pages/BookPreview";
import { ManageBooks } from "../pages/ManageBooks";
import { AddBook } from "../pages/AddBook";
import { useInterceptors } from "../hooks/useInterceptors";
import { UsersBooks } from "../pages/UsersBooks";

export function AppRouter() {
  useInterceptors();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/book/:id" element={<BookPreview />} />
      <Route path="/users-books/:_id" element={<UsersBooks />} />
      <Route path="/manage" element={<ManageBooks />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
