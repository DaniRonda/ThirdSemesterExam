using System.Net;
using System.Net.Http.Json;
using api.Model;
using FluentAssertions;
using infraestructure.DataModels;
using infraestructure.Repositories;
using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;
using Npgsql;
using NUnit.Framework;

namespace unitTests;

public class tests
{
    
    [TestFixture]
    
    public class objectTests{
        private HttpClient _httpClient;
        private OrderRepository _orderRepository;

    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
    }
    
    [Test]
    public async Task ShouldSuccessfullyCreateOrder()
    {
        // Arrange
        string orderItemArrayId = "TestOrderItem";
        string orderDate = "2024-01-16";
        string orderTime = "12:00:56";
        bool orderItIsDone = false;

        // Act
        Order addedOrder = _orderRepository.CreateOrder(orderItemArrayId, orderDate, orderTime, orderItIsDone);
        Console.WriteLine(addedOrder);
        // Assert
        Order retrievedOrder = _orderRepository.GetOrderByOrderIdAsync(addedOrder.OrderId);

        // Use FluentAssertions for a more readable assertion
        retrievedOrder.Should().BeEquivalentTo(addedOrder, "it should be the same");
        _orderRepository.DeleteOrder(retrievedOrder.OrderId);
        Assert.Pass("Order creation test passed!");
    }

    
    
   /* [Test]
    public async Task ShouldSuccessfullyCreateOrder()
    {
        var order = new Order()
        {
            OrderItemArrayId = "brench bries",
            OrderDate = "10-12-2001",
            OrderTime = "15:44:56",
            OrderItIsDone = false
            
        };

        var response = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders/", order);

        
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var responseObject = JsonConvert.DeserializeObject<Order>(await response.Content.ReadAsStringAsync());

        responseObject.Should().NotBeNull();
        responseObject.OrderDate.Should().Be(order.OrderDate);
        responseObject.OrderTime.Should().Be(order.OrderTime);
        responseObject.OrderItIsDone.Should().Be(order.OrderItIsDone);
        responseObject.OrderItemArrayId.Should().Be(order.OrderItemArrayId);
    }*/
    /*[Test]
    public async Task ShouldSuccessfullyCreateUser()
    {
        var user = new User()
        {
            Username = "rardon gamsay",
            PasswordHash = "hashLol",
            PasswordSalt = "saltMm",
            Role = "Admin"
        };

        var response = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users", user);

        
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var responseObject = JsonConvert.DeserializeObject<User>(await response.Content.ReadAsStringAsync());

        responseObject.Should().NotBeNull();
        responseObject.Username.Should().Be(user.Username);
        responseObject.PasswordHash.Should().Be(user.PasswordHash);
        responseObject.PasswordSalt.Should().Be(user.PasswordSalt);
        responseObject.Role.Should().Be(user.Role);
    }*/
    
