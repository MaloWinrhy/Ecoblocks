import * as React from 'react';
import { useRecordContext } from 'react-admin';
import bigInt from 'big-integer';

const BigIntField = ({ source }) => {
    const record = useRecordContext();
    if (!record) return null;
    const value = bigInt(record[source]).toString();
    return <span>{value}</span>;
};

export default BigIntField;
