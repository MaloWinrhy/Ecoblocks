import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import PostList from './src/posts/PostList';
import PostEdit from './src/posts/PostEdit';
import PostCreate from './src/posts/PostCreate';

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    <Resource name="users" list={PostList} edit={PostEdit} />
  </Admin>
);

export default App;
