import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import {
  Container,
  Jumbotron,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Row,
} from "react-bootstrap";
import BIV from "../images/biv.png";
// import ClipLoader from "react-spinners";
import PaginationBar from "../components/PaginationBar";
import { Link, useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import BlogCard from "../components/BlogCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
  const blogs = useSelector((state) => state.blog.blogs);
  const loading = useSelector((state) => state.blog.loading);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const [pageNum, setPageNum] = useState(1);
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const sortBy = "title";
  const [searchBy, setSearchBy] = useState("title");

  const ascending = 1;
  const [searching, setSearching] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(
      blogActions.blogsRequest(pageNum, query, sortBy, ascending, searchBy)
    );
  }, [dispatch, pageNum, query, sortBy, ascending, searchBy]);

  const clickBlog = (blogId) => {
    history.push(`/blogs/${blogId}`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  return (
    <Container>
      <Jumbotron
        className="text-center"
        style={{
          backgroundImage: BIV,
          backgroundSize: "cover",
        }}
      >
        <h1>Vat Times</h1>
        <p>We're all just brains in vats.</p>
        {isAuthenticated && (
          <Link to="/blog/add">
            <Button variant="primary">Write now</Button>
          </Link>
        )}
      </Jumbotron>
      {loading ? (
        <div className="text-center">
          Loading...
          {/* <ClipLoader color="red" size={150} loading={true} /> */}
        </div>
      ) : (
        <>
          {searching ? (
            <>
              <Row>
                <SearchForm
                  loading={loading}
                  searchInput={searchInput}
                  handleSearchChange={handleSearchChange}
                  handleSubmit={handleSubmit}
                />
                <ButtonGroup>
                  <DropdownButton
                    as={ButtonGroup}
                    title="Search By"
                    id="bg-nested-dropdown"
                  >
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => setSearchBy("title")}
                    >
                      Title
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => setSearchBy("content")}
                    >
                      Content
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                      eventKey="2"
                      onClick={() => setSearchBy("author")}
                    >
                      Author
                    </Dropdown.Item> */}
                  </DropdownButton>
                </ButtonGroup>
              </Row>
            </>
          ) : (
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => setSearching(true)}
                style={{ right: "0px" }}
              >
                <FontAwesomeIcon icon="search" size="md" />
              </Button>
            </div>
          )}
          <br />
          {blogs?.length > 1 && (
            <PaginationBar
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPageNum={totalPageNum}
              loading={loading}
            />
          )}
          {blogs?.length > 0 ? (
            <ul className="list-unstyled d-flex m-2 p-2 flex-wrap">
              {blogs.map((blog) => {
                return (
                  <li
                    key={blog._id}
                    className="justify-space-between"
                    onClick={() => clickBlog(blog._id)}
                  >
                    <BlogCard blog={blog} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>There are no blogs</p>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
