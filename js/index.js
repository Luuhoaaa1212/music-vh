import {getAPI} from './db.js';


export async function handleCatePlayList() {
   try {
     const cate = await getAPI('category');
     const playlist = await getAPI('playList');
     return {
      cate,playlist
     }
   } catch (error) {
     console.error('Error:', error);
   }
 }
 export async function handleGetSongs() {
  try {
    const songs = await getAPI('song');
    const singers = await getAPI('singer');
    const songSinger = await getAPI('songSinger');
    const songPlaylist = await getAPI('songPlaylist');
    return {
      songs,singers,songSinger,songPlaylist
    };
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function handleGetUsers() {
  try {
    const users = await getAPI('users');
    return users;
  } catch (error) {
    console.error('Error:', error);
  }
}
export function getUrlApi(param){
  return `https://music-api-2c07.onrender.com/${param}`;

}
 

 