import mongoose from 'mongoose';
//schema of friend
const friendSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  idNumber: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  homeNumber: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  personalPhone: {
    type: Number,
    required: true
  },
  dateOfVaccine1: {
    type: Date
  },
  companyOfVaccine1: {
    type: String
  },
  dateOfVaccine2: {
    type: Date
  },
  companyOfVaccine2: {
    type: String
  },
  dateOfVaccine3: {
    type: Date
  },
  companyOfVaccine3: {
    type: String
  },
  dateOfVaccine4: {
    type: Date
  },
  companyOfVaccine4: {
    type: String
  },
  dateOfCovid: {
    type: Date
  },
  dateOfRecovery: {
    type: Date
  }
})

//create a new friend and export it
const Friend = mongoose.model('Friend', friendSchema);
export default Friend;