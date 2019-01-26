import {TestRepository} from '../../TestRepository';
import {expect} from 'chai';
import {add, list, newItem} from '../../mocks';
import ApiPathes from '../../ApiPathes';

describe('crud repository: localAdd', () => {
  let testRepository = new TestRepository();
  beforeEach(() => {
    testRepository = new TestRepository();
  });
  it('addLocal should add item in beginning of the localList but not in list', async () => {
    const item = newItem(),
      item2 = newItem()
    await testRepository.updateList();
    testRepository
        .addLocal(item)
        .addLocal(item2)
    expect(testRepository.localListIndex(item2)).equals(0);
    expect(testRepository.localListIndex(item)).equals(1);
    expect(testRepository.listIndex(item)).equals(-1);
    expect(testRepository.listIndex(item2)).equals(-1);
  });
  it('deleteAdded should delete added item from localList', async () => {
    const item = newItem()
    await testRepository.updateList();
    testRepository.addLocal(item)
    testRepository.deleteAdded(item)
    expect(testRepository.localListIndex(item)).equals(-1);
  });
  it('deleteAdded(1) should clear active if 1 is active', async () => {
    const item = newItem()
    await testRepository.updateList();
    testRepository
        .addLocal(item)
        .activate(item)
        .deleteAdded(item)
    expect(testRepository.active).is.undefined;
  });
  it('deleteAdded(1) should not clear active if 1 is not active', async () => {
    const item = newItem()
    await testRepository.updateList();
    testRepository
        .addLocal(item)
        .activateLast()
        .deleteAdded(item)
    expect(testRepository.active).equals(testRepository.last);
  });
  it('deleteAllAdded should delete all added items from localList', async () => {
    const item = newItem(),
      item2 = newItem()
    await testRepository.updateList();
    testRepository.addLocal(item)
    testRepository.addLocal(item2)
    testRepository.deleteAllAdded()
    expect(testRepository.localListIndex(item)).equals(-1);
    expect(testRepository.localListIndex(item2)).equals(-1);
  });
  it('hasAdded getter should be true if has local-added items', async () => {
    const item = newItem()
    testRepository.addLocal(item)
    expect(testRepository.hasAdded).equals(true);
  });
  it('hasAdded getter should be false if hasnt local-added items', async () => {
    expect(testRepository.hasAdded).equals(false);
  });
  it('isAdded getter should be true if item has in added', async () => {
    const item = newItem()
    testRepository.addLocal(item)
    expect(testRepository.isAdded(item)).equals(true);
  });
  it('addedById getter should return added item by id', async () => {
    const item = newItem()
    testRepository.addLocal(item)
    expect(testRepository.addedById(item.id)).equals(item);
  });
  it('isAddedById getter should be true if item has in added', async () => {
    const item = newItem()
    testRepository.addLocal(item)
    expect(testRepository.isAddedById(item.id)).equals(true);
  });
  it('addedIndex getter should return correct index', async () => {
    const item = newItem(),
        item2 = newItem()
    testRepository.addLocal(item)
    testRepository.addLocal(item2)
    expect(testRepository.addedIndex(item)).equals(1);
  });
  it('addedMap getter should return id:TestEntity map', async () => {
    const item = newItem()
    testRepository.addLocal(item)
    expect(testRepository.addedMap[5]).equals(item);
  });
});
