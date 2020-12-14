import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../redux/actions/user.actions";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.selectedUser);
  const loading = useSelector((state) => state.user.loading);
  const authToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    dispatch(userActions.getCurrentUserInfo(authToken));
  }, [dispatch, authToken]);

  return (
    <Container className="text-center">
      {/* <h1>Welcome {user.name}</h1>
      <hr />
      <h3>ID: {user._id}</h3>
      <h3>You have: {user.friendCount} friends</h3> */}
    </Container>
  );
};

export default ProfilePage;
