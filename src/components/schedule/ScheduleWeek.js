import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const ScheduleWeek = () => {
  return (
    <div>
      <div>일정 최근내역입니다.</div>
    </div>
  );
};

const Nav = styled.div`s
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

export default ScheduleWeek;
