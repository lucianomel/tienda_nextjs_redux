import fs from 'fs';

export default function handler(req, res) {
  // Path to the JSON file with data
  const filePath = './data.json';

  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON data file:', err);
    return;
  }
  res.status(200).json(data)
  });
}