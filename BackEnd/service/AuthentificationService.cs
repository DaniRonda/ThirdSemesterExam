using infraestructure.DataModels;
using System.Security.Cryptography;
using System.Text;
using infraestructure;

public class AuthenticationService
{
    private readonly UserRepository userRepository;

    public AuthenticationService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public async Task<bool> AuthenticateUserAsync(string username, string password)
    {
        var user = await userRepository.GetUserByUsernameAsync(username);

        if (user != null)
        {
            string hashedPassword = HashPassword(password, user.PasswordSalt);
            if (hashedPassword == Convert.ToBase64String(user.PasswordHash))
            {
                return true;
            }
        }
        
        return false;
    }

    public async Task RegisterUserAsync(string username, string password)
    {
        byte[] salt = GenerateSalt();
        string hashedPassword = HashPassword(password, salt);
        
        userRepository.CreateUser(username, hashedPassword, salt, "user");
    }

    private byte[] GenerateSalt()
    {
        using (var rng = RandomNumberGenerator.Create())
        {
            var salt = new byte[32];
            rng.GetBytes(salt);
            return salt;
        }
    }

    private string HashPassword(string password, byte[] salt)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] combined = Encoding.UTF8.GetBytes(password + Convert.ToBase64String(salt));
            byte[] hashedBytes = sha256.ComputeHash(combined);

            return Convert.ToBase64String(hashedBytes);
        }
    }
}