import {TestRepository} from '../TestRepository';
import {expect} from 'chai';
import {list} from '../mocks';
import ApiPathes from '../ApiPathes';
import {TestEntity} from '../TestEntity';

describe('crud repository: list', () => {
  let testRepository = new TestRepository();
  beforeEach(() => {
    testRepository = new TestRepository();
  });
  it('should save api definition', () => {
    expect(testRepository.api).deep.equals(ApiPathes.test)
  });
  it('should not have list initially', async () => {
    expect(testRepository.list).is.undefined;
  });
  it('should set list correctly', async () => {
    await testRepository.setList(list());
    expect(testRepository.list).is.deep.equals(list());
  });
  it('should clear list correctly', async () => {
    await testRepository.setList(list());
    expect(testRepository.list).is.deep.equals(list());
    testRepository.clearList()
    expect(testRepository.list).is.undefined;
  });
  it('should update list correctly', async () => {
    await testRepository.updateList();
    expect(testRepository.list).is.deep.equals(list());
  });
  it('hasList getter should be equals to false if hasnt list', () => {
    expect(testRepository.hasList).equals(false);
  });
  it('hasList getter should be equals to true if has list', async () => {
    await testRepository.updateList();
    expect(testRepository.hasList).equals(true);
  });
  it('isListEmpty getter should be false if list has values', async () => {
    await testRepository.updateList();
    expect(testRepository.isListEmpty).equals(false);
  });
  it('isListEmpty getter should be true if list hasnt values', async () => {
    testRepository.setList([]);
    expect(testRepository.isListEmpty).equals(true);
  });
  it('listItemByIndex getter should return correct index', async () => {
    await testRepository.updateList();
    expect(testRepository.listItemByIndex(1)).equals((testRepository.list as TestEntity[])[1]);
  });
  it('listItemById getter should return correct object', async () => {
    await testRepository.updateList();
    expect(testRepository.listItemById(2)).equals((testRepository.list as TestEntity[])[1]);
  });
  it('listIndex getter should return correct index', async () => {
    await testRepository.updateList();
    expect(testRepository.listIndex(testRepository.listItemByIndex(1))).equals(1);
  });
  it('listIndexById getter should return correct index', async () => {
    await testRepository.updateList();
    expect(testRepository.listIndexById(testRepository.listItemByIndex(1).id)).equals(1);
  });
  it('listMap getter should return id:TestEntity map', async () => {
    await testRepository.updateList();
    expect(testRepository.listMap[1]).equals(testRepository.listItemByIndex(0));
    expect(testRepository.listMap[2]).equals(testRepository.listItemByIndex(1));
    expect(testRepository.listMap[3]).equals(testRepository.listItemByIndex(2));
  });
  it('listIds getter should return array of ids', async () => {
    await testRepository.updateList();
    expect(testRepository.listIds).deep.equals(list().map(d => d.id));
  });
  it('listLength getter should return correct length of list', async () => {
    await testRepository.updateList();
    expect(testRepository.listLength).equals(list().length);
  });
  it('listLastIndex getter should return correct last index in list', async () => {
    await testRepository.updateList();
    expect(testRepository.listLastIndex).equals(list().length -1);
  });
  it('listLastItem getter should return correct last item in list', async () => {
    await testRepository.updateList();
    expect(testRepository.listLastItem).equals((testRepository.list as TestEntity[])[list().length - 1]);
  });
  it('listFirstItem getter should return correct first item in list', async () => {
    await testRepository.updateList();
    expect(testRepository.listFirstItem).equals((testRepository.list as TestEntity[])[0]);
  });
});
