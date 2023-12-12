

using infraestructure;
using infraestructure.DataModels;
using infraestructure.Repositories;
namespace service;

    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public IEnumerable<UserQuery> GetUsers()
        {
            return _userRepository.GetUser();
        }

        public User CreateUser(string username, string passwordHash, byte[] passwordSalt, string role)
        {
            return _userRepository.CreateUser(username, passwordHash, passwordSalt, role);
        }

        public bool DeleteUser(int userId)
        {
            return _userRepository.DeleteUser(userId);
        }

        public User UpdateUser(string username, int userId, byte[] passwordHash, byte[] passwordSalt, string role)
        {
            return _userRepository.UpdateUser(username, userId, passwordHash, passwordSalt, role);
        }

        public async Task<UserQuery> GetUserByUsernameAsync(string username)
        {
            return await _userRepository.GetUserByUsernameAsync(username);
        }
    }
