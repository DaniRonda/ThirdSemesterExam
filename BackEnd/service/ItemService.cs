
using infraestructure.DataModels;
using infraestructure.Repositories;

namespace service;

    public class ItemService
    {
        private readonly ItemRepository _itemRepository;

        public ItemService(ItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public IEnumerable<Items> GetItems()
        {
            return _itemRepository.GetItems();
        }

        public Items CreateItem(string itemName, string itemUrlImg, double itemPrice, string itemOptions)
        {
            return _itemRepository.CreateItem(itemName, itemUrlImg, itemPrice, itemOptions);
        }

        public bool DeleteItem(int itemId)
        {
            return _itemRepository.DeleteItem(itemId);
        }

        public Items UpdateItem(int itemId, string itemName, string itemUrlImg, double itemPrice, string itemOptions)
        {
            return _itemRepository.UpdateItem(itemId, itemName, itemUrlImg, itemPrice, itemOptions);
        }

        public async Task<Items> GetItemByNameAsync(string itemName)
        {
            return await _itemRepository.GetItemByNameAsync(itemName);
        }
        
        public Items GetItemById(int itemId)
        {
            return _itemRepository.GetItemsById(itemId);
        }
    }