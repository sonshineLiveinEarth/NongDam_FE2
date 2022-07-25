import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ReactApexChart from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";

const Expense = ({ expenseData }) => {
  const expenseNumList =
    expenseData.data &&
    expenseData.data.map((data) => {
      return Number(data);
    });

  const labelList =
    expenseData.labels &&
    expenseData.labels.map((data) => {
      return data.replaceAll("_", " ");
    });

  // 숫자에 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  const colorList = [
    "#44D600",
    "#33C2FF",
    "#2B9CEF",
    "#3362FF",
    "#4B3FDB",
    "#481CAA",
    "#2C1186",
    "#180B41",
    "#04010F",
  ];

  const donutData = {
    series: expenseNumList !== undefined ? expenseNumList : [1, 1, 1],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        show: false,
        position: "right",
        // fontSize: "8px",
      },
      fill: {
        colors: [
          "#44D600",
          "#33C2FF",
          "#2B9CEF",
          "#3362FF",
          "#4B3FDB",
          "#481CAA",
          "#2C1186",
          "#180B41",
          "#04010F",
        ],
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "right",
        distributed: true,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "16px",
          fontFamily: "Noto Sans KR",
          fontWeight: "500",
          colors: [
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
          ],
        },
        dropShadow: {
          enabled: true,
          color: "#5D5D5D",
        },
      },
      tooltip: {
        style: {
          fontSize: "14px",
          fontFamily: "Noto Sans KR",
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="donut-tooltip-box">' +
            '<span class="donut-label-data">' +
            labelList[seriesIndex] +
            "</span>" +
            '<span class="donut-price-data">' +
            comma(series[seriesIndex]) +
            "원" +
            "</span>" +
            "</div>"
          );
        },
      },

      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              name: {
                // 데이터 라벨 커스텀
                show: true,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 700,
                color: "black",
                offsetY: 6,
              },

              total: {
                showAlways: false,
                show: true,
                label: "지출",
                fontSize: "18px",
                fontWeight: "700",
                color: "black",
              },
              value: {
                fontSize: "12px",
                show: false,
                color: "black",
              },
            },
          },
        },
      },

      labels:
        labelList !== undefined
          ? labelList
          : ["농산물 판매", "정부 보조금", "기타 수입"],
    },
  };

  return (
    <Wrap>
      <ReactApexChart
        options={donutData.options}
        series={donutData.series}
        type="donut"
        width="260"
      />
      <Legend>
        {labelList !== undefined &&
          labelList.map((data, idx) => {
            return (
              <LabelWrap key={idx}>
                <LabelTip index={idx} colorList={colorList} />
                <Label key={idx}>{data}</Label>
              </LabelWrap>
            );
          })}
      </Legend>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 10.5px;
    margin: 2px;
  }
`;

const LabelWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LabelTip = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${({ index, colorList }) => colorList[index]};
  margin-right: 4px;
`;

const Label = styled.span`
  font-size: 12px;
`;

export default Expense;
