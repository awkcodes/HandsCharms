import React, { useState, useEffect } from 'react';
import styles from './AdminPanels.module.css';

const ProductsPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'ring',
    price: '',
    quantity: '',
    description: '',
    image: null
  });

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append all product data to FormData
      Object.keys(newProduct).forEach(key => {
        if (key !== 'image') {
          formData.append(key, newProduct[key]);
        }
      });
      
      // Append image if exists
      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setShowCreateModal(false);
        fetchProducts();
        setNewProduct({
          name: '',
          category: 'ring',
          price: '',
          quantity: '',
          description: '',
          image: null
        });
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products) return <div>No products found</div>;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Products Management</h2>
        <button onClick={() => setShowCreateModal(true)}>Create Product</button>
      </div>

      {showCreateModal && (
        <div className={styles.modal}>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              required
            />
            <select
              value={newProduct.category}
              onChange={e => setNewProduct({...newProduct, category: e.target.value})}
            >
              <option value="ring">Ring</option>
              <option value="necklace">Necklace</option>
              <option value="bracelet">Bracelet</option>
              <option value="key-ring">Key Ring</option>
              <option value="phone-hanger">Phone Hanger</option>
            </select>
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={e => setNewProduct({...newProduct, price: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={e => setNewProduct({...newProduct, quantity: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={e => setNewProduct({...newProduct, description: e.target.value})}
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => setNewProduct({...newProduct, image: e.target.files[0]})}
              required
            />
            <div className={styles.modalButtons}>
              <button type="submit">Create</button>
              <button type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPanel;