import jsonServerProvider from 'ra-data-json-server';
import bigInt from 'big-integer';

const jsonServerDataProvider = jsonServerProvider('http://localhost:8000');

const addAuthHeader = (options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth && auth.token) {
        console.log('Token found in cache:', auth.token);
        options.headers.set('Authorization', `Bearer ${auth.token}`);
    } else {
        console.log('No token found in cache');
    }
    return options;
};

const logRequest = (method, resource, params, options) => {
    console.log(`Requesting ${method} for ${resource} with params:`, params);
    console.log('Headers:', options.headers);
};

const convertBigInt = (params) => {
    if (typeof params === 'object' && params !== null) {
        for (const key in params) {
            if (params[key] instanceof bigInt || typeof params[key] === 'bigint') {
                params[key] = params[key].toString();
            }
        }
    }
    return params;
};

const dataProvider = {
    ...jsonServerDataProvider,
    getList: (resource, params) => {
        const options = addAuthHeader();
        logRequest('getList', resource, params, options);
        return jsonServerDataProvider.getList(resource, convertBigInt(params), options);
    },
    getOne: (resource, params) => {
        const options = addAuthHeader();
        logRequest('getOne', resource, params, options);
        params.id = convertBigInt(params.id); // Convert the id if it's a BigInt
        return jsonServerDataProvider.getOne(resource, params, options);
    },
    getMany: (resource, params) => {
        const options = addAuthHeader();
        logRequest('getMany', resource, params, options);
        return jsonServerDataProvider.getMany(resource, convertBigInt(params), options);
    },
    getManyReference: (resource, params) => {
        const options = addAuthHeader();
        logRequest('getManyReference', resource, params, options);
        return jsonServerDataProvider.getManyReference(resource, convertBigInt(params), options);
    },
    create: (resource, params) => {
        const options = addAuthHeader();
        logRequest('create', resource, params, options);
        return jsonServerDataProvider.create(resource, convertBigInt(params), options);
    },
    update: (resource, params) => {
        const options = addAuthHeader();
        logRequest('update', resource, params, options);
        return jsonServerDataProvider.update(resource, convertBigInt(params), options);
    },
    updateMany: (resource, params) => {
        const options = addAuthHeader();
        logRequest('updateMany', resource, params, options);
        return jsonServerDataProvider.updateMany(resource, convertBigInt(params), options);
    },
    delete: (resource, params) => {
        const options = addAuthHeader();
        logRequest('delete', resource, params, options);
        return jsonServerDataProvider.delete(resource, convertBigInt(params), options);
    },
    deleteMany: (resource, params) => {
        const options = addAuthHeader();
        logRequest('deleteMany', resource, params, options);
        return jsonServerDataProvider.deleteMany(resource, convertBigInt(params), options);
    }
};

export default dataProvider;
