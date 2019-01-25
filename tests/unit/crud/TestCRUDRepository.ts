import {AbstractCRUDRepository, IWithId} from '@/base_repositories/AbstractCRUDRepository';
import {Api} from './Api';

export class TestCRUDRepository<T extends IWithId> extends AbstractCRUDRepository<T> {
    async sendAddReq() {
        return Api.sendAddReq<T>()
    }

    async sendDeleteByIdReq() {
        return Api.sendDeleteByIdReq()
    }

    async sendDeleteReq() {
        await Api.sendDeleteReq()
    }

    async sendEditBatchReq() {
        return Api.sendEditBatchReq<T>()
    }

    async sendEditReq() {
        return Api.sendEditReq<T>()
    }

    async sendGetReq(id: number) {
        return Api.sendGetReq<T>(id)
    }

    async sendListReq() {
        return Api.sendListReq<T>()
    }

}
