import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getScheduleListDB, getYearMonthDB } from "../../redux/modules/schedule";

export default function Toolbar(props) {
  const dispatch = useDispatch();
  const [nowMonth, setNowMonth] = useState(null);
  const [click, setClick] = useState(false);
  // const [nowYear, setNowYear] = useState(null);

  const { date } = props;
  console.log(props);

  const navigate = (action) => {
    props.onNavigate(action);
    if(!click)setClick(true)
    else setClick(false)
  };

  console.log(click)

  const month = moment(date).format("MM");
  const year = moment(date).format("YYYY");
  const YYMM = { month: month, year: year };
  console.log(YYMM);

  const scheduleList = useSelector((state) => state.schedule.scheduleList);
  console.log(scheduleList);
  
  useEffect(() => {
    dispatch(getScheduleListDB(YYMM));
    dispatch(getYearMonthDB(YYMM));
  }, [click]);
  useEffect(() => {
    dispatch(getScheduleListDB(YYMM));
    
  }, [dispatch]);



  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        {/* <button type="button" onClick={navigate.bind(null, "TODAY")}>
          이번달
        </button> */}
        <button type="button" onClick={navigate.bind(null, "PREV")}>
          이전
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</span>
        <button type="button" onClick={navigate.bind(null, "NEXT")}>
          다음
        </button>
      </span>
    </div>
  );
}
