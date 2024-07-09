import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import authProvider from './authProvider';
import { UserList, UserCreate, UserEdit } from './components/users';
import { ProductList, ProductCreate, ProductEdit } from './components/products';
import { PostList, PostCreate, PostEdit } from './components/posts';
import LoginPage from './LoginPage';

const dataProvider = jsonServerProvider('http://localhost:8000');

const App = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
    >
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
    </Admin>
);

export default App;
