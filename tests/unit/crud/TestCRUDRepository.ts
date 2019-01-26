import {AbstractCRUDRepository, IId, IWithId} from '@/base_repositories/AbstractCRUDRepository';
import {Api} from './Api';

export class TestCRUDRepository<T extends IWithId> extends AbstractCRUDRepository<T> {
    public addMiddlewares = []
    public deleteMiddlewares = []
    public deleteByIdMiddlewares = []
    public editMiddlewares = []
    public editBatchMiddlewares = []
    public getMiddlewares = []
    public listMiddlewares = []
    
    async sendAddReq(instance: T) {
        const resp = await Api.sendAddReq<T>(instance)
        this.addMiddlewares.forEach(mw => mw(resp))
        return resp
    }

    async sendDeleteReq(instance: T) {
        const resp = await Api.sendDeleteReq<T>(instance)
        this.deleteMiddlewares.forEach(mw => mw(resp))
        return resp
    }

    async sendEditReq(instance: T) {
        const resp = await Api.sendEditReq<T>(instance)
        this.editMiddlewares.forEach(mw => mw(resp))
        return resp
    }

    async sendGetReq(id: IId) {
        const resp = await Api.sendGetReq<T>(id)
        this.getMiddlewares.forEach(mw => mw(resp))
        return resp
    }

    async sendListReq() {
        const resp = await Api.sendListReq<T>()
        this.listMiddlewares.forEach(mw => mw(resp))
        return resp
    }

}
