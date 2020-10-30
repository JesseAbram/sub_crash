const {getApi, getKeypair} = require('../utils/polkadot')

describe('Loaded transfers', async () => {
    
    const amountToSend = "100000000000"
    const reruns = 1000
    let alice 
    let api

    it(`Transfer should make ${reruns} transfers of ${amountToSend}`, async () => {
        api = await getApi()
        alice = await getKeypair('//Alice')
        const nonce = await api.rpc.system.accountNextIndex(alice.address);
        const balanceOfCharlieBefore = await api.query.system.account(charliePair.address)
        let i = 0
        let tx
        while (i < reruns) {
            const nextNonce = Number(nonce) + i 
            tx = await api.tx.balances.transfer(charliePair.address, amountToSend).sign(alice, {nonce: nextNonce})
            await tx.send()
            i++
        }
        await passes(tx, 'Send', alicePair);
        const balanceOfCharlieAfter = await api.query.system.account(charliePair.address)
        const calculatedBalanceOfCharlieAfter = (Number(balanceOfCharlieBefore.data.free.toString())) + (Number(amountToSend) * reruns)
        assert.equal(balanceOfCharlieAfter.data.free.toString(), calculatedBalanceOfCharlieAfter.toString(), "Charlie should have the proper balance")
    })

    it(`templatePallet should make ${reruns} txs`, async () => {
        // api = await getApi()
        // alice = await getKeypair('//Alice')
        const nonce = await api.rpc.system.accountNextIndex(alice.address);
        let i = 0
        let tx
        while (i < reruns) {
            const nextNonce = Number(nonce) + i 
            tx = await api.tx.templateModule.doSomething(nextNonce).sign(alice, {nonce: nextNonce})
            await tx.send()
            i++
        }
        await passes(tx, 'doSomething', alicePair);
        const nonceAfter = await api.rpc.system.accountNextIndex(alice.address);
        const calculatedNonce = Number(nonce) + i
        const calculatedSomethingAfter = Number(nonce) + reruns - 1
        const somethingAfter = await api.query.templateModule.something()
        assert.equal(somethingAfter.toString(), calculatedSomethingAfter.toString(), "something should have been incremented correctly")
        assert.equal(nonceAfter.toString(), calculatedNonce.toString(), "all transactions should have fired")
    })
})