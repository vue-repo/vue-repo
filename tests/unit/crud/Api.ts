import {add, edit, editBatch, get, list} from './mocks';
import {IId} from '@/base_repositories/AbstractCRUDRepository';

export class Api {
    static sendListReq<T> () :Promise<T[]> {
        return new Promise((resolve) => {
            resolve(list() as any)
        })
    }
    static sendAddReq<T> (instance: T) :Promise<T> {
        return new Promise((resolve) => {
            resolve(add() as any)
        })
    }
    static sendDeleteReq<T> (instance: T) :Promise<void> {
        return new Promise((resolve) => {
            resolve(200 as any)
        })
    }
    static sendEditReq<T> (instance: T) :Promise<T> {
        return new Promise((resolve) => {
            resolve(edit() as any)
        })
    }
    static sendGetReq<T> (id: IId) :Promise<T> {
        return new Promise((resolve) => {
            resolve(get(id) as any)
        })
    }
}
