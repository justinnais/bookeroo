import axios from 'axios';

const REST_URL = 'http://localhost:8080/api/';

interface IExampleInterface {
  id: string;
  name: string;
}

type RequestTypes = 'person';
type RequestInterfaces = IExampleInterface;
type Identifier = string | number | undefined;

export async function createRequest(
  requestType: RequestTypes,
  item: RequestInterfaces
) {
  try {
    const response = await axios.post(`${REST_URL}/${requestType}`, item);
    switch (response.status) {
      case 200:
        console.log(response);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getRequest(
  requestType: RequestTypes,
  identifier: Identifier
) {
  try {
    const response = await axios.get(
      `${REST_URL}/${requestType}/${identifier}`
    );
    switch (response.status) {
      case 200:
        console.log(response);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
}
