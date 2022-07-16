import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const AnalysisSalesChart = () => {
  const day = ["2016", "2017", "2018", "2019", "2020", "2021"];

  const slaes = ["600", "400", "200", "0"];

  // 시간별 날씨 그래프 데이터
  const state = {
    series: [
      {
        name: "비용",
        data: [100, 200, 200, 300, 100, 200],
      },
      {
        name: "매출",
        data: [0, 100, 300, 600, 400, 300],
      },
      {
        name: "순이익",
        data: [-100, 100, 100, 300, 300, 100],
      },
    ],
    options: {
      markers: {
        size: [2, 2, 2.5],
        colors: ["#3152bf50", "#7EB3E350", "#7EE3AB"],
        hover: {
          size: undefined,
          sizeOffset: 2,
        },
      },
      legend: {
        show: false,
      },
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: [1.5, 1.5, 2.5],
        colors: ["#3152bf50", "#7EB3E350", "#7EE3AB"], // 그래프 선 여기에 추가
      },
      grid: {
        borderColor: "#ddd",
        strokeDashArray: 1.6, // 가로축 점선
        row: {
          colors: ["transparent", "transparent", "transparent"], // 배경색
        },
        column: {
          colors: ["transparent", "transparent", "transparent"],
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true, // 그리드선
          },
        },
        padding: {
          top: -2,
          right: 20,
          bottom: -10,
          left: 20,
        },
      },
      tooltip: {
        x: {
          show: false,
        },
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="tooltip-box">' +
            '<div class="line">' +
            '<span class="price-label">' +
            "2021년 9월" +
            "</span>" +
            "</div>" +
            '<div class="line-bottom">' +
            '<span class="label-data">' +
            series[seriesIndex][dataPointIndex] +
            '<span class="price-label">' +
            "만원" +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        },
      },
      xaxis: {
        categories: day,
        labels: {
          formatter: function (value) {
            return value;
          },
          style: {
            fontSize: "0px",
          },
        },
        position: "top", // x축 라벨
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
        min: undefined,
        max: undefined,
      },
    },
  };

  return (
    <>
      <ChartWrap>
        <YasisWrap>
          {slaes.map((data, id) => {
            return <Yasis key={id}>{data}</Yasis>;
          })}
        </YasisWrap>

        <ChartBox>
          <ApexCharts
            options={state.options}
            series={state.series}
            type="line"
            height={100 + "%"}
          />
          <YasisLabelBox>
            <YasisLabelWrap>
              <YasisColorTipA />
              <YasisLabel>비용</YasisLabel>
            </YasisLabelWrap>
            <YasisLabelWrap>
              <YasisColorTipB />
              <YasisLabel>매출</YasisLabel>
            </YasisLabelWrap>
            <YasisLabelWrap>
              <YasisColorTipC />
              <YasisLabel>순이익</YasisLabel>
            </YasisLabelWrap>
          </YasisLabelBox>
        </ChartBox>
        <XasisWrap>
          {day.map((data, id) => {
            return <Xasis key={id}>{data}</Xasis>;
          })}
        </XasisWrap>
      </ChartWrap>
    </>
  );
};

const ChartWrap = styled.div`
  width: 100%;
  height: 230px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  row-gap: 4px;
  column-gap: 8px;
  cursor: pointer;
`;

const YasisWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

const Yasis = styled.span`
  font-size: 11px;
  color: #666666;
`;

const ChartBox = styled.div`
  width: 100%;
  height: 95%;
  margin-top: 6px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  position: relative;
`;

const YasisLabelBox = styled.div`
  max-width: 150px;
  width: 24%;
  height: auto;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding: 4px;
  position: absolute;
  right: 0;
  top: 0;
  margin: 6px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media only screen and (max-width: 760px) {
    width: 100px;
    margin: 6px 10px;
  }
`;

const YasisLabelWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const YasisColorTipA = styled.div`
  width: 7px;
  height: 3px;
  background: #3152bf;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisColorTipB = styled.div`
  width: 7px;
  height: 3px;
  background: #7eb3e3;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisColorTipC = styled.div`
  width: 7px;
  height: 3px;
  background: #7ee3ab;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisLabel = styled.span`
  font-size: 11px;
  color: #666666;
`;

const XasisWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0px 10px;
  /* margin-top: 4px; */
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  /* margin-top: 10px; */
`;

const Xasis = styled.span`
  font-size: 11px;
  color: #666666;
`;
export default AnalysisSalesChart;
