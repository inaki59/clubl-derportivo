import axios from 'axios'
const api=process.env.REACT_APP_API_URL
export const getreservaByPista = async (deporte, pista) => {
  // Check if reserva and pista are valid before making the request
  if (!deporte || !pista) {
    return Promise.reject(new Error("Invalid parameters. Both deporte and pista are required."));
  }

  return new Promise((resolve, reject) => {
    axios
      .get(`${api}/reservas/${deporte}/${pista}/`)
      .then((response) => {
        resolve(response.data.reservas);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const addReserva = async (reservationData) => {
  try {
    const response = await axios.post(`${api}/reservas/create/`, reservationData);
    return response.data; // Assuming the response contains the created reservation data
  } catch (error) {
    // Handle error
    console.error('Error adding reservation:', error);
    throw error; // Propagate the error
  }
};
export const deleteReserva =async(codigo)=>{
  try{
    const response=await axios.delete(`${api}/reservas/eliminar/${codigo}/`);
    return response;
  }catch(error){
    console.log(error);
    return error
  }
}

