namespace infraestructure.DataModels;

public class tests
{
    [TestFixture]
    public class objectTests{
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
            orderDate = "10-12-2001",
            orderTime = "15:44",
            orderItisDone = false,
            orderItemArrayId = "brench bries"
        };

        var response = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders", order);

        response.EnsureSuccessStatusCode();
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var responseObject = JsonConvert.DeserializeObject<Order>(await response.Content.ReadAsStringAsync());

        responseObject.Should().NotBeNull();
        responseObject.orderDate.Should().Be(order.orderDate);
        responseObject.orderTime.Should().Be(order.orderTime);
        responseObject.orderItIsDone.Should().Be(order.orderItIsDone);
        responseObject.orderItemArrayId.Should().Be(order.orderItemArrayId);
    }
    [Test]
    public async Task ShouldSuccessfullyCreateUser()
    {
        var user = new User()
        {
            username = "rardon gamsay",
            passwordHash = "hashLol",
            passwordSalt = "saltMm",
            role = "Admin"
        };

        var response = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users", user);

        response.EnsureSuccessStatusCode();
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var responseObject = JsonConvert.DeserializeObject<Order>(await response.Content.ReadAsStringAsync());

        responseObject.Should().NotBeNull();
        responseObject.username.Should().Be(user.username);
        responseObject.passwordHash.Should().Be(user.passwordHash);
        responseObject.passwordSalt.Should().Be(user.passwordSalt);
        responseObject.role.Should().Be(user.role);
    }
    
    [Test]
    public async Task ShouldSuccessfullyEditOrder()
    {
        var order = new Order()
        {
            orderDate = "12-12-2001",
            orderTime = "16:44",
            orderItisDone = false,
            orderItemArrayId = "hamburber"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders", order);
        createResponse.EnsureSuccessStatusCode();

        var createdOrder = JsonConvert.DeserializeObject<Order>(await createResponse.Content.ReadAsStringAsync());
        
        createdOrder.orderItIsDone = true;

        var editResponse = await _httpClient.PutAsJsonAsync($"http://localhost:5000/api/orders/{createdOrder.orderId}", createdOrder);
        editResponse.EnsureSuccessStatusCode();

        var editedOrder = JsonConvert.DeserializeObject<Order>(await editResponse.Content.ReadAsStringAsync());

        editedOrder.Should().NotBeNull();
        editedOrder.orderDate.Should().Be("12-12-2001");
        editedOrder.orderTime.Should().Be("16:44");
        editedOrder.orderItIsDone.Should().Be(true);
        editedOrder.orderItemArrayId.Should().Be("hamburber");
    }
    [Test]
    public async Task ShouldSuccessfullyEditUser()
    {
        var user = new User()
        {
            username = "rardon gamsay",
            passwordHash = "hashLol",
            passwordSalt = "saltMm",
            role = "admin"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users", user);
        createResponse.EnsureSuccessStatusCode();

        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());
        
        createdUser.role = "chef";

        var editResponse = await _httpClient.PutAsJsonAsync($"http://localhost:5000/api/users/{createdUser.userId}", createdUser);
        editResponse.EnsureSuccessStatusCode();

        var editedUser = JsonConvert.DeserializeObject<User>(await editResponse.Content.ReadAsStringAsync());

        editedUser.Should().NotBeNull();
        editedUser.username.Should().Be("rardon gamsay");
        editedUser.passwordHash.Should().Be("hashLol");
        editedUser.passwordSalt.Should().Be("saltMm");
        editedUser.role.Should().Be("chef");
    }
    
    [Test]
    public async Task ShouldSuccessfullyDeleteOrder()
    {
        var order = new Order()
        {
            orderDate = "24-12-2001",
            orderTime = "18:44",
            orderItisDone = false,
            orderItemArrayId = "bidnuggis"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders", order);
        createResponse.EnsureSuccessStatusCode();

        var createdOrder = JsonConvert.DeserializeObject<Order>(await createResponse.Content.ReadAsStringAsync());

        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/orders/{createdOrder.orderId}");
        deleteResponse.EnsureSuccessStatusCode();

        var deletedOrder = JsonConvert.DeserializeObject<Order>(await deleteResponse.Content.ReadAsStringAsync());

        deletedOrder.Should().BeNull();
    }
    
    [Test]
    public async Task ShouldSuccessfullyDeleteUser()
    {
        var user = new User()
        {
            username = "rardon gamsay",
            passwordHash = "hashLol",
            passwordSalt = "saltMm",
            role = "admin"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users", user);
        createResponse.EnsureSuccessStatusCode();

        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());

        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/users/{createdUser.userId}");
        deleteResponse.EnsureSuccessStatusCode();

        var deletedUser = JsonConvert.DeserializeObject<User>(await deleteResponse.Content.ReadAsStringAsync());

        deletedUser.Should().BeNull();
    }
    
    [Test]
    public async Task ShouldSuccessfullyReadOrder()
    {
        var order = new Order()
        {
            orderDate = "26-12-2001",
            orderTime = "19:44",
            orderItisDone = false,
            orderItemArrayId = "large boke"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/orders", order);
        createResponse.EnsureSuccessStatusCode();

        var createdOrder = JsonConvert.DeserializeObject<Order>(await createResponse.Content.ReadAsStringAsync());

        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/orders/{createdOrder.orderId}");
        readResponse.EnsureSuccessStatusCode();

        var readOrder = JsonConvert.DeserializeObject<Order>(await readResponse.Content.ReadAsStringAsync());

        readOrder.Should().NotBeNull();
        readOrder.orderDate.Should().Be("26-12-2001");
        readOrder.orderTime.Should().Be("19:44");
        readOrder.orderItIsDone.Should().Be(false);
        readOrder.orderItemArrayId.Should().Be("large boke");
    }
    
    [Test]
    public async Task ShouldSuccessfullyReadUser()
    {
        var user = new User()
        {
            username = "rardon gamsay",
            passwordHash = "hashLol",
            passwordSalt = "saltMm",
            role = "admin"
        };

        var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5000/api/users", user);
        createResponse.EnsureSuccessStatusCode();

        var createdUser = JsonConvert.DeserializeObject<User>(await createResponse.Content.ReadAsStringAsync());

        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/users/{createdUser.userId}");
        readResponse.EnsureSuccessStatusCode();

        var readOrder = JsonConvert.DeserializeObject<Order>(await readResponse.Content.ReadAsStringAsync());

        readOrder.Should().NotBeNull();
        editedOrder.username.Should().Be("rardon gamsay");
        editedOrder.passwordHash.Should().Be("hashLol");
        editedOrder.passwordSalt.Should().Be("saltMm");
        editedOrder.role.Should().Be("admin")
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
        var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5000/api/users/{nonExistentUserId}");

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
        var readResponse = await _httpClient.GetAsync($"http://localhost:5000/api/users/{nonExistentUserId}");

        readResponse.IsSuccessStatusCode.Should().BeFalse();
    }
    }
}