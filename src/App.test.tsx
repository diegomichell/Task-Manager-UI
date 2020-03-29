import React from 'react';
import {render} from '@testing-library/react';
import {mount} from 'enzyme';
import ConnectedApp, {App} from './App';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from './store';
import UserActions from "./actions/UserActions";
import {User} from "./types";
import About from "./components/about/about";

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
  const user: User = {
    _id: '123456',
    name: 'Diego',
    password: '123456',
    age: 24,
    email: 'diego@mail.com',
    avatar: 'asndsadnkqd'
  };


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

  it('render logout link when authenticated', () => {
    const store = configureStore();
    store.dispatch(UserActions.login(user, '123456'));
    const app = render(
      <Provider store={store}>
        <ConnectedApp/>
      </Provider>
    );
    expect(app.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('render user name when authenticated', () => {
    const store = configureStore();
    store.dispatch(UserActions.login(user, '123456'));
    const app = render(
      <Provider store={store}>
        <ConnectedApp/>
      </Provider>
    );
    expect(app.container.getElementsByClassName('user-nav-link').item(0)).toBeInTheDocument();
  });

  it('render about page when in /about', () => {
    const rrd = require('react-router-dom');
// Just render plain div with its children
    rrd.BrowserRouter = ({children}) => <div>{children}</div>;

    const app = mount(
      <MemoryRouter initialEntries={['/about']}>
        <App/>
      </MemoryRouter>
    );
    expect(app.find(About)).toHaveLength(1);
  });

});

