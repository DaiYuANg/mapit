import {Outlet, Route, Routes} from "react-router";
import {Authenticated} from "@refinedev/core";
import {CatchAllNavigate, NavigateToResource} from "@refinedev/react-router";
import {ErrorComponent, ThemedLayoutV2} from "@refinedev/mui";
import {Header} from "./components";
import {BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow} from "./pages/dictionary";
import {ProjectCreate, CategoryEdit, ProjectList, ProjectShow} from "./pages/project";
import {Login} from "./pages/login";
import {Register} from "./pages/register";
import {ForgotPassword} from "./pages/forgotPassword";

const RouteComponent
 =()=>{
  return <>
    <Routes>
      <Route
        element={
          <Authenticated
            key="authenticated-inner"
            fallback={<CatchAllNavigate to="/login"/>}
          >
            <ThemedLayoutV2 Header={Header}>
              <Outlet/>
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route
          index
          element={<NavigateToResource resource="blog_posts"/>}
        />
        <Route path="/dictionary">
          <Route index element={<BlogPostList/>}/>
          <Route path="create" element={<BlogPostCreate/>}/>
          <Route path="edit/:id" element={<BlogPostEdit/>}/>
          <Route path="show/:id" element={<BlogPostShow/>}/>
        </Route>
        <Route path="/project">
          <Route index element={<ProjectList/>}/>
          <Route path="create" element={<ProjectCreate/>}/>
          <Route path="edit/:id" element={<CategoryEdit/>}/>
          <Route path="show/:id" element={<ProjectShow/>}/>
        </Route>
        <Route path="*" element={<ErrorComponent/>}/>
      </Route>
      <Route
        element={
          <Authenticated
            key="authenticated-outer"
            fallback={<Outlet/>}
          >
            <NavigateToResource/>
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route
          path="/forgot-password"
          element={<ForgotPassword/>}
        />
      </Route>
    </Routes>
  </>
}

export {RouteComponent};