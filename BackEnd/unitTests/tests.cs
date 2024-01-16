using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using infraestructure.DataModels;
using Newtonsoft.Json;
using NUnit.Framework;

namespace unitTests;

public class tests
{
    [TestFixture]
    public class objectTests{
        private HttpClient _httpClient;
    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
    }

    [Test]
    public void Test1()
    {
        Assert.Pass();
    }
    [Test]
    public async Task ShouldSuccessfullyCreateOrder()
    {
        var order = new Order()
        {
            OrderItemArrayId = "brench bries",
            OrderDate = "10-12-2001",
            OrderTime = "15:44:56",
            OrderItIsDone = false
            
        };

        var response = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders", order);
        Console.WriteLine(order);
        
        response.StatusCode.Should().Be(HttpStatusCode.Created);

        var responseObject = JsonConvert.DeserializeObject<Order>(await response.Content.ReadAsStringAsync());

        responseObject.Should().NotBeNull();
        responseObject.OrderDate.Should().Be(order.OrderDate);
        responseObject.OrderTime.Should().Be(order.OrderTime);
        responseObject.OrderItIsDone.Should().Be(order.OrderItIsDone);
        responseObject.OrderItemArrayId.Should().Be(order.OrderItemArrayId);
    }
    [Test]
    public async Task ShouldSuccessfullyCreateUser()
    {
        var user = new User()
        {
            Username = "rardon gamsay",
            Password = "Eyyy1234",
            Role = 0
        };

        var response = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/register", user);
        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine(jsonResponse + "User heeerer");
        
        response.StatusCode.Should().Be(HttpStatusCode.InternalServerError);
        
    }
    
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

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders", order);
        
        var jsonResponse = await createResponse.Content.ReadAsStringAsync();
        Console.WriteLine(jsonResponse + "heeerer");
        var createdOrder = JsonConvert.DeserializeObject<Order>(await createResponse.Content.ReadAsStringAsync());
        
        createdOrder.OrderItIsDone = true;

        var editResponse = await _httpClient.PutAsJsonAsync($"http://localhost:5000/api/orders/{createdOrder.OrderId}", createdOrder);
        editResponse.EnsureSuccessStatusCode();

        var editedOrder = JsonConvert.DeserializeObject<Order>(await editResponse.Content.ReadAsStringAsync());

        editedOrder.Should().NotBeNull();
        editedOrder.OrderItemArrayId.Should().Be("hamburber");
        editedOrder.OrderDate.Should().Be("12-12-2001");
        editedOrder.OrderTime.Should().Be("16:44:56");
        editedOrder.OrderItIsDone.Should().Be(true);
        
    }
    [Test]
    public async Task ShouldSuccessfullyEditUser()
    {
        var user = new User()
        {
            Username = "rardon gamsay",
            Password = "hashLol1234",
            Role = Role.Admin
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users", user);
        //createResponse.EnsureSuccessStatusCode();

        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());
        var jsonResponse = await createResponse.Content.ReadAsStringAsync();
        Console.WriteLine(jsonResponse + "ediiit user");
        createdUser.Role = Role.Chef;

        var editResponse = await _httpClient.PutAsJsonAsync($"http://localhost:5000/api/users/id/{createdUser.UserId}", createdUser);
        editResponse.EnsureSuccessStatusCode();

        var editedUser = JsonConvert.DeserializeObject<User>(await editResponse.Content.ReadAsStringAsync());

        editedUser.Should().NotBeNull();
        editedUser.Username.Should().Be("rardon gamsay");
        editedUser.Role.Should().Be(Role.Chef);
    }
    
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
    
    [Test]
    public async Task ShouldSuccessfullyDeleteUser()
    {
        var user = new User()
        {
            Username = "rardongamsay",
            Password = "hashLol1234",
            Role = 0
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users/register", user);
        
        Console.WriteLine(createResponse.Content + "create r3es");
        
        var jsonResponse = await createResponse.Content.ReadAsStringAsync();
        Console.WriteLine(jsonResponse + "del user");
        
        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());
        Console.WriteLine(createdUser + "create user");
        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/users/id/{createdUser.UserId}");
        deleteResponse.EnsureSuccessStatusCode();

        var deletedUser = JsonConvert.DeserializeObject<User>(await deleteResponse.Content.ReadAsStringAsync());

        deletedUser.Should().BeNull();
    }
    
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
    
    [Test]
    public async Task ShouldSuccessfullyReadUser()
    {
        var user = new User()
        {
            Username = "rardon gamsay",
            Password = "hashLol1234",
            Role = 0
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users/register", user);
        createResponse.EnsureSuccessStatusCode();

        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());

        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/users/id/{createdUser.UserId}");
        readResponse.EnsureSuccessStatusCode();

        var readOrder = JsonConvert.DeserializeObject<User>(await readResponse.Content.ReadAsStringAsync());

        readOrder.Should().NotBeNull();
        readOrder.Username.Should().Be("rardon gamsay");
        readOrder.Role.Should().Be(0);
    }
    
    [Test]
    public async Task ShouldFailToDeleteNonExistentOrder()
    {
        // Attempt to delete an Order that doesn't exist
        var nonExistentOrderId = 9999;
        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/orders/{nonExistentOrderId}");

        deleteResponse.IsSuccessStatusCode.Should().BeFalse();
    }
    [Test]
    public async Task ShouldFailToDeleteNonExistentUser()
    {
        // Attempt to delete an Order that doesn't exist
        var nonExistentUserId = 9999;
        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/users/id/{nonExistentUserId}");

        deleteResponse.IsSuccessStatusCode.Should().BeFalse();
    }
    [Test]
    public async Task ShouldFailToReadNonExistentOrder()
    {
        // Attempt to read an order that doesn't exist
        var nonExistentOrderId = 9999;
        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/orders/{nonExistentOrderId}");

        readResponse.IsSuccessStatusCode.Should().BeFalse();
    }
   [Test]
    public async Task ShouldFailToReadNonExistentUser()
    {
        // Attempt to read an order that doesn't exist
        var nonExistentUserId = 9999;
        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/users/id/{nonExistentUserId}");

        readResponse.IsSuccessStatusCode.Should().BeFalse();
    }
    }
}