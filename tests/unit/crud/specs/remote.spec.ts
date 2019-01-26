import {TestRepository} from '../TestRepository';
import {expect} from 'chai';
import {add, list, newItem, newItemWithoutId} from '../mocks';
import ApiPathes from '../ApiPathes';
import {TestEntity} from '../TestEntity';

describe('crud repository: active', () => {
  let testRepository = new TestRepository();
  beforeEach(() => {
    testRepository = new TestRepository();
  });
  it('add(1) should call sendAddReq and add resp to list', async () => {
    await testRepository.updateList()
    let item
    testRepository.addMiddlewares.push((resp) => { item = resp })
    await testRepository.add(add())
    expect(item).is.not.undefined
    expect(testRepository.list).contains(item)
  });
  it('addAndActivate(1) should call sendAddReq and add resp to list and activate it', async () => {
    await testRepository.updateList()
    let item
    testRepository.addMiddlewares.push((resp) => { item = resp })
    await testRepository.addAndActivate(add())
    expect(item).is.not.undefined
    expect(testRepository.list).contains(item)
    expect(testRepository.active).equals(item)
  });
  it('edit(1) should call sendEditReq and replace item to resp in list', async () => {
    await testRepository.updateList()
    let item
    testRepository.editMiddlewares.push((resp) => { item = resp })
    await testRepository.edit(testRepository.first)
    expect(item).is.not.undefined
    expect(testRepository.first).equals(item)
  });
  it('edit(1) should activate resp if item was active', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    let item
    testRepository.editMiddlewares.push((resp) => { item = resp })
    await testRepository.edit(testRepository.first)
    expect(testRepository.active).equals(item)
  });
  it('edit(1) should not activate resp if item was not active', async () => {
    await testRepository.updateList()
    testRepository.activateLast()
    let item
    testRepository.editMiddlewares.push((resp) => { item = resp })
    await testRepository.edit(testRepository.first)
    expect(testRepository.active).not.equals(item)
  });
  it('upsert(1) should call sendEditReq if 1 has id', async () => {
    await testRepository.updateList()
    let item
    testRepository.editMiddlewares.push((resp) => { item = resp })
    await testRepository.upsert(newItem())
    expect(item).is.not.undefined
  });
  it('upsert(1) should call sendAddReq if 1 hasnt id', async () => {
    await testRepository.updateList()
    let item
    testRepository.addMiddlewares.push((resp) => { item = resp })
    await testRepository.upsert(newItemWithoutId())
    expect(item).is.not.undefined
  });
  it('upsertAndActivate(1) should activate item after upserting', async () => {
    await testRepository.updateList()
    let item
    testRepository.editMiddlewares.push((resp) => { item = resp })
    await testRepository.upsertAndActivate(newItem())
    expect(testRepository.active).equals(item)
  });
  it('upsertActive() should upsert active item', async () => {
    await testRepository.updateList()
    let item
    testRepository.addMiddlewares.push((resp) => { item = resp })
    await testRepository.activate(newItemWithoutId())
    await testRepository.upsertActive()
    expect(testRepository.active).deep.equals(newItemWithoutId())
  });
  it('delete(1) should call sendDeleteReq and delete item from list', async () => {
    await testRepository.updateList()
    let savedResp
    const item = testRepository.first
    testRepository.deleteMiddlewares.push((resp) => { savedResp = resp })
    await testRepository.delete(item)
    expect(savedResp).is.not.undefined
    expect(testRepository.list).not.contains(item)
  });
  it('deleteActive() should delete active item', async () => {
    await testRepository.updateList()
    let savedResp
    const item = testRepository.first
    testRepository.activateFirst()
    testRepository.deleteMiddlewares.push((resp) => { savedResp = resp })
    await testRepository.deleteActive()
    expect(savedResp).is.not.undefined
    expect(testRepository.list).not.contains(item)
  });
  it('deleteByIndex(1) should delete item by index', async () => {
    await testRepository.updateList()
    let savedResp
    const item = testRepository.first
    testRepository.deleteMiddlewares.push((resp) => { savedResp = resp })
    await testRepository.deleteByIndex(0)
    expect(savedResp).is.not.undefined
    expect(testRepository.list).not.contains(item)
  });
});
