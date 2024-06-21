import React, { useEffect, useState } from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import PostList from './posts/PostList';
import PostEdit from './posts/PostEdit';
import PostCreate from './posts/PostCreate';
import checkApiConnectivity from './checkApiConnectivity';

const App = () => {
  const [apiConnected, setApiConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyApiConnectivity = async () => {
      const isConnected = await checkApiConnectivity();
      setApiConnected(isConnected);
      setLoading(false);
    };

    verifyApiConnectivity();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!apiConnected) {
    return <div>Unable to connect to API. Please check your connection and try again.</div>;
  }

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
  );
};

export default App;