    [Test]
    public async Task ShouldSuccessfullyEditOrder()
    {
        var order = new Order()
        {
            OrderItemArrayId = "hamburber",
            OrderDate = "12-12-2001",
            OrderTime = "16:44:56",
            OrderItIsDone = false
            
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders/", order);
        createResponse.EnsureSuccessStatusCode();
        Console.WriteLine(order);
        var createdOrder = JsonConvert.DeserializeObject<Order>(await createResponse.Content.ReadAsStringAsync());
        
        createdOrder.OrderItIsDone = true;
        Console.WriteLine(createdOrder);
        var editResponse = await _httpClient.PutAsJsonAsync($"http://localhost:5000/api/orders/{createdOrder.OrderId}", createdOrder);
        editResponse.EnsureSuccessStatusCode();

        var editedOrder = JsonConvert.DeserializeObject<Order>(await editResponse.Content.ReadAsStringAsync());

        editedOrder.Should().NotBeNull();
        editedOrder.OrderItemArrayId.Should().Be("hamburber");
        editedOrder.OrderDate.Should().Be("12-12-2001");
        editedOrder.OrderTime.Should().Be("16:44:56");
        editedOrder.OrderItIsDone.Should().Be(true);
        
    }
    /*[Test]
    public async Task ShouldSuccessfullyEditUser()
    {
        var user = new User()
        {
            Username = "rardon gamsay",
            PasswordHash = "hashLol",
            PasswordSalt = "saltMm",
            Role = "admin"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users", user);
        createResponse.EnsureSuccessStatusCode();

        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());
        
        createdUser.Role = "chef";

        var editResponse = await _httpClient.PutAsJsonAsync($"http://localhost:5000/api/users/id/{createdUser.UserId}", createdUser);
        editResponse.EnsureSuccessStatusCode();

        var editedUser = JsonConvert.DeserializeObject<User>(await editResponse.Content.ReadAsStringAsync());

        editedUser.Should().NotBeNull();
        editedUser.Username.Should().Be("rardon gamsay");
        editedUser.PasswordHash.Should().Be("hashLol");
        editedUser.PasswordSalt.Should().Be("saltMm");
        editedUser.Role.Should().Be("chef");
    }*/
    
    [Test]
    public async Task ShouldSuccessfullyDeleteOrder()
    {
        var order = new Order()
        {
            OrderItemArrayId = "bidnuggis",
            OrderDate = "24-12-2001",
            OrderTime = "18:44:56",
            OrderItIsDone = false
            
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders/", order);
        

        var createdOrder = JsonConvert.DeserializeObject<Order>(await createResponse.Content.ReadAsStringAsync());

        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/orders/{createdOrder.OrderId}");
        deleteResponse.EnsureSuccessStatusCode();

        var deletedOrder = JsonConvert.DeserializeObject<Order>(await deleteResponse.Content.ReadAsStringAsync());

        deletedOrder.Should().BeNull();
    }
    
   /* [Test]
    public async Task ShouldSuccessfullyDeleteUser()
    {
        var user = new User()
        {
            Username = "rardon gamsay",
            PasswordHash = "hashLol",
            PasswordSalt = "saltMm",
            Role = "admin"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users", user);
        createResponse.EnsureSuccessStatusCode();

        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());

        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/users/id/{createdUser.UserId}");
        deleteResponse.EnsureSuccessStatusCode();

        var deletedUser = JsonConvert.DeserializeObject<User>(await deleteResponse.Content.ReadAsStringAsync());

        deletedUser.Should().BeNull();
    }
    */
    [Test]
    public async Task ShouldSuccessfullyReadOrder()
    {
        var order = new Order()
        {
            OrderItemArrayId = "large boke",
            OrderDate = "26-12-2001",
            OrderTime = "19:44:56",
            OrderItIsDone = false
           
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders/", order);
        createResponse.EnsureSuccessStatusCode();

        var createdOrder = JsonConvert.DeserializeObject<Order>(await createResponse.Content.ReadAsStringAsync());

        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/orders/{createdOrder.OrderId}");
        readResponse.EnsureSuccessStatusCode();

        var readOrder = JsonConvert.DeserializeObject<Order>(await readResponse.Content.ReadAsStringAsync());

        readOrder.Should().NotBeNull();
        readOrder.OrderItemArrayId.Should().Be("large boke");
        readOrder.OrderDate.Should().Be("26-12-2001");
        readOrder.OrderTime.Should().Be("19:44:56");
        readOrder.OrderItIsDone.Should().Be(false);
       
    }
    
   /* [Test]
    public async Task ShouldSuccessfullyReadUser()
    {
        var user = new User()
        {
            Username = "rardon gamsay",
            PasswordHash = "hashLol",
            PasswordSalt = "saltMm",
            Role = "admin"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/id/users", user);
        createResponse.EnsureSuccessStatusCode();

        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());

        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/users/id/{createdUser.UserId}");
        readResponse.EnsureSuccessStatusCode();

        var readOrder = JsonConvert.DeserializeObject<User>(await readResponse.Content.ReadAsStringAsync());

        readOrder.Should().NotBeNull();
        readOrder.Username.Should().Be("rardon gamsay");
        readOrder.PasswordSalt.Should().Be("hashLol");
        readOrder.PasswordSalt.Should().Be("saltMm");
        readOrder.Role.Should().Be("admin");
    }*/
    
    [Test]
    public async Task ShouldFailToDeleteNonExistentOrder()
    {
        // Attempt to delete an Order that doesn't exist
        var nonExistentOrderId = 9999;
        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/orders/{nonExistentOrderId}");

        deleteResponse.IsSuccessStatusCode.Should().BeFalse();
    }
   /* [Test]
    public async Task ShouldFailToDeleteNonExistentUser()
    {
        // Attempt to delete an Order that doesn't exist
        var nonExistentUserId = 9999;
        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/users/id/{nonExistentUserId}");

        deleteResponse.IsSuccessStatusCode.Should().BeFalse();
    }*/
    [Test]
    public async Task ShouldFailToReadNonExistentOrder()
    {
        // Attempt to read an order that doesn't exist
        var nonExistentOrderId = 9999;
        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/orders/{nonExistentOrderId}");

        readResponse.IsSuccessStatusCode.Should().BeFalse();
    }
   /* [Test]
    public async Task ShouldFailToReadNonExistentUser()
    {
        // Attempt to read an order that doesn't exist
        var nonExistentUserId = 9999;
        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/users/id/{nonExistentUserId}");

        readResponse.IsSuccessStatusCode.Should().BeFalse();
    }*/
    }
}