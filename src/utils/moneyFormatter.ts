export const formatMoney = (money: number): string => {
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "đ";
};
