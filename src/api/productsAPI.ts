import axios from 'axios';
import {Product} from '../types';

const apiBaseURL = 'https://my-json-server.typicode.com/benirvingplt/products/';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${apiBaseURL}products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchMenu = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${apiBaseURL}menu`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};
