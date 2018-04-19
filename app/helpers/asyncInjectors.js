import {conformsTo, isEmpty, isFunction, isObject, isString} from 'lodash';
import invariant from 'invariant';
import warning from 'warning';
import createReducer from '../reducers'; //eslint-disable-line import/no-unresolved

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
    const shape = {
        //default method added through redux
        dispatch: isFunction,
        subscribe: isFunction,
        getState: isFunction,
        replaceReducer: isFunction,
        //added function through middleware
        runSaga: isFunction,
        //added object
        asyncReducers: isObject,
    };
    invariant(
        conformsTo(store, shape),
        '(app/utils...) asyncInjectors: Expected a valid redux store'
    );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function replaceReducersAsync(store, isValid) {
    return function replaceReducers(name, asyncReducer) {
        if (!isValid) checkStore(store);

        invariant(
            isString(name) && !isEmpty(name) && isFunction(asyncReducer),
            '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
        );

        if (Reflect.has(store.asyncReducers, name)) return;

        store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
        store.replaceReducer(createReducer(store.asyncReducers));
    };
}

/**
 * Inject an asynchronously loaded saga
 */
export function runSagasAsync(store, isValid) {
    const prevSagas = [];

    return function runSagas(sagas) {
        if (!isValid) checkStore(store);

        invariant(
            Array.isArray(sagas),
            '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
        );

        warning(
            !isEmpty(sagas),
            '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
        );

        return sagas.map((saga) => {
            if (!prevSagas.includes(saga)) {
                store.runSaga(saga);
                prevSagas.push(saga);
            }
        });
    };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
    checkStore(store);

    return {
        replaceReducers: replaceReducersAsync(store, true),
        runSagas: runSagasAsync(store, true),
    };
}
