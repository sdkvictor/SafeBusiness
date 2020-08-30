let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let businessCollection = mongoose.Schema({
    name: {type: String},
    areas: {type: Number},
    width: {type: Number},
    height: {type: Number},
    safeDistance: {type: Number},
    capacity: {type: Number},
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'users'
    }
});

let Business = mongoose.model('businesses', businessCollection);

let BusinessController = {
    getAll: function() {
        return Business.find()
            .then(businesses => {
                return businesses;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    },
    getById: function(id) {
        return Business.findById(id)
            .then(business => {
                return business;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    },
    getByName: function(name) {
        return Business.findOne({name: name})
            .then(business => {
                return business;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    },
    getByOwner: function(owner) {
        return Business.find({owner: owner})
            .then(business => {
                return business;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    },
    create: function(newBusiness) {
        return Business.create(newBusiness)
            .then(nb => {
                return nb;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    },
    update: function(id, updatedBusiness) {
        return Business.findByIdAndUpdate(id, updatedBusiness)
            .then(ub => {
                return ub;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            })
    },
    delete: function(id) {
        return Business.findByIdAndRemove(id)
            .then(rb => {
                return rb;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            })
    }
}

module.exports = {BusinessController}