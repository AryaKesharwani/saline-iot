import axios from 'axios';

const API_URL = 'https://naughty-villani-elastic.lemme.cloud/api/blynk-forwarder';

const fetchSalineLevel = async () => {
  console.log('meow')
  const response = await axios.post(API_URL,{
    "method":"GET"
  });
  return response.data.data.datas.rows[0].weight;
};

export {fetchSalineLevel}