import _merge from 'lodash/merge';
import {IActionOptions, IGetterOptions, IMutationOptions, IStateOptions} from '@/StoreModule/annotations';

export type getterMiddlewareType = (options :IGetterOptions | undefined, target: any, propertyKey: string, descriptor: PropertyDescriptor) => any
export type stateMiddlewareType = (options :IStateOptions| undefined, target: any, propertyKey: string) => any
export type mutationMiddlewareType = (options :IMutationOptions| undefined, target: any, propertyKey: string, descriptor: PropertyDescriptor) => any
export type actionMiddlewareType = (options :IActionOptions | undefined, target: any, propertyKey: string, descriptor: PropertyDescriptor) => any

export var getterMiddlewares: getterMiddlewareType[] = []
export var stateMiddlewares: stateMiddlewareType[] = []
export var mutationMiddlewares: mutationMiddlewareType[] = []
export var actionMiddlewares: actionMiddlewareType[] = []

export function addGetterMiddleware(...middlewares: getterMiddlewareType[]) {
    getterMiddlewares = _merge(getterMiddlewares, middlewares)
}

export function addStateMiddleware(...middlewares: stateMiddlewareType[]) {
    stateMiddlewares = _merge(stateMiddlewares, middlewares)
}

export function addMutationMiddleware(...middlewares: Array<mutationMiddlewareType>) {
    mutationMiddlewares = _merge(mutationMiddlewares, middlewares)
}

export function addActionMiddleware(...middlewares: actionMiddlewareType[]) {
    actionMiddlewares = _merge(actionMiddlewares, middlewares)
}
