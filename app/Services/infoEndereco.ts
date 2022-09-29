import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
const arrayLatLong: string[] = [];

export const infoEndereco = (cep: string) => {
  console.log(API_KEY);
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${API_KEY}`).then((response) => {
    console.log(response);
    const { lat, lng } = response.data.results[0].geometry.location;
    arrayLatLong.push(lat, lng);
    return arrayLatLong;
  });
};
