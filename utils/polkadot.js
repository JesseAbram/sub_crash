const { ApiPromise, WsProvider } = require('@polkadot/api')
const {Keyring} = require('@polkadot/keyring')

//TOD add WS to config and custom types to config
const getApi = async () => {
    const wsProvider = new WsProvider(`ws://localhost:9944/`);
    const api = await ApiPromise.create({ provider: wsProvider,  types: {"Address": "AccountId","LookupSource": "AccountId"}});
    await api.isReady;
    return api
}

const getKeypair = (mneumonic) => {
    const keyring = new Keyring({type: 'sr25519'});
    return keyring.addFromUri(mneumonic);
  }
  
const getTokenDecimals = (api) => {
    return api.registry.chainDecimals;
  }
const formatBalance = () => {
    
}

module.exports = {
    getApi,
    getKeypair,
    getTokenDecimals
}