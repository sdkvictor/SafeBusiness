let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let areaCollection = mongoose.Schema({
    amountPeople: {type: Number},
    width: {type: Number},
    height: {type: Number},
    isReserved: {type: Boolean},
    isUsable: {type: Boolean},
    business: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'businesses'
    }
});

let Area = mongoose.model('areas', areaCollection);

let AreaController = {
    getAll: function() {
        return Area.find()
            .then(areas => {
                return areas;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    },
    getById: function(id) {
        return Area.findById(id)
            .then(area => {
                return area;
            })
            .catch(erro => {
                throw new ServerError(500, "Database error");
            })
    },
    create: function(newArea) {
        return Area.create(newArea)
            .then(na => {
                return na;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    },
    update: function(id, updatedArea) {
        return Area.findByIdAndUpdate(id, updatedArea)
            .then(ua => {
                return ua;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    },
    delete: function(id) {
        return Area.findByIdAndRemove(id)
            .then(ra => {
                return ra;
            })
            .catch(error => {
                throw new ServerError(500, "Database error");
            });
    }
}

module.exports = {AreaController}