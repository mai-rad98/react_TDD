import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderSummary = () => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopsList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value as string} {key}
    </li>
  ));

  const toppingsArray = Object.entries(optionCounts.toppings);
  const toppingsList = toppingsArray.map(([key, value]) => (
    <li key={key}>
      {value as string} {key}
    </li>
  ));

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(Number(totals.scoops))}</h2>
      <ul>{scoopsList}</ul>
      <h2>Toppings: {formatCurrency(Number(totals.toppings))}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm setOrderPhase={() => {}} /> {/* Ensure setOrderPhase has a function */}
    </>
  );
};

export default OrderSummary;
