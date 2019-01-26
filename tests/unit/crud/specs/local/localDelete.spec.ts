import {TestRepository} from '../../TestRepository';
import {expect} from 'chai';
import {add, list, newItem} from '../../mocks';
import ApiPathes from '../../ApiPathes';
import _cloneDeep from 'lodash/cloneDeep'

describe('crud repository: localDelete', () => {
  let testRepository = new TestRepository();
  beforeEach(() => {
    testRepository = new TestRepository();
  });
  it('deleteLocal should delete item from localList but not in list', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository.deleteLocal(item)
    expect(testRepository.localListFirstItem).not.equals(item);
    expect(testRepository.listFirstItem).equals(item);
  });
  it('deleteLocal(1) should clear active if 1 is active', async () => {
    await testRepository.updateList();
    testRepository
        .activateFirst()
        .deleteLocal(testRepository.first)
    expect(testRepository.active).is.undefined;
  });
  it('deleteLocal(1) should not clear active if 1 is not active', async () => {
    await testRepository.updateList();
    testRepository
        .activateLast()
        .deleteLocal(testRepository.first)
    expect(testRepository.active).equals(testRepository.last);
  });
  it('deleteActiveLocal should delete active item from localList but not in list', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository
        .activateFirst()
        .deleteActiveLocal()
    expect(testRepository.localListFirstItem).not.equals(item);
    expect(testRepository.listFirstItem).equals(item);
  });
  it('deleteDeleted should delete reset item state in localList', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository
        .deleteLocal(item)
        .deleteDeleted(item)
    expect(testRepository.localListFirstItem).equals(item);
  });
  it('deleteAllDeleted should reset all edited items in localList', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem,
        item2 = testRepository.listItemByIndex(1)
    testRepository
        .deleteLocal(item)
        .deleteLocal(item2)
        .deleteAllDeleted()
    expect(testRepository.localListFirstItem).equals(item);
    expect(testRepository.listItemByIndex(1)).equals(item2);
  });
  it('hasDeleted getter should be true if has local-edited items', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository.deleteLocal(item)
    expect(testRepository.hasDeleted).equals(true);
  });
  it('hasDeleted getter should be false if hasnt local-edited items', async () => {
    expect(testRepository.hasDeleted).equals(false);
  });
  it('isDeleted getter should be true if item has in edited', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository.deleteLocal(item)
    expect(testRepository.isDeleted(item)).equals(true);
  });
  it('deletedById getter should return edited item by id', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository.deleteLocal(item)
    expect(testRepository.deletedById(item.id)).equals(item);
  });
  it('isDeletedById getter should be true if item has in edited', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository.deleteLocal(item)
    expect(testRepository.isDeletedById(item.id)).equals(true);
  });
  it('deletedIndex getter should return correct index', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository.deleteLocal(item)
    expect(testRepository.deletedIndex(item)).equals(0);
  });
  it('deletedMap getter should return id:TestEntity map', async () => {
    await testRepository.updateList();
    const item = testRepository.listFirstItem
    testRepository.deleteLocal(item)
    expect(testRepository.deletedMap[1]).equals(item);
  });
});
