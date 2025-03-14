import { jwtDecode } from 'jwt-decode';
/**
 * Decoding token data
 * @param {*} token 
 * @returns 
 */
export const decodeTokenManually = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return error;
  }
};

/**
* Return Random Color - HEXADECIMAL
*/
export const getRandomColor = (hash) => {
 const letters = 'BCDEF'.split('');
 let color = hash ? '#' : '';
 for (let i = 0; i < 6; i++) {
   color += letters[Math.floor(Math.random() * letters.length)];
 }
 return color;
}