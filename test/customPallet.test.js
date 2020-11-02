describe('custom pallet', () => {
    it('tests a custom pallet', async () => {
        const somethingStored = await halva.polkadot.query.templateModule.something()
        const newStorage = Number(somethingStored.toString()) + 1
        const tx = await halva.polkadot.tx.templateModule.doSomething(newStorage)
        await passes(tx, 'doSomething', alicePair);
        const somethingStoredAfter = await halva.polkadot.query.templateModule.something()
        assert.equal(somethingStoredAfter.toString(), newStorage.toString())
    });
});