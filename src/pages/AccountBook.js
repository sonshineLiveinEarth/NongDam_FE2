import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentAccountListDB } from "../redux/modules/account";

// 이미지
import Profile from "../images/Profile.png";

// 컴포넌트
import Header from "../components/Header";
import AccountWeek from "../components/accountbook/AccountWeek";
import CalendarBook from "../components/accountbook/AccountCalendar";
import AccountWrite from "../components/accountbook/AccountWrite";

const AccountBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentAccountListDB());
  }, [dispatch]);

  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);

  function toggleModal(id) {
    setOpen(!isOpen);
  }

  return (
    <Wrap>
      <Header currentPage="accountbook" />
      <CalendarWrap>
        <CalendarBook />
        <AddAccountBtn
          onClick={() => {
            toggleModal();
          }}
        >
          + 기록하기
        </AddAccountBtn>
      </CalendarWrap>
      <CuurentListWrap>
        <AccountWeek />
      </CuurentListWrap>

      {isOpen && <AccountWrite isOpen={isOpen} toggleModal={toggleModal} />}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  /* max-width: 1920px; */
  height: 100vh;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr minmax(600px, 780px) 25% 1fr;
  grid-template-rows: 80px minmax(640px, 740px) 1fr;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 26px;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr minmax(600px, 720px) 24% 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 70px minmax(320px, 400px) 1fr;
  }
`;

const CalendarWrap = styled.div`
  padding: 30px 30px 36px 30px;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: relative;
  @media only screen and (max-width: 760px) {
    padding: 20px 10px 16px 10px;

    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

const CuurentListWrap = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  border-left: 1px solid #dddddd;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
`;

const BodyWrap = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 70px; */
`;

const AddAccountBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  width: auto;
  height: 26px;
  background: #318f27;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  position: absolute;
  top: 36px;
  right: 30px;
  cursor: pointer;
  &:hover {
    background-color: #22631c;
  }
`;

export default AccountBook;
