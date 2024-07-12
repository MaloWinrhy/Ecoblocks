import React from 'react';

const Datatable = ({ blocks }) => {
  return (
    <div className="data-table">
      <h2>Block Data</h2>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Air Quality Index</th>
            <th>PM2.5</th>
            <th>PM10</th>
            <th>NO2</th>
            <th>CO</th>
            <th>O3</th>
            <th>SO2</th>
            <th>Noise Level</th>
            <th>UV Index</th>
            <th>Radiation Gamma</th>
            <th>Water pH</th>
            <th>Water Turbidity</th>
            <th>Dissolved Oxygen</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <tr key={index}>
              <td>{block.index}</td>
              <td>{block.data.environment.temperature}</td>
              <td>{block.data.environment.humidity}</td>
              <td>{block.data.environment.air_quality_index}</td>
              <td>{block.data.environment.pm25}</td>
              <td>{block.data.environment.pm10}</td>
              <td>{block.data.environment.no2}</td>
              <td>{block.data.environment.co}</td>
              <td>{block.data.environment.o3}</td>
              <td>{block.data.environment.so2}</td>
              <td>{block.data.environment.noise_level}</td>
              <td>{block.data.environment.uv_index}</td>
              <td>{block.data.environment.radiation_gamma}</td>
              <td>{block.data.environment.water_ph}</td>
              <td>{block.data.environment.water_turbidity}</td>
              <td>{block.data.environment.dissolved_oxygen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Datatable;
