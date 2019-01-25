import {actionMiddlewares, getterMiddlewares, mutationMiddlewares, stateMiddlewares} from '@/StoreModule/middlewares';

export interface IGetterOptions {}
export interface IStateOptions {}
export interface IMutationOptions {}
export interface IActionOptions {}


export function State (options? :IStateOptions) {
    return (target: any, propertyKey: string) => {
        stateMiddlewares.forEach(mw => {
            mw(options, target, propertyKey)
        })
        if (!target.hasOwnProperty('statePropsNames')) target.statePropsNames = []
        target.statePropsNames.push(propertyKey)
    }
}

export function Mutation (options?: IMutationOptions) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        mutationMiddlewares.forEach(mw => {
            mw(options, target, propertyKey, descriptor)
        })
        if (!target.hasOwnProperty('mutationsNames')) target.mutationsNames = []
        target.mutationsNames.push(propertyKey)
    }
}

export function Action (options?: IActionOptions) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        actionMiddlewares.forEach(mw => {
            mw(options, target, propertyKey, descriptor)
        })
        if (!target.hasOwnProperty('actionsNames')) target.actionsNames = []
        target.actionsNames.push(propertyKey)
    }
}

export function Getter (options?: IGetterOptions) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        getterMiddlewares.forEach(mw => {
            mw(options, target, propertyKey, descriptor)
        })
        if (!target.hasOwnProperty('gettersNames')) target.gettersNames = []
        target.gettersNames.push(propertyKey)
    }
}
