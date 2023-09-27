export const formatMoney = (number, decimal = 0) => {
  if (number) {
    const format = parseFloat(number).toFixed(decimal);
    return format.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return number;
  }
}
