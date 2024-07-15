import * as React from "react";
import { Admin, Resource } from "react-admin";
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { UserList, UserCreate, UserEdit } from './components/users';
import { ProductList, ProductCreate, ProductEdit } from './components/products';
import { PostList, PostCreate, PostEdit } from './components/posts';
import LoginPage from './LoginPage';

const App = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
    >
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
        <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} />
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
    </Admin>
);

export default App;