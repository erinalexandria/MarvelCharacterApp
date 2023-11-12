//import axios, md5
import axios from 'axios'
import md5 from 'blueimp-md5'

const publickey = 'db830a0e7de6719e1e298bc393c33a4d';
const privatekey = 'd940d7295031f065c399350b3f42278aa0bcfe9f';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
//const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;


let exportedMethods = {
async searchCharacterByName(name) {
  //Function to search the api and return up to 15 characters matching the name param
  if(name.trim() === "" || !name){
    throw 'No name entered or name cannot be empty spaces'
  }
  const { data } = await axios.get(`${baseUrl}?nameStartsWith=${name}&ts=${ts}&apikey=${publickey}&hash=${hash}`)
  const charactersList = []

  for (const result of data.data.results) {
    const { id, name } = result;
    charactersList.push({ id, name })
  
    if (charactersList.length === 15) {
      break
    }
  }
  
  return charactersList
},

async searchCharacterById(id) {

  if(id.trim() === "" || !id){
    throw 'Invalid ID'
  }

  //Function to fetch a character from the api matching the id
  const { data } = await axios.get(`${baseUrl}/${id}?ts=${ts}&apikey=${publickey}&hash=${hash}`)
  return data.data.results
}
}

export default exportedMethods
