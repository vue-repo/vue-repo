It's modular, easy-scalable, class-based, reactive state-management implementation, written on typescript. And it has several base classes from the box which will simplify your work and significantly reduce the routine.

```javascript
// -- Case 1 --
// Get from server list of tasks and save it to repo
await taskRepo.updateList()
taskRepo.list // list of tasks

// -- Case 2 --
// Activate first task
taskRepo.activateFirst()
taskRepo.hasActive // true
taskRepo.isActive(taskRepo.list[0]) // true
taskRepo.isActive(taskRepo.list[3]) // false
// Edit name of active task
taskRepo.active.name = 'edited'
// Save to server edited task and change local object by response
await taskRepo.editActive()

// -- Case 3 --
// Add new task on server and local
await taskRepo.add({ name: 'new-task' })

// -- Case 4 --
// Add new task local
taskRepo.addLocal({ name: 'new-unsaved-task' })
// Change its name
taskRepo.first.name = 'new-saved-task'
// Save to server and change object by response
await taskRepo.flushAdded(taskRepo.first)

// -- Case 5 --
// Add new task local
taskRepo.addLocal({ name: 'new-unsaved-task' })
// Delete all local-added tasks
taskRepo.deleteAllAdded()
        ```
