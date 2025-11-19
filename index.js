const express = require('express')
const bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js')
const cors = require('cors')

require('dotenv').config()

const supabaseUrl = process.env.supabaseUrl
const supabaseKey = process.env.supabaseKey
const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())

const supabase = createClient(supabaseUrl, supabaseKey)

app.use(bodyParser.json())

app.post('/api/test', (req, res) => {
  console.log('Datos recibidos:', req.body)
  res.json({ status: 'ok', received: req.body })
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando' })
})

app.post('/add/img', async (req, res) => {
  const { content, date, time } = req.body;
  const { data, error } = await supabase
    .from('images')
    .insert([{ content, date, time }])
  if (error) return res.status(400).json({ error });
  res.json(data)
})

app.get('/get/img', async (req, res) => {

  const { data, error } = await supabase
    .from('images')
    .select('*')
  if (error) return res.status(400).json({ error });
  res.json(data)

})

app.post('/add/serial', async (req, res) => {
  const { content, date, time,ip } = req.body;
  const { data, error } = await supabase
    .from('serial_monitor')
    .insert([{ content, date, time,ip }])
  if (error) return res.status(400).json({ error });
  res.json(data)
})

app.get('/get/serial', async (req, res) => {

  const { data, error } = await supabase
    .from('serial_monitor')
    .select('*')
  if (error) return res.status(400).json({ error });
  res.json(data)

})



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
