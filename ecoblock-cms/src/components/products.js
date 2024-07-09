import * as React from "react";
import BigIntField from './BingIntField';
import { List, Datagrid, TextField, EditButton, DeleteButton, Create, SimpleForm, TextInput, Edit, ArrayInput, SimpleFormIterator } from "react-admin";

export const ProductList = props => (
    <List {...props} perPage={1000}>
        <Datagrid rowClick="edit">
            <BigIntField source="id" />
            <TextField source="title" />
            <TextField source="content" />
            <TextField source="image" />
            <TextField source="tags" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <BigIntField source="id" />
            <TextInput source="title" />
            <TextInput source="content" />
            <TextInput source="image" />
            <ArrayInput source="tags">
                <SimpleFormIterator>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const ProductEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <BigIntField source="id" disabled />
            <TextInput source="title" />
            <TextInput source="content" />
            <TextInput source="image" />
            <ArrayInput source="tags">
                <SimpleFormIterator>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);
