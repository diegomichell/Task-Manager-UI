import React from 'react';
import {render} from '@testing-library/react';
import {mount} from 'enzyme';
import {App} from './App';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

jest.mock("./components/protected-route/protected-route", () => {
  return {
    __esModule: true,
    default: ({children}) => {
      return children;
    },
  };
});

jest.mock("./components/home/home", () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="home"/>;
    },
  };
});

describe('App component', () => {

  it('renders app', () => {
    const app = render(<App/>);

    expect(app).not.toBeNull();
  });

  it('renders nav bar', () => {
    const app = mount(<App/>);

    expect(app.find(Navbar)).not.toBeNull();
  });

  it('renders basic nav links', () => {
    const app = mount(<App/>);
    const nav = app.find(Nav);

    expect(nav).not.toBeNull();
    expect(app.find(Link)).toHaveLength(2);
  });

  it('renders home as default', () => {
    const app = mount(<App/>);
    expect(app.find('.home')).not.toBeNull();
  });

});

