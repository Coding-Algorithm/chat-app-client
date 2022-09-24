import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

function SetAvatar() {
	const api = "https://api.multiavatar.com/45678945";
	const navigate = useNavigate();

	return <>
  <Container>

  </Container>

  <ToastContainer />
  </>;
}


const Container = styled.div`
`

export default SetAvatar;
