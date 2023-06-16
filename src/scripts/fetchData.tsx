const fetchData = async (url: string, method: string, content: any, token: string) => {

  const requestData1 = {
    method,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(content),
  }

  const requestData2 = {
    method,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  }

    try {
      const response = await fetch(url, content === '' ? requestData2 : requestData1 );
  
      if (!response.ok) {
        throw new Error("Could not fetch the data");
      }
  
      const data = await response.json();
      const isPending = false;
      const error = '';
    
      return { data, isPending, error };
    } catch (error) {
      console.log(error);
      const isPending = false;
      const errorMessage = "Could not fetch the data";
    
      return { data: null, isPending, error: errorMessage };
    }
  }
  
  export default fetchData;
  