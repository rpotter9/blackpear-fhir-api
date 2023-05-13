const router = require('express').Router()
const { v4: uuidv4 } = require('uuid');
const { resource } = require('fhir-kit-client');

const patientsData = require('../mock-data/patients.json')
const observationsData = require('../mock-data/observations.json')
 
// GET observations for a patient by NHS number or surname
router.get('/', async (req, res) => {
    try {
     
      const { nhsNumber, surname } = req.query;
  
      if (!nhsNumber && !surname) {
        return res.status(400).json({ error: 'NHS number or Patient Surname is required' })
      }
  
      // Mock search for patient(s) based on NHS number or surname
     
    let patients;
    if (nhsNumber) {
      patients = patientsData.filter(patient => patient.identifier.value === nhsNumber)
    } else {
      patients = patientsData.filter(patient => patient.name[0].family.toLowerCase() === surname.toLowerCase())
    }

    if (patients.length === 0) {
      return res.status(404).json({ error: 'No patient found' })
    }

    const patient = patients[0]

    const observations = observationsData.filter(observation => observation.subject.reference === `Patient/${patient.id}`)
  
      // Create FHIR Bundle resource
      const bundle = new resource.Bundle({
        id: uuidv4(),
        type: 'searchset',
        entry: [
          { resource: patient },
          ...observations.map((obs) => ({ resource: obs })),
        ],
      })
  
      res.json(bundle)

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' })
    }
  });



module.exports = {
    router,
    name: 'Observations',
    base: '/observations'
}