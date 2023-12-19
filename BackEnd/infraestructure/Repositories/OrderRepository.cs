using Dapper;
using Npgsql;
using infraestructure.DataModels;
namespace infraestructure.Repositories;

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
SELECT order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)}
FROM public.orders;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Query<Order>(sql);
            }
        }

public IEnumerable<Order> GetOrdersByItIsDone()
{
    string sql = $@"SELECT order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)}
FROM public.orders
WHERE order_itsdone = false;
";
    using (var conn = _dataSource.OpenConnection())
    {
        return conn.Query<Order>(sql).ToList();
    }
}

        public Order CreateOrder(string orderItemArrayId, string orderDate, string orderTime, bool orderItIsDone)
        {
            var sql = $@"
INSERT INTO public.orders (order_item, order_date, order_time, order_itsdone) 
VALUES (@OrderItemArray, @OrderDate, @OrderTime, @OrderItIsDone)
RETURNING order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)};
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Order>(sql, new { OrderItemArrayId = orderItemArrayId, OrderDate = orderDate, OrderTime = orderTime, OrderItIsDone = orderItIsDone });
            }
        }

        public bool DeleteOrder(int orderId)
        {
            var sql = @"DELETE FROM public.orders WHERE order_id = @OrderId;";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Execute(sql, new { OrderId = orderId }) == 1;
            }
        }

        public Order UpdateOrder(int orderId, string orderItemArrayId, string orderDate, string orderTime, bool orderItIsDone)
        {
            var sql = $@"
UPDATE public.orders 
SET order_item= @OrderItemArrayId,
    order_date= @OrderDate,
    order_time= @OrderTime,
    order_itsdone= @OrderItIsDone
WHERE order_id= @OrderId
RETURNING order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)};
";

            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Order>(sql, new { OrderId = orderId, OrderItemArrayId = orderItemArrayId, OrderDate = orderDate, OrderTime = orderTime, OrderItIsDone = orderItIsDone });
            }
        }

        public Order GetOrderByOrderIdAsync(int orderId)
        {
            string sql = $@"SELECT order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)}
FROM public.orders
WHERE order_id = @orderId;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Order>(sql, new { orderId});
            }
        }
}
