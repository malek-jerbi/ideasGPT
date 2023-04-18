import axios from "axios";
import userApi from "../api/UserApi";

jest.mock('axios');

describe('userApi', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    it('calls axios.post with the correct arguments when processClaim is called', async () => {
      // Prepare
      const payload = { claimData: 'some data' };
      const token = 'test-token';
      const expectedUrl = '/users/processClaim';
      const expectedHeaders = { Authorization: `Bearer ${token}` };
      axios.post.mockResolvedValue({ status: 200, data: {} });
  
      // Execute
      await userApi.processClaim(payload, token);
  
      // Assert
      expect(axios.post).toHaveBeenCalledWith(expectedUrl, payload, { headers: expectedHeaders });
    });
  });
  