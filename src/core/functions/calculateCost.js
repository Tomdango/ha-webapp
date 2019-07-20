const calculateCost = (timeOn, power) => {
  const hoursOn = timeOn / 60 / 60;
  const kiloWatt = power / 1000;
  const kiloWattHours = kiloWatt * hoursOn;
  const pence = kiloWattHours * 13.2;
  return (pence / 100).toFixed(2);
};

export default calculateCost;
