import React, { useState, useEffect } from 'react';
import styles from './SellerPanels.module.css';

const SellerProductsPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'ring',
    price: '',
    quantity: '',
    description: '',
    image: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/seller/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/seller/products/${editProduct.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editProduct)
      });

      if (response.ok) {
        setShowEditModal(false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Validate required fields
      if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
        throw new Error('Please fill all required fields');
      }

      // Add fields to FormData
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('price', newProduct.price);
      formData.append('quantity', newProduct.quantity);
      formData.append('description', newProduct.description || '');
      
      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }

      console.log('Form data entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch('/api/seller/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

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
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>My Products</h2>
        <button onClick={() => setShowCreateModal(true)}>Add Product</button>
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

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => {
                  setEditProduct(product);
                  setShowEditModal(true);
                }}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className={styles.modal}>
          <form onSubmit={handleEdit}>
            <input
              type="text"
              value={editProduct.name}
              onChange={e => setEditProduct({...editProduct, name: e.target.value})}
            />
            <input
              type="number"
              value={editProduct.price}
              onChange={e => setEditProduct({...editProduct, price: e.target.value})}
            />
            <input
              type="number"
              value={editProduct.quantity}
              onChange={e => setEditProduct({...editProduct, quantity: e.target.value})}
            />
            <div className={styles.modalButtons}>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellerProductsPanel;