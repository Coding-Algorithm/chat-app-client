import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../components/store/userSlice";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainter from "../components/ChatContainter";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateUser = (user) => {
    dispatch(userAction.actions.updateUser(user));
  };

  useEffect(() => {
    const calback = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else if (!currentUser) {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    calback();


    const socketFunc = () => {
      if(currentUser){
        socket.current = io(host)
        socket.current.emit("add-user", currentUser._id)
      }
    }
    socketFunc()

    const setAvatarImage = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
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



  const handleChatChange = (chat) => setCurrentChat(chat);

  return (
    <Container>
      <div className="container">
        <Contacts
          changeChat={handleChatChange}
          contacts={contacts}
          currentUser={currentUser}
        />

        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          currentChat && (
            <ChatContainter
              currentUser={currentUser}
              currentChat={currentChat}
              socket={socket}
            />
          )
        )}
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
