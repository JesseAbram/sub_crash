const {getApi, getKeypair, getTokenDecimals} = require('../utils/polkadot')

describe('Loaded transfers', () => {
    
    const amountToSend = "100000000000"
    const reruns = 4000

    it(`Transfer should make ${reruns} transfers of ${amountToSend}`, async () => {
        const api = await getApi()
        const alice = await getKeypair('//Alice')
        const tokenDecimals = getTokenDecimals(api)
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
        console.log(balanceOfCharlieAfter.toHuman())
        const calculatedBalanceOfCharlieAfter = (Number(balanceOfCharlieBefore.data.free.toString())) + (Number(amountToSend) * reruns)
        console.log({balanceOfCharlieAfter: balanceOfCharlieAfter.data.free.toString(), calculatedBalanceOfCharlieAfter: calculatedBalanceOfCharlieAfter.toString(), tokenDecimals})
        assert.equal(balanceOfCharlieAfter.data.free.toString(), calculatedBalanceOfCharlieAfter.toString(), "Charlie should have the proper balance")
    })

})