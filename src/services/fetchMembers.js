import axios from 'axios';
import apiPath from '~/utils/apiPath';

export default cancelToken => new Promise((resolve, reject) => {
   const cache = sessionStorage.membersList ? JSON.parse(sessionStorage.membersList) : null;

   if (cache && process.env.NODE_ENV === 'production') return resolve(cache)

   axios.get(`${apiPath}/api/member`, { cancelToken })
      .then(response => {
         const data = response.data.filter(member => member.Active)
         sessionStorage.membersList = JSON.stringify(data);
         return resolve(data);
      })
      .catch(error => reject(error))
})
