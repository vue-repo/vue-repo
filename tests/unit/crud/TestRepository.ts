import {Action, Getter, Mutation, State} from '../../../src/StoreModule/annotations';
import {TestEntity} from './TestEntity';
import ApiPathes from './ApiPathes';
import {Api} from './Api';
import {TestCRUDRepository} from './TestCRUDRepository';

export class TestRepository extends TestCRUDRepository<TestEntity> {
    constructor () {
        super(ApiPathes.test)
    }
    @State()
    public someState: any
    @Mutation()
    public setSomeState (some: string) {
        this.someState = some
    }
    @Action()
    public async updateSomeState () {
        // await Api.send()
        this.setSomeState('bla')
    }
    @Getter()
    public get computedSomeState () {
        return 'comp' + this.someState
    }
}
