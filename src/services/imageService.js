export async function getImages() {
  const baseUrl = process.env.REACT_APP_API_URI;

  var response = await fetch(`${baseUrl}/api/images`);
  var data = await response.json();

  console.log(data);
  return data;
}

export async function addImage(formData) {
  const baseUrl = process.env.REACT_APP_API_URI;
  
  var response = await fetch(`${baseUrl}/api/images`, {
    method: 'POST',
    body: formData,
  });

  console.log(response);
  return response;
}
