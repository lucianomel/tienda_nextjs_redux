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

describe('Endpoint data',async()=>{
    it('should respond with an error if no data file is found',async ()=>{
        await axios.get(new URL('/api/data',ROOT_URL),{params:{filePath:'./datas.json'}})
        .then((response)=>{
            expect(response).to.be.undefined
        })
        .catch(e=>{
            expect(e.response).to.have.property('status').equal(500)
            expect(e.response.data.message).to.contain('no such file or directory').to.contain('Error reading JSON data file')
        })
    })
    it('should respond data an status code 200 if data file is found',async()=>{
        const response = await axios.get(new URL('/api/data',ROOT_URL),{params:{filePath:'./data.json'}})
        expect(response).to.have.property('status').equal(200)
        expect(response).to.have.property('data')
    })

})