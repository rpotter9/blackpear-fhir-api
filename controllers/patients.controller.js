const router = require('express').Router()

 
router.get('/:number', async (req, res) => {

    const auth = req.header('Authorization')
    const response = await http.get(`/patient/number/${req.params.number}`, {
      headers:{
        'Authorization': `${auth}`
      }
    })

    let postcode = ''

    if(response.data.addresses[0] != null){
      postcode = response.data.addresses[0].postcode
    }
    
    const patient = {
      patientId: response.data.patientId,
      patientNumber: response.data.patientNumber,
      name: response.data.givenName + ' ' + response.data.familyName,
      dob: response.data.birthDate,
      postcode
    }

    return res.status(200).send(patient)


})


module.exports = {
    router,
    name: 'Patient',
    base: '/patients'
}