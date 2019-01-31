It's modular, easy-scalable, class-based, reactive state-management implementation, written on typescript. And it has several base classes from the box which will simplify your work and significantly reduce the routine.
https://vue-repo.github.io/vue-repo/

## Installation

### NPM
```sh
npm install @vue-repo/vue-repo --save
```

### Install typescript and allow decorators compiling
Note that if you don't want to write on typescript - you can use it only for compiling decorators. But we recommend you to use typescript because it gives you a super-power. Any changes in your app become more easy and reliable. Babel setup instruction will be added soon.

```javascript
 // -- Typescript-based configuration --

// install
npm i --save-dev typescript ts-loader

// tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "outDir": "./js"
    }
}

// webpack.conf.js
{
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts|.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    }
}
```


## Usage

```javascript
 // -- Case 1 --
        // Get from server list of tasks and save it to repo
        await taskRepo.updateList()
        taskRepo.list // list of tasks

        // -- Case 2 --
        await taskRepo.updateList()
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

        // -- Case 6 --
        await taskRepo.updateList()
        // Activate item by index
        taskRepo.activateByIndex(2)
        taskRepo.active // {id: 2, name: 'Name'}
        taskRepo.listItemByIndex(2) // {id: 2, name: 'Name'}
        taskRepo.isActiveChangedAfterActivation // false
        // Edit active item
        taskRepo.active.name = 'Edited name'
        taskRepo.active // {id: 2, name: 'Edited name'}
        taskRepo.listItemByIndex(2) // {id: 2, name: 'Edited name'}
        taskRepo.isActiveChangedAfterActivation // true
        taskRepo.activeInitialCopy // {id: 2, name: 'Name'}
        // Reset active item to last saved state
        taskRepo.resetActiveToInitialState()
        taskRepo.active // {id: 2, name: 'Name'}
        taskRepo.listItemByIndex(2) // {id: 2, name: 'Name'}
        taskRepo.isActiveChangedAfterActivation // false
        ```
