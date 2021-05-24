import _forEach from 'lodash/forEach';
import Vue from '../../node_modules/vue';
import _uniq from 'lodash/uniq'
import {CombinedVueInstance} from '../../node_modules/vue/types/vue';


const GetPropertyDescriptor = (o: object, PropName: string): PropertyDescriptor | undefined => {
  if (o !== undefined) {
    return o.hasOwnProperty(PropName) ?
      Object.getOwnPropertyDescriptor(o, PropName) :
      GetPropertyDescriptor(Object.getPrototypeOf(o), PropName);
  }
  return undefined
};

export class StoreModule {
  private _state: any = {}
  private _mutations: any = {}
  private _actions: any = {}
  private _getters: any = {}
  private _vm: CombinedVueInstance<Vue, any, any, any, any> | undefined

  constructor () {
    _forEach(this.getStatePropsNames(), propName => this._state[propName] = (this as any)[propName])
    _forEach(this.getMutationsNames(), mutName => this._mutations[mutName] = (this as any)[mutName])
    _forEach(this.getActionsNames(), actionName => this._actions[actionName] = (this as any)[actionName])
    _forEach(this.getGettersNames(), getterName => {
      const propDescriptor = GetPropertyDescriptor(this, getterName)
      if (propDescriptor !== undefined && propDescriptor.get !== undefined) {
        this._getters[getterName] = propDescriptor.get.bind(this)
      }
    })
    this.initVm()
    this.initStateProxies()
    this.initGettersProxies()
  }
  get state (): any {
    return this._vm === undefined ? undefined : this._vm._data._state
  }

  private initStateProxies () {
    _forEach(this.getStatePropsNames(), propName => {
      Object.defineProperty(this, propName, {
        get () {
          return this._state[propName]
        },
        set (val) {
          this._state[propName] = val
        }
      })
    })
  }
  private initGettersProxies () {
    _forEach(this.getGettersNames(), getterName => {
      Object.defineProperty(this, getterName, {
        get () {
          return this._vm[getterName]
        }
      })
    })
  }
  private collectValuesFromAllPrototypes (obj: any, propName: string): any {
    if (!obj[propName]) return []
    const proto = Object.getPrototypeOf(obj)
    return [
      ...this.collectValuesFromAllPrototypes(proto, propName),
      ...(obj.hasOwnProperty(propName) ? obj[propName] : [])
    ]
  }
  private getStatePropsNames () {
    return _uniq<string>(this.collectValuesFromAllPrototypes(this, 'statePropsNames'))
  }
  private getMutationsNames () {
    return _uniq<string>(this.collectValuesFromAllPrototypes(this, 'mutationsNames'))
  }
  private getActionsNames () {
    return _uniq<string>(this.collectValuesFromAllPrototypes(this, 'actionsNames'))
  }
  private getGettersNames () {
    return _uniq<string>(this.collectValuesFromAllPrototypes(this, 'gettersNames'))
  }
  private getGlobalGettersNames () {
    return (this as any).globalGettersNames || []
  }
  private initVm () {
    this._vm = new Vue({
      data: {_state: this._state},
      computed: this._getters
    })
  }
  public registerStates (...states) {
    console.error(states)
  }
}
