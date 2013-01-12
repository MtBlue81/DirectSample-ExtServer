Ext.define('MyApp.store.Members', {

    extend : 'Ext.data.Store',

    autoLoad : true,

    autoSync : true,

    model  : 'MyApp.model.Member',

    proxy  : {
        type : 'direct',
        api  : {
            create  : Members.addRec,
            read    : Members.getAll,
            update  : Members.updateRec,
            destroy : Members.removeRec
        },
        reader : {
            type : 'json',
            root : 'data',
            successProperty : 'success'
        }
    }
});
