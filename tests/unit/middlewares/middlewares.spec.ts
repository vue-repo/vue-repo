import {
  addActionMiddleware,
  addGetterMiddleware,
  addMutationMiddleware,
  addStateMiddleware
} from '../../../src/StoreModule/middlewares';
import {
  Action,
  Getter,
  IActionOptions,
  IGetterOptions,
  IMutationOptions, IStateOptions,
  Mutation,
  State
} from '../../../src/StoreModule/annotations';
import {expect} from 'chai';
import {StoreModule} from '../../../src/StoreModule/StoreModule';
import {Api} from './Api';


declare module '../../../src/StoreModule/annotations' {
  export interface IMutationOptions {
    mutOpt: string
  }
  export interface IGetterOptions {
    getOpt: string
  }
  export interface IActionOptions {
    actOpt: string
  }
  export interface IStateOptions {
    statOpt: string
  }
}

describe('store middlewares tests', () => {
  const mutOptVal = 'mutOptVal',
    getOptVal = 'getOptVal',
    actOptVal = 'actOptVal',
    statOptVal = 'statOptVal'
  it('should add middlewares and run it with correct params in annotation function', async () => {
    const promise = Promise.all([
      new Promise(resolve => {
        addMutationMiddleware(
            (options, target, propertyKey, descriptor) => {
              expect(options).is.not.undefined
              expect((options as IMutationOptions).mutOpt).equals(mutOptVal)
            },
            (options, target, propertyKey, descriptor) => {
              expect(options).exist
              expect(target).exist
              expect(propertyKey).exist
              expect(descriptor).exist
              resolve()
            }
        )
      }),
      new Promise(resolve => {
        addGetterMiddleware(
            (options, target, propertyKey, descriptor) => {
              expect(options).is.not.undefined
              expect((options as IGetterOptions).getOpt).equals(getOptVal)
            },
            (options, target, propertyKey, descriptor) => {
              expect(options).exist
              expect(target).exist
              expect(propertyKey).exist
              expect(descriptor).exist
              resolve()
            }
        )
      }),
      new Promise(resolve => {
        addActionMiddleware(
            (options, target, propertyKey, descriptor) => {
              expect(options).is.not.undefined
              expect((options as IActionOptions).actOpt).equals(actOptVal)
            },
            (options, target, propertyKey, descriptor) => {
              expect(options).exist
              expect(target).exist
              expect(propertyKey).exist
              expect(descriptor).exist
              resolve()
            }
        )
      }),
      new Promise(resolve => {
        addStateMiddleware(
            (options, target, propertyKey) => {
              expect(options).is.not.undefined
              expect((options as IStateOptions).statOpt).equals(statOptVal)
            },
            (options, target, propertyKey) => {
              expect(options).exist
              expect(target).exist
              expect(propertyKey).exist
              resolve()
            }
        )
      })
    ])
    class TestRepository extends StoreModule {
      @State({statOpt: statOptVal})
      public someState: any
      @Mutation({mutOpt: mutOptVal})
      public setSomeState (some: string) {
        this.someState = some
      }
      @Action({actOpt: actOptVal})
      public async updateSomeState () {
        await Api.send()
        this.setSomeState('bla')
      }
      @Getter({getOpt: getOptVal})
      public get computedSomeState () {
        return 'comp' + this.someState
      }
    }
    new TestRepository()
    await promise
  });
});
