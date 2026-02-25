const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Routes using Supabase
app.get('/api/customers', async (req, res) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json(error);
  res.json(data);
});

app.post('/api/customers', async (req, res) => {
  const { data, error } = await supabase
    .from('customers')
    .insert([req.body])
    .select();

  if (error) return res.status(400).json(error);
  res.status(201).json(data[0]);
});

app.put('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('customers')
    .update(req.body)
    .eq('id', id)
    .select();

  if (error) return res.status(400).json(error);
  if (data.length === 0) return res.status(404).json({ message: 'Customer not found' });
  res.json(data[0]);
});

app.delete('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json(error);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
