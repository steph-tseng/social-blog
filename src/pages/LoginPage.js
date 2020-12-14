import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import authActions from "../redux/actions/auth.actions";
import routeActions from "../redux/actions/route.actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(formData));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <Container className="pt-5 d-flex justify-content-center text-center">
      <Row className="">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
