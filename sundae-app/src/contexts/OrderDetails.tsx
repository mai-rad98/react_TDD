import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";
import React from 'react'
//@ts-ignore
const OrderDetails = createContext<OrderDetailsContextValue>();

interface optionCounts{
  scoops:ItemCountMap;
  toppings:ItemCountMap;
}
interface OrderTotals {

  scoops: string;

  toppings: string;

  grandTotal: string;

}

interface OrderDetailsData extends optionCounts {

  totals: OrderTotals;

}
interface OrderDetailsContextValue extends OrderDetailsData {
  updateItemCount: UpdateCount;
  resetOrder: ResetOrder;
}

type ResetOrder = () => void;
type UpdateCount = (itemName:string,newItemCount: number| string,optionType: 'scoops'|'toppings') => void;

//type OrderDetailsContextValue = [OrderDetailsData,UpdateCount,ResetOrder]
type ItemCountMap = Map<string,number>


// create custom hook to check whether we're in a provider
export function useOrderDetails() :OrderDetailsContextValue {
  const contextValue = useContext<OrderDetailsContextValue>(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState<optionCounts>({
    scoops: new Map(), // example: { Chocolate: 1, Vanilla: 2 }
    toppings: new Map(), // example: { "Gummi Bears": 1 }
  });

  function updateItemCount(itemName:string,newItemCount: number| string,optionType: 'scoops'|'toppings') {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts };

    // update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    // update the state with the updated copy
    setOptionCounts(newOptionCounts);

    // alternate way using function argument to setOptionCounts
    // see https://www.udemy.com/course/react-testing-library/learn/#questions/18721990/
    // setOptionCounts((previousOptionCounts) => ({
    //   ...previousOptionCounts,
    //   [optionType]: {
    //     ...previousOptionCounts[optionType],
    //     [itemName]: newItemCount,
    //   },
    // }));
  }

  function resetOrder() {
    setOptionCounts({ scoops: new Map(), toppings: new Map() });
  }

  // utility function to derive totals from optionCounts state value
  function calculateTotal(optionType:string) {
    // get an array of counts for the option type (for example, [1, 2])
    const countsArray:number[] = Object.values(optionCounts[optionType]);

    // total the values in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    // multiply the total number of items by the price for this item type
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}