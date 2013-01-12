require('ext-server');

Ext.application({
    port : '8888',
    db: {
        "default": {
            adapter : 'mysql',
            host    : '127.0.0.1',
            user    : 'test',
            password: 'test',
            database: 'sec_db',
            port    : '3306'
        }
    }
});
