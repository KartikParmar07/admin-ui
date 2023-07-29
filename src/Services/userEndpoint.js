import React from 'react'
import axios from 'axios';
import config from "../Services/userEndpoint";


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