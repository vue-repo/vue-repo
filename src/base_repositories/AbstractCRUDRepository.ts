import _concat from 'lodash/concat'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import _isNil from 'lodash/isNil'
import _isEqual from 'lodash/isEqual'
import _keyBy from 'lodash/keyBy'
import {StoreModule} from '../StoreModule/StoreModule';
import {Action, Getter, Mutation, State} from '../StoreModule/annotations';

export type IId = string | number

export interface IWithId {
  id: IId
}

export interface ICRUDApi {
  add: string,
  list: string,
  get: string,
  edit: string
  delete: string
}


export abstract class AbstractCRUDRepository<T extends IWithId> extends StoreModule {
  // ----------- Getters ------------
  @Getter()
  public get hasList () {
    return !_isNil(this.list)
  }
  @Getter()
  public get isListEmpty () {
    return _isEmpty(this.list)
  }
  @Getter()
  public get isLocalListEmpty () {
    return _isEmpty(this.localList)
  }
  @Getter()
  public get localList () {
    return this.getLocalList()
  }
  @Getter()
  public get addedIndex () {
    return (instance: T) => this.added.findIndex(addedInstance => addedInstance === instance)
  }
  @Getter()
  public get deletedIndex () {
    return (instance: T) => this.deleted.findIndex(deletedInstance => deletedInstance === instance)
  }
  @Getter()
  public get deletedIndexById () {
    return (id: IId) => this.deleted.findIndex(deletedInstance => deletedInstance.id === id)
  }
  @Getter()
  public get editedIndex () {
    return (instance: T) => this.edited.findIndex(editedInstance => editedInstance === instance)
  }
  @Getter()
  public get editedIndexById () {
    return (id: IId) => this.edited.findIndex(editedInstance => editedInstance.id === id)
  }
  @Getter()
  public get listFirstItem () {
    return this.listItemByIndex(0)
  }
  @Getter()
  public get listLastItem () {
    return this.listItemByIndex(this.listLastIndex)
  }
  @Getter()
  public get listLastIndex () {
    return this.listLength - 1
  }
  @Getter()
  public get listLength () {
    this.throwErrorIfHasntList()
    return (this.list as T[]).length
  }
  @Getter()
  public get listItemByIndex () {
    return (index: number) => {
      this.throwErrorIfHasntList()
      return (this.list as T[])[index]
    }
  }
  @Getter()
  public get listItemById () {
    return (id: IId) => {
      this.throwErrorIfHasntList()
      return (this.list as T[]).find(instance => instance.id === id)
    }
  }
  @Getter()
  public get listIndex () {
    return (instance: T) => {
      this.throwErrorIfHasntList()
      return (this.list as T[]).findIndex((listInstance: T) => listInstance === instance)
    }
  }
  @Getter()
  public get listIndexById () {
    return (id: IId) => {
      this.throwErrorIfHasntList()
      return (this.list as T[]).findIndex((listInstance: T) => listInstance.id === id)
    }
  }
  @Getter()
  public get first () {
    return this.localListFirstItem
  }
  @Getter()
  public get last () {
    return this.localListLastItem
  }
  @Getter()
  public get localListFirstItem () {
    return this.localListItemByIndex(0)
  }
  @Getter()
  public get localListLastItem () {
    return this.localListItemByIndex(this.localListLastIndex)
  }
  @Getter()
  public get localListLastIndex () {
    return this.localListLength - 1
  }
  @Getter()
  public get localListLength () {
    return this.localList.length
  }
  @Getter()
  public get localListItemByIndex () {
    return (index: number) => {
      this.throwErrorIfHasntList()
      return this.localList[index]
    }
  }
  @Getter()
  public get localListItemById () {
    return (id: IId) => {
      this.throwErrorIfHasntList()
      return this.localList.find(instance => instance.id === id)
    }
  }
  @Getter()
  public get localListIndex () {
    return (instance: T) => {
      this.throwErrorIfHasntList()
      return this.localList.findIndex((localListInstance: T) => localListInstance === instance)
    }
  }
  @Getter()
  public get localListIndexById () {
    return (id: IId) => {
      this.throwErrorIfHasntList()
      return this.localList.findIndex((localListInstance: T) => localListInstance.id === id)
    }
  }
  @Getter()
  public get deletedMap () {
    return _keyBy(this.deleted, 'id')
  }
  @Getter()
  public get addedMap () {
    return _keyBy(this.added, 'id')
  }
  @Getter()
  public get editedMap () {
    return _keyBy(this.edited, 'id')
  }
  @Getter()
  public get listMap () {
    return _keyBy(this.list, 'id')
  }
  @Getter()
  public get localListMap () {
    return _keyBy(this.localList, 'id')
  }
  @Getter()
  public get hasAdded () {
    return !_isEmpty(this.added)
  }
  @Getter()
  public get isAdded () {
    return (instance: T) => this.added.includes(instance)
  }
  @Getter()
  public get addedById () {
    return (id: IId) => this.addedMap[id]
  }
  @Getter()
  public get isAddedById () {
    return (id: IId) => this.addedMap[id] !== undefined
  }
  @Getter()
  public get hasEdited () {
    return !_isEmpty(this.edited)
  }
  @Getter()
  public get isEdited () {
    return (instance: T) => this.edited.includes(instance)
  }
  @Getter()
  public get editedById () {
    return (id: IId) => this.editedMap[id]
  }
  @Getter()
  public get isEditedById () {
    return (id: IId) => this.editedById(id) !== undefined
  }
  @Getter()
  public get hasDeleted () {
    return !_isEmpty(this.deleted)
  }
  @Getter()
  public get isDeleted () {
    return (instance: T) => this.deleted.includes(instance)
  }
  @Getter()
  public get deletedById () {
    return (id: IId) => this.deletedMap[id]
  }
  @Getter()
  public get isDeletedById () {
    return (id: IId) => this.deletedMap[id] !== undefined
  }
  @Getter()
  public get hasActive () {
    return !_isEmpty(this.active)
  }
  @Getter()
  public get isActive () {
    return (instance: T) => this.active === instance
  }
  @Getter()
  public get isActiveNew () {
    return this.active !== undefined && this.isAdded(this.active)
  }
  @Getter()
  public get isActiveById () {
    return (id: string | number) => this.hasActive && this.active.id === id
  }
  @Getter()
  public get listIds () :Array<IId> {
    this.throwErrorIfHasntList()
    return (this.list as T[]).map((item: T) => item.id)
  }
  @Getter()
  public get localListIds () :Array<IId> {
    return this.localList.map((item: T) => item.id)
  }
  @Getter()
  public get isActiveChangedAfterActivation () {
    return this.hasActive && !_isEqual(this.activeInitialCopy, this.active)
  }
  // ----------- State ------------
  @State()
  public added: T[] = []
  @State()
  public edited: T[] = []
  @State()
  public deleted: T[] = []
  @State()
  public list: T[] | undefined
  @State()
  public active: T
  @State()
  public activeInitialCopy: T | undefined
  // ----------- Constructor ------------
  constructor (
    public api: ICRUDApi
  ) {
    super()
  }
  // ----------- Mutations ------------
  // Active
  @Mutation()
  public activate (instance: T) :this {
    this.active = instance
    this.setActiveInitialCopy(instance)
    return this
  }
  @Mutation()
  public deactivate () :this {
    this.active = undefined
    this.clearActiveInitialCopy()
    return this
  }
  @Mutation()
  public activateFirst () :this {
    this.activate(this.localListFirstItem)
    return this
  }
  @Mutation()
  public activateLast () :this {
    this.activate(this.localListLastItem)
    return this
  }
  @Mutation()
  public activateByIndex (index: number) :this {
    this.activate(this.localListItemByIndex(index))
    return this
  }
  @Mutation()
  public activateInstead (insteadInstance: T, instanceToActivate: T) :this {
    if (this.isActive(insteadInstance)) this.activate(instanceToActivate)
    return this
  }
  @Mutation()
  public activateInsteadById (id: string | number, instanceToActivate: T) :this {
    if (this.isActiveById(id)) this.activate(instanceToActivate)
    return this
  }
  @Mutation()
  public deactivateIfActive (instance: T) :this {
    if (this.isActive(instance)) this.deactivate()
    return this
  }
  @Mutation()
  public resetActiveToInitialState () :this {
    this.throwErrorIfHasntActive()
    const activeInitialCopyClone = _cloneDeep(this.activeInitialCopy as T)
    this.smartReplace(this.active, activeInitialCopyClone)
    this.activate(activeInitialCopyClone)
    return this
  }
  // List
  @Mutation()
  public setList (list: T[]) :this {
    this.list = list
    return this
  }
  // Local add
  @Mutation()
  public addLocal (instance: T) :this {
    this.added.unshift(instance)
    return this
  }
  @Mutation()
  public deleteAdded (instance: T) :this {
    const index = this.addedIndex(instance)
    if (index !== -1) {
      this.deactivateIfActive(instance)
      this.added.splice(index, 1)
    }
    return this
  }
  @Mutation()
  public deleteAllAdded () :this {
    this.added = []
    return this
  }
  // Local edit
  @Mutation()
  public editLocal (instance: T) :this {
    const index = this.editedIndex(instance)
    index === -1 ? this.edited.push(instance) : this.edited.splice(index, 1, instance)
    return this
  }
  @Mutation()
  public deleteEdited (instance: T) :this {
    this.edited.splice(this.editedIndex(instance), 1)
    return this
  }
  @Mutation()
  public deleteAllEdited () :this {
    this.edited = []
    return this
  }
  // Local delete
  @Mutation()
  public deleteLocal (instance: T) :this {
    this.deleted.push(instance)
    this.deactivateIfActive(instance)
    return this
  }
  @Mutation()
  public deleteActiveLocal () :this {
    this.throwErrorIfHasntActive()
    this.deleteLocal(this.active)
    return this
  }
  @Mutation()
  public deleteDeleted (instance: T) :this {
    this.deleted.splice(this.deletedIndex(instance), 1)
    return this
  }
  @Mutation()
  public deleteAllDeleted () :this {
    this.deleted = []
    return this
  }
  @Mutation()
  public clear () :this {
    this.clearList()
    this.deleteAllAdded()
    this.deleteAllEdited()
    this.deleteAllDeleted()
    this.deactivate()
    return this
  }
  @Mutation()
  public clearList () :this {
    this.list = undefined
    return this
  }
  // Send requests
  @Action()
  public async sendUpsertReq (instance: T, ...params: any[]) :Promise<any> {
    const resp = _isNil(instance.id)
      ? await this.sendAddReq(instance, ...params)
      : await this.sendEditReq(instance, ...params)
    return resp
  }
  abstract async sendAddReq (instance: T, ...params: any[]) :Promise<T>
  abstract async sendEditReq (instance: T, ...params: any[]) :Promise<T>
  abstract async sendDeleteReq (instance: T, ...params: any[]) :Promise<void>
  abstract async sendListReq (...params: any[]) :Promise<T[]>
  abstract async sendGetReq (id: IId, ...params: any[]) :Promise<T>
  // Flush
  @Action()
  public async flushAdded (instance: T, ...params: any[]) :Promise<T> {
    if (!this.isAdded(instance)) throw new Error('Item is not added locally')
    const resp = await this.sendAddReq(instance, ...params)
    this.deleteAdded(instance)
    this.addToList(resp)
    this.activateInstead(instance, resp)
    return resp
  }
  @Action()
  public async flushAllAdded (...params: any[]) :Promise<Array<T>> {
    return await Promise.all(
      this.added.map(async addedInstance => {
        return this.flushAdded(addedInstance, ...params)
      })
    )
  }
  @Action()
  public async flushEdited (instance: T, ...params: any[]) :Promise<T> {
    if (!this.isEdited(instance)) throw new Error('Item is not edited locally')
    const resp = await this.sendEditReq(instance, ...params)
    this.deleteEdited(instance)
    this.editInList(resp)
    this.activateInstead(instance, resp)
    return resp
  }
  @Action()
  public async flushAllEdited (...params: any[]) :Promise<Array<T>> {
    return await Promise.all(
      this.edited.map(async editedInstance => {
        return this.flushEdited(editedInstance, ...params)
      })
    )
  }
  @Action()
  public async flushDeleted (instance: T, ...params: any[]) :Promise<void> {
    if (!this.isDeleted(instance)) throw new Error('Item is not deleted locally')
    await this.sendDeleteReq(instance, ...params)
    this.deleteDeleted(instance)
    this.deleteFromList(instance)
  }
  @Action()
  public async flushAllDeleted (...params: any[]) :Promise<Array<void>> {
    return await Promise.all(
      this.deleted.map(async deletedInstance => {
        return this.flushDeleted(deletedInstance, ...params)
      })
    )
  }
  @Action()
  public async flush () {
    await Promise.all([
      this.flushAllAdded(),
      this.flushAllEdited(),
      this.flushAllDeleted()
    ])
  }
  // Remote changing. Change on server and then in list
  @Action()
  public async add (instance: T, ...params: any[]) :Promise<T> {
    const resp = await this.sendAddReq(instance, ...params)
    if (this.hasList) this.addToList(resp)
    return resp
  }
  @Action()
  public async addAndActivate (instance: T, ...params: any[]) :Promise<T> {
    const resp = await this.add(instance, ...params)
    this.activate(resp)
    return resp
  }
  @Action()
  public async edit (instance: T, ...params: any[]) :Promise<T> {
    const resp = await this.sendEditReq(instance, ...params)
    if (this.hasList) this.editInList(resp)
    this.activateInstead(instance, resp)
    return resp
  }
  @Action()
  public async upsert (instance: T, ...params: any[]) :Promise<T> {
    const resp = _isNil(instance.id)
      ? this.add(instance, ...params)
      : this.edit(instance, ...params)
    return resp
  }
  @Action()
  public async upsertAndActivate (instance: T) :Promise<T> {
    const resp = await this.upsert(instance)
    this.activate(resp)
    return resp
  }
  @Action()
  public async upsertActive () :Promise<T | undefined> {
    this.throwErrorIfHasntActive()
    return await this.upsert(this.active)
  }
  @Action()
  public async delete (instance: T, ...params: any[]) :Promise<void> {
    await this.sendDeleteReq(instance, ...params)
    if (this.hasList) this.deleteFromList(instance)
    this.deactivateIfActive(instance)
  }
  @Action()
  public async deleteActive (...params: any[]) :Promise<void> {
    this.throwErrorIfHasntActive()
    return await this.delete(this.active, ...params)
  }
  @Action()
  public async deleteByIndex (index: number, ...params: any[]) :Promise<void> {
    return await this.smartDelete(this.localList[index], ...params)
  }
  // Smart methods
  @Action()
  public async smartUpsert (instance: T, ...params: any[]) {
    if (this.isAdded(instance)) {
      return await this.flushAdded(instance, ...params)
    } else if (this.isEdited(instance)) {
      return await this.flushEdited(instance, ...params)
    } else {
      return await this.upsert(instance, ...params)
    }
  }
  @Action()
  public async smartUpsertActive (...params: any[]) {
    this.throwErrorIfHasntActive()
    return await this.smartUpsert(this.active, ...params)
  }
  @Action()
  public async smartDelete (instance: T, ...params: any[]) :Promise<void> {
    if (this.isAdded(instance)) {
      this.deleteAdded(instance)
      this.deactivateIfActive(instance)
    } else if (this.isDeleted(instance)) {
      await this.flushDeleted(instance, ...params)
    } else {
      await this.delete(instance, ...params)
    }
  }
  @Action()
  public async smartDeleteActive () :Promise<void> {
    this.throwErrorIfHasntActive()
    await this.smartDelete(this.active)
  }
  @Action()
  public async smartUpsertAndActivate (instance: T) :Promise<T> {
    const resp = await this.smartUpsert(instance)
    this.activate(resp)
    return resp
  }
  // List
  @Action()
  public async updateList (...params: any[]) :Promise<T[]> {
    const resp = await this.sendListReq(params)
    this.setList(resp)
    return resp
  }
  // Get
  @Action()
  public async getAndActivate (id: IId, ...params: any[]) :Promise<T> {
    const resp = await this.sendGetReq(id, ...params)
    this.activate(resp)
    return resp
  }
  @Action()
  public async refreshItem (instance: T, ...params: any[]) {
    const resp = await this.sendGetReq(instance.id, ...params)
    this.smartReplace(instance, resp)
    return resp
  }
  @Action()
  public async refreshItemById (id: IId) {
    const item = this.localListItemById(id)
    if (item === undefined) throw new Error(`There is no item with id ${id} in localList`)
    return await this.refreshItem(item)
  }
  // Other methods
  protected getLocalList () :T[] {
    const withoutDeleted = this.list === undefined ? [] : this.list.filter(item => !this.isDeleted(item))
    return _concat(this.added, withoutDeleted.map(item => this.isEditedById(item.id) ? this.editedById(item.id) : item))
  }
  protected addToList (instance: T) :this {
    this.throwErrorIfHasntList()
    this.list.unshift(instance)
    return this
  }
  protected editInList (instance: T) :this {
    this.throwErrorIfHasntList()
    const index = this.listIndexById(instance.id)
    if (index === -1) throw new Error(`There is no instance with id ${instance.id} in list`)
    this.list.splice(index, 1, instance)
    return this
  }
  protected deleteFromList (instance: T) :this {
    const index = this.localListIndex(instance)
    this.activateInstead(this.localList[index], instance)
    if (this.list !== undefined) {
      this.list.splice(index, 1)
    }
    return this
  }
  protected deleteActiveFromList () :this {
    this.throwErrorIfHasntActive()
    this.deleteFromList(this.active)
    return this
  }
  protected smartReplace (replaceableInstance: T, replacingInstance: T) :this {
    this.activateInstead(replaceableInstance, replacingInstance)
    if (this.isAdded(replaceableInstance)) {
      this.replaceAdded(replaceableInstance, replacingInstance)
    } else if (this.isEdited(replaceableInstance)) {
      this.replaceEdited(replaceableInstance, replacingInstance)
    } else {
      this.replaceInList(replaceableInstance, replacingInstance)
    }
    return this
  }
  protected replaceAdded (replaceableInstance: T, replacingInstance: T) :this {
    this.added.splice(this.addedIndex(replaceableInstance), 1, replacingInstance)
    return this
  }
  protected replaceEdited (replaceableInstance: T, replacingInstance: T) :this {
    this.edited.splice(this.editedIndex(replaceableInstance), 1, replacingInstance)
    return this
  }
  protected replaceDeleted (replaceableInstance: T, replacingInstance: T) :this {
    this.deleted.splice(this.deletedIndex(replaceableInstance), 1, replacingInstance)
    return this
  }
  protected replaceInList (replaceableInstance: T, replacingInstance: T) :this {
    const index = this.listIndex(replaceableInstance)
    if (index === undefined || this.list === undefined) return this
    this.list.splice(index, 1, replacingInstance)
    return this
  }
  protected setActiveInitialCopy (instance: T) :this {
    this.activeInitialCopy = _cloneDeep(instance)
    return this
  }
  protected clearActiveInitialCopy () :this {
    this.activeInitialCopy = undefined
    return this
  }
  protected throwErrorIfHasntList () {
    if (this.list === undefined) throw new Error('There is no list')
  }
  protected throwErrorIfHasntActive () {
    if (this.list === undefined) throw new Error('There is no active item')
  }
}
