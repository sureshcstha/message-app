import { useState, useCallback  } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PAGINATION_LIMIT = import.meta.env.VITE_PAGINATION_LIMIT || 30;

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);

  // common fetch logic
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include', // Ensures cookies are sent with the request
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  // Fetch all messages
  const fetchAllMessages = useCallback(async (page = 1) => {
    try {
      const messages = await fetchData(`${API_BASE_URL}/messages?page=${page}&limit=${PAGINATION_LIMIT}`);
      setMessages(messages.data || []);
      // console.log('Fetched messages:', messages);
      setTotalPages(messages.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Fetch all messages by a category
  const fetchMessagesByCategory = useCallback(async (category, page = 1) => {
    try {
      const messages = await fetchData(`${API_BASE_URL}/messages?category=${category}&page=${page}&limit=${PAGINATION_LIMIT}`);
      setMessages(messages.data || []);
      // console.log(`Fetched messages for category "${category}":`, messages);
      setTotalPages(messages.pagination?.totalPages || 1);
    } catch (error) {
      console.error(`Error fetching messages for category "${category}":`, error);
    }
  }, []);

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    const cachedCategories = localStorage.getItem('categories');
    if (cachedCategories) {
      setCategories(JSON.parse(cachedCategories));
      return;
    }
    
    try {
      const categories = await fetchData(`${API_BASE_URL}/messages/categories`);
      setCategories(categories.data || []);
      localStorage.setItem('categories', JSON.stringify(categories.data)); // Cache categories
      // console.log('Fetched categories:', categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  // Fetch a random message
  const fetchRandomMessage = useCallback(async () => {
    try {
      return await fetchData(`${API_BASE_URL}/messages?random=true`);
    } catch (error) {
      console.error('Error fetching random message:', error);
    }
  }, []);

  // Create a new message
  const createMessage = useCallback(async (message) => {
    try {
      await fetchData(`${API_BASE_URL}/messages/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
      fetchAllMessages();
    } catch (error) {
      console.error('Error creating message:', error);
    }
  }, [fetchAllMessages]);

  // Fetch an existing message by ID
  const fetchMessageById = useCallback(async (messageId) => {
    try {
      const message = await fetchData(`${API_BASE_URL}/messages/message/${messageId}`);
      return message.data;
    } catch (error) {
      console.error(`Error fetching message with ID "${messageId}":`, error);
    }
  }, []);

  // Update message
  const updateMessage = useCallback(async (id, updatedMessage) => {
    try {
      await fetchData(`${API_BASE_URL}/messages/message/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMessage),
      });
      fetchAllMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  }, [fetchAllMessages]);

  // Delete
  const deleteMessage = useCallback(async (id) => {
    try {
      await fetchData(`${API_BASE_URL}/messages/message/${id}`, {
        method: 'DELETE',
      });
      fetchAllMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }, [fetchAllMessages]);

  return { messages, fetchAllMessages, categories, fetchCategories, fetchMessagesByCategory, fetchRandomMessage, createMessage, fetchMessageById, updateMessage, deleteMessage, totalPages };
};

export default useMessages;