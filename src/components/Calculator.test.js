import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator Component", () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test("calculates base price correctly", () => {
    fireEvent.change(screen.getByLabelText(/Red set \(50 THB\)/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Green set \(40 THB\)/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText(/Calculate/i));

    expect(screen.getByText(/Total Price:/i)).toHaveTextContent("90.00");
  });

  test("applies member discount correctly", () => {
    fireEvent.change(screen.getByLabelText(/Red set \(50 THB\)/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Green set \(40 THB\)/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByLabelText(/Member Card \(10% Discount\)/i));
    fireEvent.click(screen.getByText(/Calculate/i));

    expect(screen.getByText(/Total Price:/i)).toHaveTextContent("81.00");
  });

  test("applies 5% discount for Orange set when ordering 2 or more", () => {
    fireEvent.change(screen.getByLabelText(/Orange set \(120 THB\)/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText(/Calculate/i));

    const expectedPrice = (2 * 120 * 0.95).toFixed(2);
    expect(screen.getByText(/Total Price:/i)).toHaveTextContent(expectedPrice);
  });

  test("applies 5% discount for Pink set when ordering 2 or more", () => {
    fireEvent.change(screen.getByLabelText(/Pink set \(80 THB\)/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText(/Calculate/i));

    const expectedPrice = (2 * 80 * 0.95).toFixed(2);
    expect(screen.getByText(/Total Price:/i)).toHaveTextContent(expectedPrice);
  });

  test("applies 5% discount for Green set when ordering 2 or more", () => {
    fireEvent.change(screen.getByLabelText(/Green set \(40 THB\)/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText(/Calculate/i));

    const expectedPrice = (2 * 40 * 0.95).toFixed(2);
    expect(screen.getByText(/Total Price:/i)).toHaveTextContent(expectedPrice);
  });

  test("applies both 5% and 10% member discount correctly", () => {
    fireEvent.change(screen.getByLabelText(/Orange set \(120 THB\)/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByLabelText(/Member Card \(10% Discount\)/i));
    fireEvent.click(screen.getByText(/Calculate/i));

    const basePrice = 2 * 120;
    const discountedPrice = basePrice * 0.95;
    const finalPrice = discountedPrice * 0.9;

    expect(screen.getByText(/Total Price:/i)).toHaveTextContent(
      finalPrice.toFixed(2)
    );
  });
});
