let express = require("express");
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let router = express.Router();
let path = require('path');
let middleware = require('../middleware');

let {BusinessController} = require('../models/business');
let {UserController} = require('../models/user');
let ServerError = require('../error');

// Get all businesses.
router.get('/all', jsonParser, (req, res) => {
    BusinessController.getAll()
        .then(businesses => {
            return res.status(200).json(businesses);
        })
        .catch(error => {
            res.statusMessage = error.message;
            return res.status(error.code).send();
        });
})

// Get a business with its id.
router.get('/:id', jsonParser, (req, res) => {
    let id = req.params.id;

    if (id == undefined) {
        res.statusMessage= "No id given to get a business";
        return res.status(406).send();
    }

    BusinessController.getById(id)
        .then(business => {
            if (business == null) {
                throw new ServerError(404, "ID not found");
            }
            return res.status(200).json(business);
        })
        .catch(error => {
            res.statusMessage = error.message;
            return res.status(error.code).send();
        })
});



router.get('/getByOwner/:id', (req, res) => {
    let id = req.params.owner;

    if (id == undefined) {
        res.statusMessage = "Owner id not provided";
        return res.status(406).send()
    }

    BusinessController.getByOwner(id)
    .then(business => {
        if (business == null) {
            throw new ServerError(404);
        }

        return res.status(200).json(business);

    })
    .catch(error => {
        console.log(error);
        if (error.code === 404) {
            res.statusMessage = "User not found with given id";
            return res.status(404).send();
        } else {
            res.statusMessage = "Database error";
            return res.status(500).send();
        }
    });

})
// Get a business with a owner's id.
router.get('/getBusinessByOwner/:id', jsonParser, (req, res) => {
    let id = req.params.id;

    let listBusinesses = BusinessController.getAll();
    console.log(listBusinesses);

    UserController.getById(id)
        .then(user => {
            if (user == null) {
                throw new ServerError(404);
            }

            let business;

            for (var i = 0; i < listBusinesses.length; i++) {
                if (listBusinesses[i].owner == id) {
                    business = listBusinesses[i];
                }
            }

            if (business != undefined) {
                return res.status(200).json(business);
            }
            
            return res.status(406).send();
        })
        .catch(error => {
            console.log(error);
            if (error.code === 404) {
                res.statusMessage = "The user doesn't exist";
                return res.status(404).send();
            } else {
                res.statusMessage = "Database error";
                return res.status(500).send();
            }
        });
});

// Create a business.
router.post('/create', jsonParser, (req, res) => {
    let name = req.body.name;
    let areas = req.body.areas;
    let width = req.body.width;
    let height = req.body.height;
    let safeDistance = req.body.safeDistance;
    let capacity = req.body.capacity;
    let owner = req.body.owner;

    if (name == undefined || areas == undefined || width == undefined || height == undefined || safeDistance == undefined || capacity == undefined || owner == undefined) {
        res.statusMessage = "Parameters to create business incomplete";
    	return res.status(406).send();
    }

    let newBusiness = {name, areas, width, height, safeDistance, capacity, owner};

    BusinessController.getByName(name)
        .then(business => {
            if (business != null) {
                throw new ServerError(409);
            }

            return BusinessController.create(newBusiness);
        })
        .then(nb => {
            return res.status(201).json(nb);
        })
        .catch(error => {
            console.log(error);
            if (error.code === 409) {
                res.statusMessage = "Business with given name already exists";
                return res.status(409).send();
            } else {
                res.statusMessage = "Database error";
                return res.status(500).send();
            }
        });
});

// Update a business.
router.put('/update/:id', jsonParser, (req, res) => {
    let id = req.params.id;

    if (id == undefined) {
        res.statusMessage = "No ID given to update a business"
    }

    BusinessController.getById(id)
        .then(business => {
            if (business == null) {
                throw new ServerError(404, "ID not found");
            }

            let {name, areas, width, height, safeDistance, capacity, owner} = req.body;

            if (name == undefined && areas == undefined && width == undefined && height == undefined && safeDistance == undefined && capacity == undefined && owner == undefined) {
                res.statusMessage = "No parameters to modify in update";
                return res.status(409).send();
            }

            let newBusiness = {};

            if (name != undefined) {
                newBusiness.name = name;
            }

            if (areas != undefined) {
                newBusiness.areas = areas;
            }

            if (width != undefined) {
                newBusiness.width = width;
            }

            if (height != undefined) {
                newBusiness.height = height;
            }

            if (safeDistance != undefined) {
                newBusiness.safeDistance = safeDistance;
            }

            if (capacity != undefined) {
                newBusiness.capacity = capacity;
            }

            if (owner != undefined) {
                newBusiness.owner = owner;
            }

            return BusinessController.update(id, newBusiness);
        })
        .then(nb => {
            return res.status(202).json(nb);
        })
        .catch(error => {
            console.log(error);
            if (error.code === 404) {
                res.statusMessage = "Business not found with given ID";
                return res.status(404).send();
            } else {
                res.statusMessage = "Database error";
                return res.status(500).send();
            }
        });
});

// Delete a business.
router.delete('/delete/:id', jsonParser, (req, res) => {
    let id = req.params.id;

    if (id == undefined) {
        res.statusMessage = "No ID given to delete a business";
        return res.status(406).send();
    }

    BusinessController.getById(id)
        .then(business => {
            if (business == null) {
                throw new ServerError(404, "Business not found");
            }

            return BusinessController.delete(id);
        })
        .then(business => {
            return res.status(200).send();
        })
        .catch(error => {
            console.log(error);
            if (error.code === 404) {
                res.statusMessage = "Business not found with given ID";
                return res.status(404).send();
            } else {
                res.statusMessage = "Database error";
                return res.status(500).send();
            }
        });
});

module.exports = router;