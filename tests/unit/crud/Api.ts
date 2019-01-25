import {add, edit, editBatch, get, list} from './mocks';

export class Api {
    static sendListReq<T> () :Promise<T[]> {
        return new Promise((resolve) => {
            resolve(list() as any)
        })
    }
    static sendAddReq<T> () :Promise<T> {
        return new Promise((resolve) => {
            resolve(add() as any)
        })
    }
    static sendDeleteReq () :Promise<void> {
        return new Promise((resolve) => {
            resolve()
        })
    }
    static sendDeleteByIdReq () :Promise<void> {
        return new Promise((resolve) => {
            resolve()
        })
    }
    static sendEditReq<T> () :Promise<T> {
        return new Promise((resolve) => {
            resolve(edit() as any)
        })
    }
    static sendEditBatchReq<T> () :Promise<T> {
        return new Promise((resolve) => {
            resolve(editBatch() as any)
        })
    }
    static sendGetReq<T> (id: number) :Promise<T> {
        return new Promise((resolve) => {
            resolve(get(id) as any)
        })
    }
}
