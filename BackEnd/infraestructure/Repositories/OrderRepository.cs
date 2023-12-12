using infraestructure.DataModels;
namespace infraestructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using Npgsql;

public class OrderRepository
    {
        private readonly NpgsqlDataSource _dataSource;

        public OrderRepository(NpgsqlDataSource datasource)
        {
            _dataSource = datasource;
        }

        public IEnumerable<Order> GetOrders()
        {
            string sql = $@"
SELECT OrderId as {nameof(Order.OrderId)},
       OrderItemArrayId as {nameof(Order.OrderItemArrayId)},
       OrderDate as {nameof(Order.OrderDate)},
       OrderTime as {nameof(Order.OrderTime)},
       OrderItIsDone as {nameof(Order.OrderItIsDone)}
FROM ExamProject.Orders;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Query<Order>(sql);
            }
        }

        public Order CreateOrder(Array orderItemArrayId, string orderDate, string orderTime, bool orderItIsDone)
        {
            var sql = $@"
INSERT INTO ExamProject.Orders (OrderItemArrayId, OrderDate, OrderTime, OrderItIsDone) 
VALUES (@OrderItemArrayId, @OrderDate, @OrderTime, @OrderItIsDone)
RETURNING OrderId as {nameof(Order.OrderId)},
       OrderItemArrayId as {nameof(Order.OrderItemArrayId)},
       OrderDate as {nameof(Order.OrderDate)},
       OrderTime as {nameof(Order.OrderTime)},
       OrderItIsDone as {nameof(Order.OrderItIsDone)};
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Order>(sql, new { OrderItemArrayId = orderItemArrayId, OrderDate = orderDate, OrderTime = orderTime, OrderItIsDone = orderItIsDone });
            }
        }

        public bool DeleteOrder(int orderId)
        {
            var sql = @"DELETE FROM ExamProject.Orders WHERE OrderId = @OrderId;";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Execute(sql, new { OrderId = orderId }) == 1;
            }
        }

        public Order UpdateOrder(int orderId, Array orderItemArrayId, string orderDate, string orderTime, bool orderItIsDone)
        {
            var sql = $@"
UPDATE ExamProject.Orders 
SET OrderItemArrayId = @OrderItemArrayId, 
    OrderDate = @OrderDate, 
    OrderTime = @OrderTime, 
    OrderItIsDone = @OrderItIsDone
WHERE OrderId = @OrderId
RETURNING OrderId as {nameof(Order.OrderId)},
       OrderItemArrayId as {nameof(Order.OrderItemArrayId)},
       OrderDate as {nameof(Order.OrderDate)},
       OrderTime as {nameof(Order.OrderTime)},
       OrderItIsDone as {nameof(Order.OrderItIsDone)};
";

            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Order>(sql, new { OrderId = orderId, OrderItemArrayId = orderItemArrayId, OrderDate = orderDate, OrderTime = orderTime, OrderItIsDone = orderItIsDone });
            }
        }

        public async Task<Order> GetOrderByOrderIdAsync(int orderId)
        {
            string sql = $@"
SELECT OrderId as {nameof(Order.OrderId)},
       OrderItemArrayId as {nameof(Order.OrderItemArrayId)},
       OrderDate as {nameof(Order.OrderDate)},
       OrderTime as {nameof(Order.OrderTime)},
       OrderItIsDone as {nameof(Order.OrderItIsDone)}
FROM ExamProject.Orders
WHERE OrderId = @OrderId;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return await conn.QueryFirstOrDefaultAsync<Order>(sql, new { OrderId = orderId });
            }
        }
}
