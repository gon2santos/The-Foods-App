import React from "react";
import Init from "../Init";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom';


describe('Init component', () => {

  it("should render a background image", () => {
    const component = render(<BrowserRouter><Init /></BrowserRouter>);
    const imgEl = component.getByTestId("bgnImg");

    expect(imgEl).toHaveAttribute('src', 'plate.jpeg');
    expect(imgEl).toHaveAttribute('alt', 'plate');
  });

  it("should render a NavLink that links to the main route", () => {
    const component = render(<BrowserRouter><Init /></BrowserRouter>);

    const linkEl = component.getByTestId('mainLink');
    expect(linkEl).toHaveAttribute('href', '/main');
  });
});



