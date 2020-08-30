let express = require("express");
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let router = express.Router();
let path = require('path');
let middleware = require('../middleware');

let {AreaController} = require('../models/area');
let ServerError = require('../error');

// Get all areas.
router.get('/all', jsonParser, (req, res) => {
	AreaController.getAll()
    	.then(areas => {
          	return res.status(200).json(areas);
      	})
      	.catch(error => {
          	res.statusMessage = error.message;
          	return res.status(error.code).send();
      	})
});

// Get an area with its id.
router.get('/:id', jsonParser, (req, res) => {
    let id = req.params.id;

    if (id == undefined) {
        res.statusMessage = "No id given to get an area";
        return res.status(406).send();
    }

    AreaController.getById(id)
        .then(area => {
            if (area == null) {
                throw new ServerError(404, "ID not found");
            }
            return res.status(200).json(area);
        })
        .catch(error => {
            res.statusMessage = error.message;
            return res.status(error.code).send();
        });
});

// Create an area.
router.post('/create', jsonParser, (req, res) => {
    let amountPeople = req.body.amountPeople;
    let width = req.body.width;
    let height = req.body.height;
    let isReserved = req.body.isReserved;
    let isUsable = req.body.isUsable;
    let business = req.body.business;

    if (amountPeople == undefined || width == undefined || height == undefined || isReserved == undefined || isUsable == undefined || business == undefined) {
        res.statusMessage = "Parameters to create an area incomplete";
        return res.status(406).send();
    }

    let newArea = {
        amountPeople: amountPeople, 
        width: width, 
        height: height, 
        isReserved: isReserved, 
        isUsable: isUsable,
        business: business
    }

    AreaController.create(newArea)
        .then(ca => {
            return res.status(201).json(ca);
        })
        .catch(error => {
            res.statusMessage = error.message;
            return res.status(error.code).send();
        })
});

// Update all areas.
router.put('/updateAll', jsonParser, async (req, res) => {
    let amountPeople, width, height, isReserved, isUsable;

    amountPeople = req.body.amountPeople;
    width = req.body.width;
    height = req.body.height;
    isReserved = req.body.isReserved;
    isUsable = req.body.isUsable;

    if (amountPeople == undefined && width == undefined && height == undefined && isReserved == undefined && isUsable == undefined) {
        res.statusMessage = "No parameters to modify in update";
        return res.status(406).send();
    }

    AreaController.updateMany(
        {}, 
        {$set: 
            {amountPeople: amountPeople,
            width: width,
            height: height,
            isReserved: isReserved,
            isUsable: isUsable}
        }
    )
});

// Delete all areas.
router.delete('/deleteAll', jsonParser, (req, res) => {
    AreaController.deleteMany({})
});

module.exports = router;