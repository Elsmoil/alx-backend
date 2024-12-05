import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

client.on('connect', () => {
	  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
	  console.log(`Redis client not connected to the server: ${err}`);
});

// Promisify the get method
 const getAsync = promisify(client.get).bind(client);

 const setNewSchool = (schoolName, value) => {
   client.set(schoolName, value, redis.print);
   };

   const displaySchoolValue = async (schoolName) => {
     try {
         const value = await getAsync(schoolName);
             console.log(value);
               } catch (err) {
                   console.log('Error:', err);
                     }
                     };

                     // Call functions
                     displaySchoolValue('ALX');
                     setNewSchool('ALXSanFrancisco', '100');
                     displaySchoolValue('ALXSanFrancisco');
