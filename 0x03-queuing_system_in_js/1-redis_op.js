import redis from 'redis';

// Create a Redis client
 const client = redis.createClient();

 // Handle successful connection
 client.on('connect', () => {
   console.log('Redis client connected to the server');
   });

   // Handle connection errors
   client.on('error', (err) => {
     console.log(`Redis client not connected to the server: ${err.message}`);
     });
// Function to set a new school value
function setNewSchool(schoolName, value, callback) {
client.set(schoolName, value, redis.print); // Store the value in Redis with the key `schoolName`
 if (callback) callback(); // Call the callback after setting the value
   }

 // Function to display the value of a school
function displaySchoolValue(schoolName) {
       client.get(schoolName, (err, reply) => {
           if (err) {
console.log(`Error retrieving the value for ${schoolName}: ${err}`);
                     } else {
         console.log(`${schoolName}: ${reply}`);
                               }
                                 });
                                 }
      // Call the functions as specified
 displaySchoolValue('ALX'); // This will show the value for the ALX key
 setNewSchool('ALXSanFrancisco', '100', () => {
            displaySchoolValue('ALXSanFrancisco'); // Display value after setting the new value for ALXSanFrancisco.
 });
