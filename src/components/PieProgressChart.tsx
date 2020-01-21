import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import './PieProgressChart.css'
import { select } from "d3";
const PieProgressChart = (props:any) => {

  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value((d:any) => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

  useEffect(
    () => {
      const data = createPie(props.data);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      path
        .attr("class", "arc")
        .attr("d", (a:any,b:any)=>createArc(a,b))
        .attr("fill", (d:any, i:any) => colors(i));

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", (d:any) => `translate(${createArc.centroid(d)})`)
        .style("fill", "white")
        .style("font-size", 10)
        .text((d:any) => format(d.value));

    },
    [props.data]
  );

  useLayoutEffect(
    ()=>{
      
    }
  );
  

  return (
    <svg  className="piechart" >
      <g
        ref={ref}
        transform={`translate(70 80)`}
      />
    </svg>
  );
};

export default PieProgressChart;
