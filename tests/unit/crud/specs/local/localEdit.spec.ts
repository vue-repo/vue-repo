import {TestRepository} from '../../TestRepository';
import {expect} from 'chai';
import {add, list, newItem} from '../../mocks';
import ApiPathes from '../../ApiPathes';
import _cloneDeep from 'lodash/cloneDeep'

describe('crud repository: localEdit', () => {
  let testRepository = new TestRepository();
  beforeEach(() => {
    testRepository = new TestRepository();
  });
  it('editLocal should edit item in localList but not in list', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        editedName = 'editedName'
    item.name = editedName
    testRepository.editLocal(item)
    expect(testRepository.localListFirstItem.name).equals(editedName);
    expect(testRepository.listFirstItem.name).equals(list()[0].name);
  });
  it('deleteEdited should delete reset item state in localList', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        editedName = 'editedName'
    item.name = editedName
    testRepository.editLocal(item)
    testRepository.deleteEdited(item)
    expect(testRepository.listFirstItem).equals(testRepository.localListFirstItem)
  });
  it('deleteAllEdited should reset all edited items in localList', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        item2 = _cloneDeep(testRepository.listItemByIndex(1)),
        editedName = 'editedName'
    item.name = editedName
    item2.name = editedName
    testRepository
        .editLocal(item)
        .editLocal(item)
        .deleteAllEdited()
    expect(testRepository.listFirstItem).equals(testRepository.localListFirstItem)
    expect(testRepository.listItemByIndex(1)).equals(testRepository.localListItemByIndex(1))
  });
  it('hasEdited getter should be true if has local-edited items', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        editedName = 'editedName'
    item.name = editedName
    testRepository.editLocal(item)
    expect(testRepository.hasEdited).equals(true);
  });
  it('hasEdited getter should be false if hasnt local-edited items', async () => {
    expect(testRepository.hasEdited).equals(false);
  });
  it('isEdited getter should be true if item has in edited', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        editedName = 'editedName'
    item.name = editedName
    testRepository.editLocal(item)
    expect(testRepository.isEdited(item)).equals(true);
  });
  it('editedById getter should return edited item by id', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        editedName = 'editedName'
    item.name = editedName
    testRepository.editLocal(item)
    expect(testRepository.editedById(item.id)).equals(item);
  });
  it('isEditedById getter should be true if item has in edited', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        editedName = 'editedName'
    item.name = editedName
    testRepository.editLocal(item)
    expect(testRepository.isEditedById(item.id)).equals(true);
  });
  it('editedIndex getter should return correct index', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        editedName = 'editedName'
    item.name = editedName
    testRepository.editLocal(item)
    expect(testRepository.editedIndex(item)).equals(0);
  });
  it('editedMap getter should return id:TestEntity map', async () => {
    await testRepository.updateList();
    const item = _cloneDeep(testRepository.listFirstItem),
        editedName = 'editedName'
    item.name = editedName
    testRepository.editLocal(item)
    expect(testRepository.editedMap[1]).equals(item);
  });
});
