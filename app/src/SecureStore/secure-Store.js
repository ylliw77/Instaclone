import * as SecureStore from 'expo-secure-store';

export async function setToken(access_token, value) {
  await SecureStore.setItemAsync(access_token, value);
}

export async function getAccessToken(access_token) {
  let response = await SecureStore.getItemAsync(access_token);
 
  return response
}