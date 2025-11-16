const express = require('express')
const bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js')
const cors = require('cors')

const app = express()
app.use(cors())
const PORT = 3000

const supabaseUrl = 'https://qukomivcjxiwtmecebnb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1a29taXZjanhpd3RtZWNlYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNzEwOTQsImV4cCI6MjA3ODc0NzA5NH0.lIOvl8Fis8dwaGlQHvDy4qsZ1-W2NQJ_zTC0uHE_sRY'
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
  const { content, date, time } = req.body;
  const { data, error } = await supabase
    .from('serial_monitor')
    .insert([{ content, date, time }])
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



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
