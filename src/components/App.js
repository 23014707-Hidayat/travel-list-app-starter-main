import React, { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Item({ packingItem, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={packingItem.packed}
        onChange={() => onUpdateItem(packingItem.id)}
      />
      <span
        style={packingItem.packed ? { textDecoration: "line-through" } : {}}
      >
        {packingItem.description} ({packingItem.quantity})
      </span>
      <button onClick={() => onDeleteItem(packingItem.id)}>❌</button>
    </li>
  );
}



function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  

  function handleQuantityChange(event) {
    setQuantity(Number(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <label>
        Quantity:
        <select
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="dropdown"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleDescriptionChange}
        className="item-input"
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            packingItem={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}


function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "You got everything!"
          : `You have ${totalItems} items in the list. You already packed ${packedItems} (${packedPercentage}%).`}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
      <Stats items={items} />
    </div>
  );
}


export default App;
