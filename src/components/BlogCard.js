import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

const BlogCard = ({ blog }) => {
  return (
    <Card style={{ width: "18rem", height: "30rem" }} className="mr-5 mb-5">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Img
          variant="top"
          src={
            blog?.images?.length
              ? blog.images[0]
              : "https://via.placeholder.com/160x100"
          }
        />
        {blog.author && <small className="">By {blog.author.name}</small>}
        <span className="ml-4" style={{ fontSize: "0.8rem", opacity: "0.5" }}>
          <Moment fromNow>{blog.updatedAt}</Moment>
        </span>
        <Card.Text className="mt-2">
          {blog.content.length <= 99
            ? blog.content
            : blog.content.slice(0, 99) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Reviews: {blog.reviewCount}</small>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
