import axios from 'axios';


export const userEndpoint = {
    fetchUsers: async () => {
      try {
        const response = await axios.get(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        return [];
      }
    },
  };