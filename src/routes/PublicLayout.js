import React from "react";
import { Container } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import PublicNavbar from "../pages/PublicNavbar";
import AddEditBlogPage from "../pages/AddEditBlogPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
