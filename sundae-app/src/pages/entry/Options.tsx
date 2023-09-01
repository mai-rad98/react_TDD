import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOptions";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";
import React from "react";

interface Item {
  name: string;
  imagePath: string;
}

interface OptionsProps {
  optionType: "scoops" | "toppings";
}

export default function Options({ optionType }: OptionsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    axios
      .get<Item[]>(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner message="An unexpected error occurred. Please try again later" variant="danger" />;
  }
  

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
     // key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <div>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(Number(totals[optionType]))}
      </p>
      <Row>{optionItems}</Row>
    </div>
  );
}
