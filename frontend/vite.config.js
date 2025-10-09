import { defineConfig } from 'vite'
//installed fs to load from certs folder
import fs from 'fs'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //set server
  server:{
    //https settings
    // https:{
    //   //pass it private key and cert files
    //   key: fs.readFileSync('./certs/localhost+1-key.pem'),
    //   cert: fs.readFileSync('./certs/localhost+1.pem'),

    // }
    port: 3000,
    https: false
  }
})
