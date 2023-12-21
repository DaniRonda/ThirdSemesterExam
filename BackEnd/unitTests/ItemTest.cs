/*using infraestructure;
using infraestructure.DataModels;
using infraestructure.Repositories;
using Assert = Xunit.Assert;

public class ItemRepositoryTests
{
    [Fact]
    public void GetItems_ShouldReturnItems()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var itemRepository = new ItemRepository(mockDataSource.Object);

        var expectedItems = new List<Items>
        {
            new Items { ItemId = 1, ItemName = "Item1", ItemUrlImg = "img1.jpg", ItemPrice = 10.99, ItemOptions ="some option" },
            new Items { ItemId = 2, ItemName = "Item2", ItemUrlImg = "img2.jpg", ItemPrice = 15.99, ItemOptions = "more options" }
        };
        
        // Act
        var actualItems = itemRepository.GetItems();

        // Assert
        Assert.Equal(expectedItems, actualItems);
    }

    [Fact]
    public void CreateItem_ShouldReturnCreatedItem()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var itemRepository = new ItemRepository(mockDataSource.Object);

        var expectedItem = new Items
        {
            ItemId = 1,
            ItemName = "Item1",
            ItemUrlImg = "img1.jpg",
            ItemPrice = 10.99,
            ItemOptions = "even more options" };
        
        // Act
        var actualItem = itemRepository.CreateItem("Item1", "img1.jpg", 10.99, "even more options");

        // Assert
        Assert.Equal(expectedItem, actualItem);
    }

    [Fact]
    public void DeleteItem_ShouldReturnTrueIfDeleted()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var itemRepository = new ItemRepository(mockDataSource.Object);
        
        // Act
        var result = itemRepository.DeleteItem(1);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void UpdateItem_ShouldReturnUpdatedItem()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var itemRepository = new ItemRepository(mockDataSource.Object);

        var expectedItem = new Items
        {
            ItemId = 1,
            ItemName = "UpdatedItem",
            ItemUrlImg = "img_updated.jpg",
            ItemPrice = 19.99,
            ItemOptions = "option1, option 2"
        };

        // Act
        var actualItem = itemRepository.UpdateItem(1, "UpdatedItem", "img_updated.jpg", 19.99, "option1, option 2");

        // Assert
        Assert.Equal(expectedItem, actualItem);
    }

    [Fact]
    public async Task GetItemByNameAsync_ShouldReturnItem()
    {
        // Arrange
        var mockDataSource = new Mock<NpgsqlDataSource>();
        var mockConnection = new Mock<NpgsqlConnection>();
        mockDataSource.Setup(d => d.OpenConnection()).Returns(mockConnection.Object);

        var itemRepository = new ItemRepository(mockDataSource.Object);

        var expectedItem = new Items
        {
            ItemId = 1,
            ItemName = "Item1",
            ItemUrlImg = "img1.jpg",
            ItemPrice = 10.99,
            ItemOptions = "",
        };

        // Act
        var actualItem = await itemRepository.GetItemByNameAsync("Item1");

        // Assert
        Assert.Equal(expectedItem, actualItem);
    }
}*/
