import React, {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../components/store/userSlice";


function Chat() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  // console.log(user)

  const updateUser = (user) => {
    dispatch(userAction.actions.updateUser(user));
  };

  useEffect(() => {
    const userStored = localStorage.getItem("chat-app-user");

    // console.log(userStored)

    if (userStored) {
      updateUser(userStored);
    }
  }, []);

  return (
    <div>Chat</div>
  )
}

export default Chat