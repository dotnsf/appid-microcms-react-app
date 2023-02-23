
import React, { useEffect, useState } from 'react';
import './ItemsTable.css';

const ItemsTable = ({items}) => {
  const amazon_tag = process.env.REACT_APP_AMAZON_TAG || '';

  return (
    <>
    <table className='mytable'>
      <thead>
        <tr><th>#</th><th>name</th><th>brand</th><th>maker</th><th>price</th></tr>
      </thead>
      <tbody>
    { items && items.length > 0 && items.map( ( item, index ) => (
      <tr key={item.id}>
        <td>#{item.jancode}<br/><img src={item.image_url} alt={item.name} width="200"/></td>
        <td><a target="_blank" href={"https://www.amazon.co.jp/dp/"+item.asin+"?tag="+amazon_tag+"&linkCode=osi&th=1&psc=1"}>{item.name}</a></td>
        <td>{item.brand}</td>
        <td>{item.maker}</td>
        <td>{item.price}</td>
      </tr>
    ))}
      </tbody>
    </table>
    </>
  )
};

export default ItemsTable;
