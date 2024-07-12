export const blockchainData = {
    "f4905af4e04114aac8bcae12ea6ac1e68112bbecc54ca1fc6fa681195354c1c7": {
      "index": 0,
      "timestamp": 1720706280.631237,
      "previous_hashes": [],
      "hash": "f4905af4e04114aac8bcae12ea6ac1e68112bbecc54ca1fc6fa681195354c1c7",
      "data": {
        "environment": {
          "temperature": 0.0,
          "humidity": 0,
          "air_quality_index": 0,
          "pm25": 0.0,
          "pm10": 0.0,
          "no2": 0.0,
          "co": 0.0,
          "o3": 0.0,
          "so2": 0.0,
          "noise_level": 0.0,
          "uv_index": 0,
          "radiation_gamma": 0.0,
          "water_ph": 0.0,
          "water_turbidity": 0.0,
          "dissolved_oxygen": 0.0
        },
        "location": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "timestamp": 1720706280.631237
      },
      "proposer_id": "system"
    },
    "916390ab738e1239a15cd1e22c018b862fd9d8a91b3ddeba9cacd149e832b87a": {
      "index": 25,
      "timestamp": 1720691647.7970035,
      "previous_hashes": [
        "08b02e368659bc406c5d3c5d25578de9dbf383dbb18612bc232099dfceda7387",
        "015cbba13c768d25ef82d6f82e5544471e5c956fb05e107e54d7399195961812"
      ],
      "hash": "916390ab738e1239a15cd1e22c018b862fd9d8a91b3ddeba9cacd149e832b87a",
      "data": {
        "environment": {
          "temperature": 25.1,
          "humidity": 55,
          "air_quality_index": 10,
          "pm25": 12.4,
          "pm10": 18.7,
          "no2": 0.02,
          "co": 0.1,
          "o3": 0.03,
          "so2": 0.01,
          "noise_level": 45.5,
          "uv_index": 5,
          "radiation_gamma": 0.15,
          "water_ph": 7.2,
          "water_turbidity": 1.5,
          "dissolved_oxygen": 8.6
        },
        "location": {
          "latitude": 48.8566,
          "longitude": 2.3522
        },
        "timestamp": 1622547800.0
      },
      "proposer_id": "lamenace"
    }
  };

  export const processData = (data) => {
    const blocks = Object.values(data);
    const totalBlocks = blocks.length;

    const environmentData = blocks.map(block => block.data.environment);
    const validEnvironmentData = environmentData.filter(env => env.temperature !== 0.0);

    const average = (key) => {
      const total = validEnvironmentData.reduce((acc, env) => acc + env[key], 0);
      return (total / validEnvironmentData.length).toFixed(2);
    };

    const averageData = {
      temperature: average('temperature'),
      humidity: average('humidity'),
      air_quality_index: average('air_quality_index'),
      pm25: average('pm25'),
      pm10: average('pm10'),
      no2: average('no2'),
      co: average('co'),
      o3: average('o3'),
      so2: average('so2'),
      noise_level: average('noise_level'),
      uv_index: average('uv_index'),
      radiation_gamma: average('radiation_gamma'),
      water_ph: average('water_ph'),
      water_turbidity: average('water_turbidity'),
      dissolved_oxygen: average('dissolved_oxygen')
    };

    return { totalBlocks, averageData, blocks };
  };
