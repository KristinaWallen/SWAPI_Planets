import { useD3 } from '../../utils/useD3';
import * as d3 from 'd3';
import {useEffect, useState} from 'react';
import './bar-chart.styles.css'

function BarChart({ planets }) {

  const [data, setData] = useState([])
  const [display, setDisplay] = useState('population')

  useEffect(() => {
    setData(planets);
    // console.log('hello', data);
  },[planets, display])
  
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 1000;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => +d[display])])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickFormat(data.name)
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", '#75934e')
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(+d[display]))
        .attr("height", (d) => y1(0) - y1(+d[display]));
    },
    [data]
  );

  return (
    <div className='bar'>
    <svg
      ref={ref}
      style={{
        height: 500,
        width: 1000,
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
    <div className='button-container'>
    <button className='bar-button' onClick={() => setDisplay('population')}>Population</button>
    <button className='bar-button' onClick={() => setDisplay('rotation_period')}>Rotation Period</button>
    <button className='bar-button' onClick={() => setDisplay('orbital_period')}>Orbital Period</button>
    <button className='bar-button' onClick={() => setDisplay('diameter')}>Diameter</button>
    <button className='bar-button' onClick={() => setDisplay('surface_water')}>Surface Water</button>
    </div>
    </div>
  );
}

export default BarChart;