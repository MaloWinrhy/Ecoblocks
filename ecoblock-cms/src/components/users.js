import * as React from "react";
import BigIntField from './BingIntField';
import { List, Datagrid, TextField, EditButton, DeleteButton, Create, SimpleForm, TextInput, Edit } from "react-admin";

export const UserList = props => (
    <List {...props} perPage={1000}>
        <Datagrid rowClick="edit">
            <BigIntField source="id" />
            <TextField source="username" />
            <TextField source="email" />
            <TextField source="role" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <BigIntField source="id" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="password_hash" />
            <TextInput source="role" />
        </SimpleForm>
    </Create>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <BigIntField source="id" disabled />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="password_hash" />
            <TextInput source="role" />
        </SimpleForm>
    </Edit>
);
