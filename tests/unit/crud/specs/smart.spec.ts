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
  it ('smartUpsert should work correct with added-locally item', async () => {
    await testRepository.updateList()
    const item = newItemWithoutId()
    let savedItem
    testRepository.addMiddlewares.push(resp => { savedItem = resp })
    await testRepository
        .addLocal(item)
        .smartUpsert(item)
    expect(savedItem).is.not.undefined
    expect(testRepository.list).contains(savedItem)
    expect(testRepository.added).not.contains(item)
  })
  it ('smartUpsert should work correct with edited-locally item', async () => {
    await testRepository.updateList()
    const item = edit()
    let savedItem
    testRepository.editMiddlewares.push(resp => { savedItem = resp })
    await testRepository
        .editLocal(item)
        .smartUpsert(item)
    expect(savedItem).is.not.undefined
    expect(testRepository.list).contains(savedItem)
    expect(testRepository.edited).not.contains(item)
  })
  it ('smartUpsert should work correct with new not-local item', async () => {
    await testRepository.updateList()
    const item = newItemWithoutId()
    let savedItem
    testRepository.addMiddlewares.push(resp => { savedItem = resp })
    await testRepository.smartUpsert(item)
    expect(savedItem).is.not.undefined
    expect(testRepository.list).contains(savedItem)
  })
  it ('smartUpsert should work correct with not-new not-local item', async () => {
    await testRepository.updateList()
    const item = edit(),
        itemWhichWillBeEdited = testRepository.localListItemById(item.id)
    let savedItem
    testRepository.editMiddlewares.push(resp => { savedItem = resp })
    await testRepository.smartUpsert(item)
    expect(savedItem).is.not.undefined
    expect(testRepository.list).contains(savedItem)
    expect(testRepository.list).not.contains(itemWhichWillBeEdited)
  })
  it ('smartDelete should work correct with added-locally item', async () => {
    await testRepository.updateList()
    const item = newItemWithoutId()
    await testRepository
        .activate(item)
        .addLocal(item)
        .smartDelete(item)
    expect(testRepository.list).not.contains(item)
    expect(testRepository.added).not.contains(item)
    expect(testRepository.active).not.equals(item)
  })
  it ('smartDelete should work correct with not-local item', async () => {
    await testRepository.updateList()
    let savedResp
    const itemToDelete = testRepository.first
    testRepository.deleteMiddlewares.push(resp => { savedResp = resp })
    await testRepository.smartDelete(itemToDelete)
    expect(savedResp).is.not.undefined
    expect(testRepository.list).not.contains(itemToDelete)
  })
  it ('refreshItem should get item with same id from server and replace it in localList', async () => {
    await testRepository.updateList()
    let savedItem
    const itemToRefresh = testRepository.first
    testRepository.getMiddlewares.push(resp => { savedItem = resp })
    await testRepository.refreshItem(itemToRefresh)
    expect(savedItem).is.not.undefined
    expect(testRepository.localList).contains(savedItem)
    expect(testRepository.localList).not.contains(itemToRefresh)
  })
  it ('refreshItemById should get item with same id from server and replace it in localList', async () => {
    await testRepository.updateList()
    let savedItem
    const itemToRefresh = testRepository.first
    testRepository.getMiddlewares.push(resp => { savedItem = resp })
    await testRepository.refreshItemById(itemToRefresh.id)
    expect(savedItem).is.not.undefined
    expect(testRepository.localList).contains(savedItem)
    expect(testRepository.localList).not.contains(itemToRefresh)
  })
});
