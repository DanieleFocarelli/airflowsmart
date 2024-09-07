export const calculateAbsoluteHumidity = (temperature: number, relativeHumidity: number): number => {
  // Constants
  const A = 6.112;
  const B = 17.67;
  const C = 243.5;
  const D = 2.1674;
  const kelvinOffset = 273.15;

  // Saturation vapor pressure (in hPa)
  const saturationVaporPressure = A * Math.exp((B * temperature) / (temperature + C));

  // Actual vapor pressure (in hPa)
  const actualVaporPressure = saturationVaporPressure * relativeHumidity;

  // Absolute humidity (in g/m³)
  const absoluteHumidity = (D * actualVaporPressure) / (temperature + kelvinOffset);

  return Math.round(absoluteHumidity * 100) / 100;
};

export const calculateAverage = (numbers: number[]): number => {
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return sum / numbers.length;
};
