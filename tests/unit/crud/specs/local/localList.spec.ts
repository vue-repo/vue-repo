import {TestRepository} from '../../TestRepository';
import {expect} from 'chai';
import {TestEntity} from '../../TestEntity';
import {list} from '../../mocks';

describe('crud repository: localList', () => {
  let testRepository = new TestRepository();
  beforeEach(() => {
    testRepository = new TestRepository();
  });
  it('localList should be empty initially', async () => {
    expect(testRepository.localList).is.empty;
  });
  it('localList should be equals to list after first list updating', async () => {
    await testRepository.updateList();
    expect(testRepository.localList).is.deep.equals(testRepository.list);
  });
  it('isLocalListEmpty getter should be false if list has values', async () => {
    await testRepository.updateList();
    expect(testRepository.isLocalListEmpty).equals(false);
  });
  it('isLocalListEmpty getter should be true if list hasnt values', async () => {
    testRepository.setList([]);
    expect(testRepository.isLocalListEmpty).equals(true);
  });
  it('localListItemByIndex getter should return correct index', async () => {
    await testRepository.updateList();
    expect(testRepository.localListItemByIndex(1)).equals((testRepository.list as TestEntity[])[1]);
  });
  it('localListItemById getter should return correct object', async () => {
    await testRepository.updateList();
    expect(testRepository.localListItemById(2)).equals((testRepository.list as TestEntity[])[1]);
  });
  it('localListIndex getter should return correct index', async () => {
    await testRepository.updateList();
    expect(testRepository.localListIndex(testRepository.localListItemByIndex(1))).equals(1);
  });
  it('localListIndexById getter should return correct index', async () => {
    await testRepository.updateList();
    expect(testRepository.localListIndexById(testRepository.localListItemByIndex(1).id)).equals(1);
  });
  it('localListMap getter should return id:TestEntity map', async () => {
    await testRepository.updateList();
    expect(testRepository.localListMap[1]).equals(testRepository.localListItemByIndex(0));
    expect(testRepository.localListMap[2]).equals(testRepository.localListItemByIndex(1));
    expect(testRepository.localListMap[3]).equals(testRepository.localListItemByIndex(2));
  });
  it('localListIds getter should return array of ids', async () => {
    await testRepository.updateList();
    expect(testRepository.localListIds).deep.equals(list().map(d => d.id));
  });
  it('localListLength getter should return correct length of localList', async () => {
    await testRepository.updateList();
    expect(testRepository.localListLength).equals(list().length);
  });
  it('localListLastIndex getter should return correct last index in localList', async () => {
    await testRepository.updateList();
    expect(testRepository.localListLastIndex).equals(list().length -1);
  });
  it('localListLastItem getter should return correct last item in localList', async () => {
    await testRepository.updateList();
    expect(testRepository.localListLastItem).equals((testRepository.list as TestEntity[])[list().length - 1]);
  });
  it('localListFirstItem getter should return correct first item in localList', async () => {
    await testRepository.updateList();
    expect(testRepository.localListFirstItem).equals((testRepository.list as TestEntity[])[0]);
  });
});
