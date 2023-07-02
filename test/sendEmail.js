import {expect} from 'chai'
import axios from 'axios'
import dotenv from 'dotenv'
import fs from 'fs'


if (fs.existsSync('.env.local')) {
    dotenv.config({ path: '.env.local' });
  } else {
    dotenv.config();
  }
  
const ROOT_URL = "http://localhost:"+ process.env.PORT+"/"

describe('Endpoint sendEmail',async function(){
    this.timeout(3000)
    it('should throw an error if user email is incorrect',async()=>{
        await axios.post(new URL('/api/sendEmail',ROOT_URL),{name:"dummy",email:"somemail",message:"some message"})
        .then(response=>{
            expect(response).to.be.undefined
        })
        .catch(error=>{
            expect(error).to.have.property('response')
            expect(error.response).to.have.property('data')
            expect(error.response.data).to.have.property('message')
            expect(error.response.data.message).to.be.equal('Invalid user email')
        })
    })
    it('should succeed if email is correct',async()=>{
        await axios.post(new URL('/api/sendEmail',ROOT_URL),{name:"dummy",email:"test@test.com",message:"some message"})
        .then(response=>{
            expect(response.data).to.have.property("message").equal('Email sent successfully')
            expect(response).to.have.property('status').equal(200)
        })
    })
})

