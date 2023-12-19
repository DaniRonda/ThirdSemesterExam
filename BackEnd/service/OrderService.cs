using infraestructure.DataModels;
using infraestructure.Repositories;
namespace service;

public class OrderService
    {
        private readonly OrderRepository _orderRepository;
        public OrderService(OrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public IEnumerable<Order> GetOrders()
        {
            return _orderRepository.GetOrders();
        }
        public IEnumerable<Order> GetOrdersByItIsDone()
        {
            return _orderRepository.GetOrdersByItIsDone();
        }
        public IEnumerable<Order> GetOrdersByDate( string targetDate)
        {
            return _orderRepository.GetOrdersByDate(targetDate);
        }

        public Order CreateOrder(string orderItemArrayId, string orderDate, string orderTime, bool orderItIsDone)
        {
            return _orderRepository.CreateOrder(orderItemArrayId, orderDate, orderTime, orderItIsDone);
        }

        public bool DeleteOrder(int orderId)
        {
            return _orderRepository.DeleteOrder(orderId);
        }

        public Order UpdateOrder(int orderId, string orderItemArrayId, string orderDate, string orderTime, bool orderItIsDone)
        {
            return _orderRepository.UpdateOrder(orderId, orderItemArrayId, orderDate, orderTime, orderItIsDone);
        }

        public Order GetOrderByOrderIdAsync(int orderId)
        {
            return _orderRepository.GetOrderByOrderIdAsync(orderId);
        }
    }
