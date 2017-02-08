import axios from 'axios';

//Get data from API end point.
//It returns an JS promiss object.
function getTableData(callback) {
  const URL = 'https://www.reddit.com/subreddits/search.json?q=reactjs';
  return axios.get(URL);
}

export default {
  getTableData
}