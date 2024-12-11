import { Outlet, Route, Routes } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router-v6";
import { ErrorComponent, ThemedLayoutV2 } from "@refinedev/mui";
import { Header } from "../components";
import { ProjectCreate, BlogPostEdit, ProjectList, BlogPostShow } from "../pages/project";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "../pages/categories";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ForgotPassword } from "../pages/forgotPassword";

const RoutesDefine = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/login" />}>
            <ThemedLayoutV2 Header={Header}>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="blog_posts" />} />
        <Route path="/blog-posts">
          <Route index element={<ProjectList />} />
          <Route path="create" element={<ProjectCreate />} />
          <Route path="edit/:id" element={<BlogPostEdit />} />
          <Route path="show/:id" element={<BlogPostShow />} />
        </Route>

        <Route path="/categories">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
          <Route path="show/:id" element={<CategoryShow />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
};

export { RoutesDefine };
