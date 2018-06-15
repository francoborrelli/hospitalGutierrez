const Patient = require('../patient/patient.model');

function handleHouseType(houseTypes, patient) {
  const houseType = houseTypes.find(house => house.id === patient.houseType);
  if (houseType) {
    houseType.amount++;
  } else {
    houseTypes.push({ id: patient.houseType, amount: 1 });
  }
}

function handleWaterType(waterTypes, patient) {
  const waterType = waterTypes.find(water => water.id === patient.waterType);
  if (waterType) {
    waterType.amount++;
  } else {
    waterTypes.push({ id: patient.waterType, amount: 1 });
  }
}

function handleHeatingType(heatingTypes, patient) {
  const heatingType = heatingTypes.find(
    water => water.id === patient.heatingType
  );
  if (heatingType) {
    heatingType.amount++;
  } else {
    heatingTypes.push({ id: patient.heatingType, amount: 1 });
  }
}

function handleElectricity(withElectricity, patient) {
  patient.hasElectricity ? withElectricity.yes++ : withElectricity.no++;
}

function handleRefrigerator(withRefrigerator, patient) {
  patient.hasRefrigerator ? withRefrigerator.yes++ : withRefrigerator.no++;
}

function handlePet(withPet, patient) {
  patient.hasPet ? withPet.yes++ : withPet.no++;
}

async function get(req, res, next) {
  try {
    const patients = await Patient.find({deleted: false});
    const houseTypes = [];
    const waterTypes = [];
    const heatingTypes = [];
    const withElectricity = { yes: 0, no: 0 };
    const withRefrigerator = { yes: 0, no: 0 };
    const withPet = { yes: 0, no: 0 };
    patients.forEach(patient => {
      handleHouseType(houseTypes, patient);
      handleWaterType(waterTypes, patient);
      handleHeatingType(heatingTypes, patient);
      handleElectricity(withElectricity, patient);
      handleRefrigerator(withRefrigerator, patient);
      handlePet(withPet, patient);
    });
    return res.json({
      totalPatients: patients.length,
      houseTypes,
      waterTypes,
      heatingTypes,
      withElectricity,
      withRefrigerator,
      withPet
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { get };
