import {TestRepository} from '../TestRepository';
import {expect} from 'chai';
import {add, edit, get, list, newItem, newItemWithoutId} from '../mocks';
import ApiPathes from '../ApiPathes';
import {TestEntity} from '../TestEntity';

describe('crud repository: active', () => {
  let testRepository = new TestRepository();
  beforeEach(() => {
    testRepository = new TestRepository();
  });
  it('flushAdded(1) should call sendAddReq and add resp to list and delete from added', async () => {
    await testRepository.updateList()
    let savedItem
    const item = newItemWithoutId()
    testRepository.addMiddlewares.push((resp) => { savedItem = resp })
    await testRepository
        .addLocal(item)
        .flushAdded(item)
    expect(savedItem).is.not.undefined
    expect(testRepository.list).contains(savedItem)
    expect(testRepository.added).not.contains(item)
  });
  it('flushAllAdded() should call flushAdded for all local-added items', async () => {
    await testRepository.updateList()
    let callsNumber = 0
    const item = newItemWithoutId(),
      item2 = newItemWithoutId()
    testRepository.addMiddlewares.push((resp) => { callsNumber++ })
    await testRepository
        .addLocal(item)
        .addLocal(item2)
        .flushAllAdded()
    expect(callsNumber).equals(2)
  });
  it('flushEdited(1) should call sendEditReq and add resp to list and delete from edited', async () => {
    await testRepository.updateList()
    let savedItem
    const item = edit()
    testRepository.editMiddlewares.push((resp) => { savedItem = resp })
    await testRepository
        .editLocal(item)
        .flushEdited(item)
    expect(savedItem).is.not.undefined
    expect(testRepository.list).contains(savedItem)
    expect(testRepository.edited).not.contains(item)
  });
  it('flushAllEdited() should call flushEdited for all local-edited items', async () => {
    await testRepository.updateList()
    let callsNumber = 0
    const item = edit(),
        item2 = edit()
    testRepository.editMiddlewares.push((resp) => { callsNumber++ })
    await testRepository
        .editLocal(item)
        .editLocal(item2)
        .flushAllEdited()
    expect(callsNumber).equals(2)
  });
  it('flushDeleted(1) should call sendDeleteReq and add resp to list and delete from deleted', async () => {
    await testRepository.updateList()
    let savedResp
    const item = get(1)
    testRepository.deleteMiddlewares.push((resp) => { savedResp = resp })
    await testRepository
        .deleteLocal(item)
        .flushDeleted(item)
    expect(savedResp).is.not.undefined
    expect(testRepository.list).not.contains(item)
    expect(testRepository.deleted).not.contains(item)
  });
  it('flushAllDeleted() should call flushDeleted for all local-deleted items', async () => {
    await testRepository.updateList()
    let callsNumber = 0
    const item = get(1),
        item2 = get(2)
    testRepository.deleteMiddlewares.push((resp) => { callsNumber++ })
    await testRepository
        .deleteLocal(item)
        .deleteLocal(item2)
        .flushAllDeleted()
    expect(callsNumber).equals(2)
  });
  it('flush() should call flush all local-deleted, local-edited, local-added items', async () => {
    await testRepository.updateList()
    let callsNumber = 0
    const itemToDelete = get(2),
        itemToAdd = newItemWithoutId(),
        itemToEdit = edit()
    testRepository.addMiddlewares.push((resp) => { callsNumber++ })
    testRepository.editMiddlewares.push((resp) => { callsNumber++ })
    testRepository.deleteMiddlewares.push((resp) => { callsNumber++ })
    await testRepository
        .deleteLocal(itemToDelete)
        .addLocal(itemToAdd)
        .editLocal(itemToEdit)
        .flush()
    expect(callsNumber).equals(3)
  });
});
