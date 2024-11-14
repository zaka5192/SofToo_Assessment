import axios from 'axios';
import {fetchProducts} from '../src/api/productsAPI';

jest.mock('axios');

describe('API Functions', () => {
  it('should fetch products successfully', async () => {
    const mockProducts = [{id: 1, name: 'Product 1', price: 10}];
    (axios.get as jest.Mock).mockResolvedValue({data: mockProducts});
    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
  });

  it('should handle fetch products failure', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));
    await expect(fetchProducts()).rejects.toThrow('Network Error');
  });
});
