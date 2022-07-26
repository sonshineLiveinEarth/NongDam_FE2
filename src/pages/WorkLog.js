import { React, useState, useEffect } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import Header from "../components/Header";
import LoadWorkLog from "../components/workLog/LoadWorkLog";
import DetailWorkLog from "./DetailWorkLog";
import styled from "styled-components";
import { loadWorkLogListDB, loadWorkLogDB } from "../redux/modules/workLog";

import { useSelector, useDispatch } from "react-redux";
import FooterNav from "../components/FooterNav";

const WorkLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  useEffect(() => {
    dispatch(loadWorkLogListDB());
  }, []);

  const workLogList = useSelector((state) => state?.workLog?.workLogList);

  console.log(workLogList);

  return (
    <Container>
      <Header currentPage="workLog" />
      <LoadWorkLog workLogList={workLogList} />
      <FooterNav currentPage="workLog" />
    </Container>
  );
};
const Container = styled.div`
  margin-top: 100px;
  background-color: #f5f5f5;
`;

const BannerImage = styled.div`
  width: 0px;
  height: 150px;
  background-size: cover;
  border-radius: 8px;
  background-image: url(${(props) => props.profileImage});
  background-position: center 30%;
  background-size: cover;
`;

export default WorkLog;
