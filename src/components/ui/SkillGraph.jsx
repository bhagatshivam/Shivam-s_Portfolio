import { useEffect, useRef, useState } from "react";
import * as d3 from "d3-force";
import { select } from "d3-selection";
import "d3-transition";
import { drag } from "d3-drag";
import { skills, clusterColors } from "../../data/skills";

const WIDTH = 900;
const HEIGHT = 500;

const clusterX = {
  ai: WIDTH * 0.2,
  web: WIDTH * 0.5,
  tools: WIDTH * 0.8,
};

export default function SkillGraph() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [inView, setInView] = useState(false);

  // Detect when section enters viewport before starting simulation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !svgRef.current) return;

    const nodes = skills.map((s) => ({ ...s }));

    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-12))
      .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2).strength(0.03))
      .force(
        "collide",
        d3.forceCollide((d) => d.size / 2 + 4)
      )
      .force(
        "clusterX",
        d3.forceX((d) => clusterX[d.cluster]).strength(0.06)
      )
      .force("clusterY", d3.forceY(HEIGHT / 2).strength(0.04))
      .on("tick", ticked);

    const node = svg
      .selectAll("g.node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .style("cursor", "grab")
      .call(
        drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("mouseenter", (event, d) => setHoveredId(d.id))
      .on("mouseleave", () => setHoveredId(null));

    node
      .append("circle")
      .attr("r", (d) => d.size / 2)
      .attr("fill", (d) => `${clusterColors[d.cluster]}25`)
      .attr("stroke", (d) => clusterColors[d.cluster])
      .attr("stroke-width", 1.5)
      .style("filter", (d) => `drop-shadow(0 0 6px ${clusterColors[d.cluster]}80)`);

    node
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#F0F6FF")
      .attr("font-family", "Space Mono, monospace")
      .attr("font-size", (d) => Math.max(9, d.size / 5))
      .style("pointer-events", "none")
      .style("user-select", "none");

    function ticked() {
      node.attr("transform", (d) => {
        d.x = Math.max(d.size / 2, Math.min(WIDTH - d.size / 2, d.x));
        d.y = Math.max(d.size / 2, Math.min(HEIGHT - d.size / 2, d.y));
        return `translate(${d.x},${d.y})`;
      });
    }

    return () => simulation.stop();
  }, [inView]);

  // Hover scale effect
  useEffect(() => {
    if (!svgRef.current) return;
    select(svgRef.current)
      .selectAll("g.node")
      .transition()
      .duration(200)
      .attr("transform", function (d) {
        const scale = d.id === hoveredId ? 1.15 : 1;
        return `translate(${d.x},${d.y}) scale(${scale})`;
      });
  }, [hoveredId]);

  return (
    <div ref={containerRef} className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        style={{ minHeight: "400px", maxHeight: "500px" }}
      />
    </div>
  );
}
