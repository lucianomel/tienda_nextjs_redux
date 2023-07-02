import fs from 'fs';
import errorMiddleware from '@/utils/errorMiddleware';

const data = function handler(req, res) {
  // Path to the JSON file with data
  let filePath
  if(req.query && req.query.filePath){
    filePath = req.query.filePath
  }else{
    filePath = './data.json';
  }
  // Read the JSON file
  let data
  try{
    data = fs.readFileSync(filePath, 'utf8')
  }catch(e){
    throw new Error('Error reading JSON data file: '+e)
  }
    res.status(200).json(data)
}


export default errorMiddleware(data)