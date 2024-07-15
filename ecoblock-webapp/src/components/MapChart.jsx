import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { select } from 'd3-selection';
import { geoTransform, geoPath } from 'd3-geo';
import { hexbin } from 'd3-hexbin';
import 'leaflet/dist/leaflet.css';

const MapChart = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([48.8566, 2.3522], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    const svgLayer = L.svg().addTo(map);
    const svg = select(svgLayer._rootGroup).attr("pointer-events", "none");

    const hexbinGenerator = hexbin().radius(40);

    const drawHexGrid = () => {
      const bounds = map.getBounds();
      const topLeft = bounds.getNorthWest();
      const bottomRight = bounds.getSouthEast();

      const points = [];
      const cols = Math.ceil((bottomRight.lng - topLeft.lng) / (hexbinGenerator.radius() / 100));
      const rows = Math.ceil((topLeft.lat - bottomRight.lat) / (hexbinGenerator.radius() / 100));

      for (let i = -cols; i <= cols; i++) {
        for (let j = -rows; j <= rows; j++) {
          const x = topLeft.lng + i * (hexbinGenerator.radius() / 100);
          const y = topLeft.lat - j * (hexbinGenerator.radius() / 100);
          points.push([x, y]);
        }
      }

      svg.selectAll(".hexagon").remove();

      const hexData = hexbinGenerator(points);

      svg.append("g")
        .attr("class", "hexagon")
        .selectAll("path")
        .data(hexData)
        .enter().append("path")
        .attr("d", hexbinGenerator.hexagon())
        .attr("transform", d => {
          const coords = map.latLngToLayerPoint(new L.LatLng(d[0][1], d[0][0]));
          return `translate(${coords.x},${coords.y})`;
        })
        .style("fill", "rgba(128, 0, 128, 0.3)")
        .style("stroke", "#fff")
        .style("stroke-width", "1px");
    };

    map.on('zoomend', drawHexGrid);
    map.on('moveend', drawHexGrid);
    drawHexGrid();

    return () => {
      map.off('zoomend', drawHexGrid);
      map.off('moveend', drawHexGrid);
      map.remove();
    };
  }, []);

  return <div id="map" ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
};

export default MapChart;
