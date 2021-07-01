import { useEffect, useState } from "react";
//import Pet from "./Pet";
import useBreedList from "./useBreedList";
const ANIMALS = ['bird','cat','dog','rabbit','reptile'];
import Results from "./Results";

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal,setAnimal] = useState('');
  const [breed,setBreed] = useState('');
  const [pets,setPets ] =useState([]);

  const [breeds] = useBreedList(animal);


  useEffect(()=>{
    requestPets();
  },[animal]);

  async function requestPets()
  {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
    const json = await res.json();

    console.log(json);
    setPets(json.pets);
  }


  return (
    <div className="search-params">
      <form  
      onSubmit={e => {
        e.preventDefault();
        requestPets();
      }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label htmlFor='animal'>
          Animal
          <select id='animal' value = {animal} onChange = {e => setAnimal(e.target.value)} onBlur={e => setAnimal(e.target.value)} >

            <option/>
              {ANIMALS.map(animal => {
                return  <option key={animal} value={animal}> {animal} </option>
              })}
  
          </select>

        </label>


        <label htmlFor='breed'>
          breed
          <select id='breed' value = {breed} onChange = {e => setBreed(e.target.value)} onBlur={e => setBreed(e.target.value)} >

            <option/>
              {breeds.map(breed => {
                return  <option key={breed} value={breed}> {breed} </option>
              })}
  
          </select>

        </label>

        <button>Submit</button>
      </form>

      <Results pets={pets}/>
      
        
      
    </div>
  );
};

export default SearchParams;
