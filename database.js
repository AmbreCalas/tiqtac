"use strict";
/* Database import and treatment*/

var moment = require('moment');
var Sequelize = require('sequelize');

// Connect to MySql database
var sequelize = new Sequelize('app_data', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',

	pool: {
		max: 10,
		min: 0,
		idle: 100000
	},

	define: {
		timestamps: false
	}
});

// Table 'pi'
var pi_table = sequelize.define('pi_table', {
  pi_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  pi_number: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true
  },
  coeff1: {
    type: Sequelize.DECIMAL(6,3)
  },
  coeff2: {
    type: Sequelize.DECIMAL(6,3)
  },
  pi_beginning_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  pi_end_date: {
    type: Sequelize.DATE,
    defaultValue: this.pi_beginning_date + 21
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  tableName: 'pi'
});

// Table 'fbl'
var fbl_table = sequelize.define('fbl_table', {
  fbl_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  fbl_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fbl_description: {
    type: Sequelize.TEXT
  },
  points: {
    type: Sequelize.INTEGER.UNSIGNED
  },
  risk: {
    type: Sequelize.INTEGER.UNSIGNED
  },
  md: {
    type: Sequelize.INTEGER.UNSIGNED
  },
  estimate_md: {
    type: Sequelize.INTEGER.UNSIGNED
  },
  probability: {
    type: Sequelize.DECIMAL(3,2)
  },
  creation_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  coeff1: {
    type: Sequelize.DECIMAL(6,3)
  },
  coeff2: {
    type: Sequelize.DECIMAL(6,3)
  },
  pi_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: pi_table,
      key: 'pi_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  tableName: 'fbl'
});


/* DATABASE CONSULTATION (GET) */
// Return all pis
exports.pi_all = function () {
	var result = [];
	return pi_table.all().then(function (res) {
		for (var i = 0; i < res.length; i++) {
			result[i] = res[i].dataValues;
		}
		return result;
	})
};

// Return a pi by number
exports.pi_by_number = function(piNumber) {
  return pi_table.findOne({where: {pi_number: piNumber}}).then(function (res) {
    return res.dataValues;
  });
};

// Return fbl list for a pi
exports.fbl_all = function(piNumber) {
  var result = [];
  return pi_table.findOne({where: {pi_number: piNumber}}).then(function(pi) {
    return fbl_table.findAll({where: {pi_id: pi.pi_id}}).then(function (res) {
      for (var i = 0; i < res.length; i++) {
        result[i] = res[i].dataValues;
      }
      return result;
    })
  });
};

//Return pi with the biggest number (the last)
exports.last_pi =function() {
  return pi_table.max('pi_number').then(function (max) {
    return pi_table.findOne({where: {pi_number: max}}).then(function(res) {
      return res;
    })
  });
};

// Return a fbl by id
exports.fbl_by_id = function(fblId) {
  return fbl_table.findByPrimary(fblId).then(function (res) {
    return res.dataValues;
  });
};


/* DATABASE CREATION (POST) */
// Create a pi
exports.add_pi = function(piNumber, firstCoeff, secondCoeff, beginningDate) {
  var endDate = moment(beginningDate);
  endDate.add(84, 'days').calendar();
  return pi_table.create({
    pi_id: null,
    pi_number: piNumber,
    coeff1: firstCoeff,
    coeff2: secondCoeff,
    pi_beginning_date: beginningDate,
    pi_end_date : endDate
  }).then(function (res) {
    return res.dataValues;
  })
};

// Create a fbl
exports.add_fbl = function(piNumber, fblName, description, points, md, risk, estimateMd, probability) {
  return pi_table.findOne({where: {pi_number: piNumber}}).then(function(pi) {
    return fbl_table.create({
      fbl_id: null,
      fbl_name: fblName,
      fbl_description: description,
      points: points,
      risk: risk,
      md: md,
      estimate_md: estimateMd,
      probability: probability,
      creation_date: Sequelize.now,
      coeff1: pi.coeff1,
      coeff2: pi.coeff2,
      pi_id: pi.pi_id
    }).then(function (res) {
      return res.dataValues;
    })
  })
};


/* DATABASE MODIFICATION (PUT) */
// Change a fbl's pi
exports.change_pi = function(fblId, piNumber) {
  return pi_table.findOne({where: {pi_number: piNumber}}).then(function(pi) {
    return fbl_table.update(
      {pi_id: pi.pi_id},
      {where: {fbl_id: fblId}}
    ).then(function (res) {
      return res.dataValues;
    })
  });
};

// Change a pi's coeffs
exports.change_coeffs = function(piNumber, first, second) {
  return pi_table.update(
    {coeff1: first, coeff2: second},
    {where: {pi_number: parseInt(piNumber)}}
  ).then(function (res) {
    return res.dataValues;
  });
};

// Change fbl's values
exports.modify_fbl = function(fblId, fblName, description, points, md, risk, estimateMd, probability) {
  return fbl_table.update(
    {fbl_name: fblName, fbl_description: description, points: points, md: md, risk: risk, estimate_md: estimateMd, probability: probability},
    {where: {fbl_id: fblId}}
  ).then(function (res) {
    return res.dataValues;
  });
};

// Change fbl's coeffs and apply to values
exports.modify_fbl_coeffs = function(fblId, coeff1, coeff2) {
  return fbl_table.findByPrimary(fblId).then(function (fbl) {
    return fbl_table.update(
      {coeff1: coeff1, coeff2: coeff2, md: fbl.points * coeff1, estimate_md: fbl.points * coeff1 * coeff2},
      {where: {fbl_id: fblId}}
    ).then(function (res) {
      return res.dataValues;
    });
  });
};

/* DATABASE DELETION (DEL) */
// Delete a fbl
exports.delete_fbl = function(fblId) {
  return fbl_table.destroy(
    {where: {fbl_id: fblId}}
  ).then(function (res) {
    return res.dataValues;
  })
};
