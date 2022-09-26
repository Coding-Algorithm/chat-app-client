import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../components/store/userSlice";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

function Chat() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [contacts, setContacts] = useState([]);

  const [currentUser, setCurrentUser] = useState(undefined);

  const updateUser = (user) => {
    dispatch(userAction.actions.updateUser(user));
  };

  // useEffect(async () => {

  // }, [])

  useEffect(() => {
    console.log(currentUser)
    const calback = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else if (!currentUser) {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    calback();
    
    const setAvatarImage = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          console.log("data")
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    setAvatarImage();

    const userStored = localStorage.getItem("chat-app-user");

    if (userStored) {
      updateUser(userStored);
    }
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 780px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
