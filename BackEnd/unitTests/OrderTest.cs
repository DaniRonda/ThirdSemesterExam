using infraestructure.Repositories;
using Assert = Xunit.Assert;

namespace unitTests;
using infraestructure;
using infraestructure.DataModels;


public class OrderRepositoryTests
{
    [Fact]
    public void GetOrders_ShouldReturnOrders()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var orderRepository = new OrderRepository(mockDataSource.Object);

        var expectedOrders = new List<Order>
        {
            new Order { OrderId = 1, OrderItemArrayId = new int[] { 1, 2, 3 }, OrderDate = "some date", OrderTime = "some time", OrderItIsDone = false },
            new Order { OrderId = 2, OrderItemArrayId = new int[] { 4, 5, 6 }, OrderDate = "some date", OrderTime = "some time", OrderItIsDone = true }
        };


        // Act
        var actualOrders = orderRepository.GetOrders();

        // Assert
        Assert.Equal(expectedOrders, actualOrders);
    }

    [Fact]
    public void CreateOrder_ShouldReturnCreatedOrder()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var orderRepository = new OrderRepository(mockDataSource.Object);

        var expectedOrder = new Order
        {
            OrderId = 1,
            OrderItemArrayId = new int[] { 1, 2, 3 },
            OrderDate = "some date",
            OrderTime = "some time",
            OrderItIsDone = false
        };
        
        // Act
        var actualOrder = orderRepository.CreateOrder(new int[] { 1, 2, 3 }, "some date", "some time", false);

        // Assert
        Assert.Equal(expectedOrder, actualOrder);
    }

    [Fact]
    public void DeleteOrder_ShouldReturnTrue()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var orderRepository = new OrderRepository(mockDataSource.Object);

        var orderIdToDelete = 1;

        // Act
        var result = orderRepository.DeleteOrder(orderIdToDelete);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void UpdateOrder_ShouldReturnUpdatedOrder()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var orderRepository = new OrderRepository(mockDataSource.Object);

        var expectedOrder = new Order
        {
            OrderId = 1,
            OrderItemArrayId = new int[] { 4, 5, 6 },
            OrderDate = "some date",
            OrderTime = "some time",
            OrderItIsDone = true
        };

        // Act
        var actualOrder = orderRepository.UpdateOrder(1, new int[] { 4, 5, 6 }, "some date", "some time", true);

        // Assert
        Assert.Equal(expectedOrder, actualOrder);
    }

    [Fact]
    public async Task GetOrderByOrderIdAsync_ShouldReturnOrder()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var orderRepository = new OrderRepository(mockDataSource.Object);

        var expectedOrder = new Order
        {
            OrderId = 1,
            OrderItemArrayId = new int[] { 1, 2, 3 },
            OrderDate = "some date",
            OrderTime = "some time",
            OrderItIsDone = false
        };


        // Act
        var actualOrder = await orderRepository.GetOrderByOrderIdAsync(1);

        // Assert
        Assert.Equal(expectedOrder, actualOrder);
    }
}
