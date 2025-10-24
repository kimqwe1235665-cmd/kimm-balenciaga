export function formatMoney(amount) {
  return amount.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW"
  });
}
export default formatMoney;