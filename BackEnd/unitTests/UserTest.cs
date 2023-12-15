using infraestructure;
using infraestructure.DataModels;
using infraestructure.Repositories;
using Assert = Xunit.Assert;
namespace unitTests;

public class UserRepositoryTests
{
    [Fact]
    public void GetUser_ShouldReturnUsers()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var userRepository = new UserRepository(mockDataSource.Object);

        var expectedUsers = new List<UserQuery>
        {
            new UserQuery { UserId = 1, Username = "user1", PasswordHash = "test", PasswordSalt = "test", Role = "role1" },
            new UserQuery { UserId = 2, Username = "user2", PasswordHash ="test", PasswordSalt = "test", Role = "role2" }
        };

        mockConnection.Setup(c => c.QueryAsync<UserQuery>(It.IsAny<string>(), null, null, null, null))
            .ReturnsAsync(expectedUsers);

        // Act
        var actualUsers = userRepository.GetUser();

        // Assert
        Assert.Equal(expectedUsers, actualUsers);
    }

    [Fact]
    public void CreateUser_ShouldReturnCreatedUser()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var userRepository = new UserRepository(mockDataSource.Object);

        var expectedUser = new User
        {
            UserId = 1,
            Username = "user1",
            PasswordHash = "test1",
            PasswordSalt = "test",
            Role = "role1"
        };
        

        // Act
        var actualUser = userRepository.CreateUser("user1", "hash1", "test", "role1");

        // Assert
        Assert.Equal(expectedUser, actualUser);
    }

    [Fact]
    public async Task GetUserByUsernameAsync_ShouldReturnUser()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var userRepository = new UserRepository(mockDataSource.Object);

        var expectedUser = new UserQuery
        {
            UserId = 1,
            Username = "user1",
            PasswordHash = "test",
            PasswordSalt ="test",
            Role = "role1"
        };

        mockConnection.Setup(c => c.QueryFirstOrDefaultAsync<UserQuery>(It.IsAny<string>(), null, null, null, null))
            .ReturnsAsync(expectedUser);

        // Act
        var actualUser = await userRepository.GetUserByUsernameAsync("user1");

        // Assert
        Assert.Equal(expectedUser, actualUser);
    }

    [Fact]
    public void DeleteUser_ShouldReturnTrue()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var userRepository = new UserRepository(mockDataSource.Object);

        int userIdToDelete = 1;

        mockConnection.Setup(c => c.Execute(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
            .Returns(1); // Assuming one row is affected

        // Act
        var result = userRepository.DeleteUser(userIdToDelete);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void UpdateUser_ShouldReturnUpdatedUser()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var userRepository = new UserRepository(mockDataSource.Object);

        var expectedUser = new User
        {
            UserId = 1,
            Username = "updatedUser",
            PasswordHash = "test",
            PasswordSalt = "test",
            Role = "updatedRole"
        };
        
        // Act
        var actualUser = userRepository.UpdateUser("updatedUser", 1, "test", "test", "updatedRole");

        // Assert
        Assert.Equal(expectedUser, actualUser);
    }
}
