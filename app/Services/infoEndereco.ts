import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
let lat = '';
let lng = '';
export async function infoEndereco(cep: string) {
  await axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${API_KEY}`)
    .then((response) => {
      lat = String(response.data.results[0].geometry.location.lat);
      lng = String(response.data.results[0].geometry.location.lng);
    })
    .catch((e) => {
      return e;
    });
  return { lat, lng };
}
