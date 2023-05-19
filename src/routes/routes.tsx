import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Page404 } from "../pages/Page404";
import SignUp from "../pages/SignUp";
import BookPreview from "../pages/BookPreview";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/book/:id" element={<BookPreview />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
