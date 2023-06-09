import React from 'react';
import Paragraph from '../Paragraph/Paragraph';

function Orders({ order }) {
  return (
    <div className="ordersKitchen">
      <ul>
        {order.products.map((product) => (
          <li key={product.id}>
            <Paragraph>Nome do Produto: {product.name}</Paragraph>
            <Paragraph>Quantidade: {product.quantity}</Paragraph>
          </li>
        ))}
      </ul>
      <Paragraph>Status: {order.status}</Paragraph>
      <Paragraph>Data de entrada: {order.dateEntry}</Paragraph>
    </div>
  );
}

// function Orders(order) {
//   return (
//     <div>
//       <p>Cliente:{order.client}</p>
//       <ul>
//         {order.products.map((product) => (
//           <li key={product.id}>
//             <p>Nome do Produto:{product.name}</p>
//             <p>Quantidade:{product.quantity}</p>
//           </li>
//         ))}
//       </ul>
//       <p>Status:{order.status}</p>
//       <p>Data de entrada:{order.dateEntry}</p>
//     </div>
//   );
// }

export default Orders;
