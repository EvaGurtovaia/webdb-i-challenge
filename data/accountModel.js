const db = require("./dbConfig.js");

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
};

function get() {
    return db("accounts");
}
function getById(id) {
    let query = db("accounts as a");
    query.where("a.id", id).first();
    return query.then(function(results) {
        return results;
    });
}

function insert(account) {
    return db("accounts")
        .insert(account)
        .then(([id]) => this.getById(id));
}

function update(id, changes) {
    return db("accounts")
        .where("id", id)
        .update(changes)
        .then(count => (count > 0 ? this.getById(id) : null));
}

function remove(id) {
    return db("accounts")
        .where("id", id)
        .del();
}
