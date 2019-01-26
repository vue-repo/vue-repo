import {TestRepository} from '../TestRepository';
import {expect} from 'chai';
import {list, newItem} from '../mocks';
import ApiPathes from '../ApiPathes';
import {TestEntity} from '../TestEntity';

describe('crud repository: active', () => {
  let testRepository = new TestRepository();
  beforeEach(() => {
    testRepository = new TestRepository();
  });
  it('should set active instance when call activate method', async () => {
    await testRepository.updateList()
    testRepository.activate(testRepository.localListFirstItem)
    expect(testRepository.active).equals(testRepository.localListFirstItem)
  });
  it('should set first instance to active when call activateFirst method', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    expect(testRepository.active).equals(testRepository.localListFirstItem)
  });
  it('should set last instance to active when call activateLast method', async () => {
    await testRepository.updateList()
    testRepository.activateLast()
    expect(testRepository.active).equals(testRepository.localListLastItem)
  });
  it('should activate correct instance when call activateByIndex method', async () => {
    await testRepository.updateList()
    testRepository.activateByIndex(1)
    expect(testRepository.active).equals(testRepository.localListItemByIndex(1))
  });
  it('should clear active when called deactivate method', async () => {
    await testRepository.updateList()
    testRepository
        .activateFirst()
        .deactivate()
    expect(testRepository.active).is.undefined
  });
  it('should activate 2 instead of 1 on activateInstead(1,2)', async () => {
    await testRepository.updateList()
    const secondItem = testRepository.localListItemByIndex(1)
    testRepository
        .activateFirst()
        .activateInstead(testRepository.localListFirstItem, secondItem)
    expect(testRepository.active).equals(secondItem)
  });
  it('should activate 2 instead of 1 on activateInsteadById(1,2)', async () => {
    await testRepository.updateList()
    const secondItem = testRepository.localListItemByIndex(1)
    testRepository
        .activateFirst()
        .activateInsteadById(testRepository.localListFirstItem.id, secondItem)
    expect(testRepository.active).equals(secondItem)
  });
  it('should deactivate if active on deactivateIfActive()', async () => {
    await testRepository.updateList()
    testRepository
        .activateFirst()
        .deactivateIfActive(testRepository.localListFirstItem)
    expect(testRepository.active).is.undefined
  });
  it('should not deactivate if not active on deactivateIfActive()', async () => {
    await testRepository.updateList()
    testRepository
        .activateFirst()
        .deactivateIfActive(testRepository.localListItemByIndex(1))
    expect(testRepository.active).equals(testRepository.localListFirstItem)
  });
  it('should set active item copy when activate', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    expect(testRepository.activeInitialCopy).deep.equals(testRepository.active)
  });
  it('should clear active item copy when deactivate', async () => {
    await testRepository.updateList()
    testRepository
        .activateFirst()
        .deactivate()
    expect(testRepository.activeInitialCopy).is.undefined
  });
  it('should active item copy should not change when active changing', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    testRepository.active.name = 'newName'
    expect(testRepository.activeInitialCopy).not.deep.equals(testRepository.active)
  });
  it('should reset active to initial state when call resetActiveToInitialState()', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    testRepository.active.name = 'newName'
    testRepository.resetActiveToInitialState()
    expect(testRepository.active).deep.equals(testRepository.activeInitialCopy)
  });
  it('isActiveChangedAfterActivation getter should be false if active is deep equals to activeInitialCopy', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    expect(testRepository.isActiveChangedAfterActivation).deep.equals(false)
  });
  it('isActiveChangedAfterActivation getter should be true if active is not deep equals to activeInitialCopy', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    testRepository.active.name = 'newName'
    expect(testRepository.isActiveChangedAfterActivation).deep.equals(true)
  });
  it('hasActive getter should be false if there is no active', async () => {
    await testRepository.updateList()
    expect(testRepository.hasActive).equals(false)
  });
  it('hasActive getter should be true if there is active', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    expect(testRepository.hasActive).equals(true)
  });
  it('isActive(1) getter should be true if 1 is active', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    expect(testRepository.isActive(testRepository.first)).equals(true)
  });
  it('isActive(1) getter should be false if 1 is not active', async () => {
    await testRepository.updateList()
    testRepository.activateLast()
    expect(testRepository.isActive(testRepository.first)).equals(false)
  });
  it('isActive(1) getter should be true if active is empty', async () => {
    await testRepository.updateList()
    expect(testRepository.isActive(testRepository.first)).equals(false)
  });
  it('isActiveNew getter should be true if active is in added', async () => {
    await testRepository.updateList()
    const item = newItem()
    testRepository
        .addLocal(item)
        .activate(item)
    expect(testRepository.isActiveNew).equals(true)
  });
  it('isActiveNew getter should be false if active is not in added', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    expect(testRepository.isActiveNew).equals(false)
  });
  it('isActiveNew getter should be false if active is empty', async () => {
    await testRepository.updateList()
    expect(testRepository.isActiveNew).equals(false)
  });
  it('isActiveById getter should be true if active has same id', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    expect(testRepository.isActiveById(testRepository.first.id)).equals(true)
  });
  it('isActiveById getter should be false if active hasnt same id', async () => {
    await testRepository.updateList()
    testRepository.activateFirst()
    expect(testRepository.isActiveById(testRepository.last.id)).equals(false)
  });
  it('isActiveById getter should be false if active is empty', async () => {
    await testRepository.updateList()
    expect(testRepository.isActiveById(testRepository.first.id)).equals(false)
  });
});
