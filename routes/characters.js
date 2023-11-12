//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import charactersData from '../data/characters.js';

router
.route('/')
.get(async (req, res) => {
  //code here for GET will render the home.handlebars file
  res.render('home', { title: 'Marvel Character Finder'})
  
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  let searchName = req.body.characterByName
  
    
    if(searchName.trim() === "" || !searchName){
      res.status(400).render('error', {error: '400: Must enter text into the search field'})

    } else {
      try {
        const characterList = await charactersData.searchCharacterByName(searchName)
    //console.log('results:', characterList); 
    //console.log('searchCharacterByName:', searchName);
    res.render('characterSearchResults', {title: 'Marvel Characters Found', results: characterList, searchCharacterByName: searchName})

  } catch (e) {
    console.log(e)
    res.status(404).render('error', {error: '404: Character not found'})
  }
}
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
  if(req.params.id.trim() === "" || !req.params.id){
    res.status(400).render('error', {error: '400: ID error'})
  } else {
  try{
    const characterById = await charactersData.searchCharacterById(req.params.id)
    const [{ name }] = characterById
    //console.log('results:', characterById)
    res.render('characterById', {title: name, results: characterById})
  } catch(e) {
    res.status(404).render('error', {error: '404: Character not found'})
  }
}
});

//export router
export default router;