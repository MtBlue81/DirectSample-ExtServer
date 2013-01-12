// me.end()はなにに使うんだっけ？
module.exports = {

    useTable: 'memberlist',

    privateHandler: [
        '$addRec',
        '$updateRec',
        '$removeRec',
        '$lastId',
        '$error',
        // ここからModuleのやつ
        // 以下3つがなんか特殊？
        "getConnName",
        "self",
        "configClass"
    ],

    // read action
    getAll: function(param, cb) {
        var me = this;

        me.query('SELECT * FROM memberlist', function(err, rs) {
            me.$error(err);
            if (rs) {
                cb({
                    success: true,
                    data: rs
                });
            }
        });
    },

    // create action
    addRec: function(params, cb) {
        var me = this,
            records = [], l;

        if (!Ext.isArray(params)) {
            params = [params];
        }
        l = params.length;
        Ext.iterate(params, function (param) {
            me.$addRec(param, function(record) {
                records.push(record);
                if (records.length === l) {
                    cb(records);
                }
            });
        });
    },

    $addRec: function(param, cb) {
        var me =this, o;
        param = param || {};
        cb = cb || Ext.emptyFn;

        o = {
            section : param.section
        };
        me.insert(o, function(err) {
            // idを付加したオブジェクトを返す
            me.$error(err);
            me.$lastId(function(ret) {
                o.id = ret;
                cb(o);
            });
        });
    },

    $lastId: function(cb) {
        var me = this;
        cb = cb || Ext.emptyFn;

        me.query('SELECT LAST_INSERT_ID()', function(err, ret) {
            me.$error(err);
            cb(ret);
        });
    },

    // update action
    updateRec: function(params, cb) {
        var me = this,
            records = [], l;

        if (!Ext.isArray(params)) {
            params = [params];
        }
        l = params.length;
        Ext.iterate(params, function(param) {
            me.$updateRec(param, function(record) {
                records.push(record);
                if (records.length === l) {
                    cb({data: records});
                }
            });
        });

    },

    $updateRec: function(param, cb) {
        var o, me = this;
        param = param || {};
        cb = cb || Ext.emptyFn;

        o = Ext.clone(param);
        delete o.id;
        delete o.condition; //enum型がダメ？
        o['$where'] = {id: param.id};

        me.update(o, function(err) {
            me.$error(err);
            cb(param);
        });
    },

    // delete action
    removeRec: function(params, cb) {
        var me = this,
            records = [], l;

        if (!Ext.isArray(params)) {
            params = [params];
        }
        l = params.length;
        Ext.iterate(params, function(param) {
            me.$removeRec(param.id, function(id) {
                records.push(id);
                if (records.length === l) {
                    cb(records);
                }
            });
        });
    },

    $removeRec: function(id, cb) {
        var me = this,
            o = {id: id};
        cb = cb || Ext.emptyFn;

        me.remove(o, function(err) {
            me.$error(err);
            cb(id);
        });
    },

    $error: function(err) {
        if (err) {
            console.error(err);
        }
    }

};
