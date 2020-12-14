import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Button, Row } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import ReactionList from "../components/ReactionList";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import blogActions from "../redux/actions/blog.actions";

const BlogDetailPage = () => {
  const blog = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loading);
  const params = useParams();
  const history = useHistory();
  const blogID = params.id;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const submitLoading = useSelector((state) => state.blog.submitLoading);
  const [reviewText, setReviewText] = useState("");
  const currentUser = useSelector((state) => state.auth.user);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(params.id, reviewText));
    setReviewText("");
  };

  useEffect(() => {
    dispatch(blogActions.getSelctedBlog(blogID));
  }, [dispatch, blogID]);

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  const handleEmojiClick = (targetType, targetId, emoji) => {
    dispatch(blogActions.postEmoji(targetType, targetId, emoji));
  };

  return (
    <Container className="p-3 text-center">
      <Row className="mr-auto">
        <div className="text-left mr-auto">
          <Button onClick={handleGoBackClick} variant="primary">
            <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
          </Button>
        </div>
        {blog?._id && currentUser?._id === blog?.author?._id ? (
          <Link to={`/blog/edit/${blog._id}`}>
            <Button variant="primary" className="mr-auto">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </Row>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Col>
          {blog && (
            <>
              <h1 className="">{blog?.title}</h1>
              <a href={blog.email}>
                {blog?.author?.avatarUrl && (
                  <Image
                    src={blog?.author?.avatarUrl}
                    roundedCircle
                    height="30px"
                  />
                )}
                <small className="ml-2 mr-4">
                  <strong>{blog?.author?.name}</strong>
                </small>
              </a>
              <a href="#commentsSection">
                <FontAwesomeIcon icon="comments" size="lg" />
                <small className="ml-2 mr-4">{blog?.reviewCount}</small>
              </a>
              <FontAwesomeIcon icon="clock" size="lg" />
              <small className="ml-2 mr-1">Last Updated:</small>
              <small>
                <Moment>{blog?.updatedAt}</Moment>
              </small>
              <hr />
              <div>
                {blog?.images[0] ? (
                  <Image src={blog?.images[0]} className="mb-2" />
                ) : (
                  <></>
                )}
                <br />
                <p className="text-left">{blog?.content}</p>
                {blog?.images[0] !== blog?.images[1] && (
                  <Image src={blog.images[1]} className="mb-2" />
                )}
              </div>
              <hr />
              <ReactionList
                reactionsData={blog.reactions}
                targetType="Blog"
                targetId={blog._id}
                handleEmojiClick={handleEmojiClick}
                loading={submitLoading}
                size="sm"
              />
              <div className="text-left">
                <h5 id="commentsSection" className="text-left">
                  Comments:
                </h5>
                {isAuthenticated && (
                  <ReviewForm
                    reviewText={reviewText}
                    handleInputChange={handleInputChange}
                    handleSubmitReview={handleSubmitReview}
                    loading={submitLoading}
                  />
                )}
                {blog.reviews.length > 0 && (
                  <ReviewList
                    reviews={blog.reviews}
                    handleEmojiClick={handleEmojiClick}
                    loading={submitLoading}
                  />
                )}
              </div>
            </>
          )}
        </Col>
      )}
    </Container>
  );
};

export default BlogDetailPage;
