import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const port = 1245;
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const listProducts = [
	  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
	  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
	  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
	  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Routes
app.get('/list_products', (req, res) => {   res.json(listProducts);
   });
   app.get('/list_products/:itemId', async (req, res) => {
     const itemId = parseInt(req.params.itemId);
       const product = listProducts.find(item => item.id === itemId);
         if (!product) return res.json({ status: 'Product not found' });

           const reservedStock = await getAsync(`item.${itemId}`) || 0;
             const currentQuantity = product.stock - reservedStock;
         res.json({ ...product, currentQuantity });
});

app.get('/reserve_product/:itemId', async (req, res) => {
     const itemId = parseInt(req.params.itemId);
     const product = listProducts.find(item => item.id === itemId);
if (!product) return res.json({ status: 'Product not found' });

const reservedStock = await getAsync(`item.${itemId}`) || 0;
   if (reservedStock >= product.stock) {
        return res.json({ status: 'Not enough stock available', itemId });
}

	await setAsync(`item.${itemId}`, reservedStock + 1);
res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
