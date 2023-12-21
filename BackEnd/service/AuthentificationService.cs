using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using infraestructure.Repositories;

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

            
            if (hashedPassword == user.PasswordHash)
            {
                return true;
            }
        }

        return false;
    }

    public async Task RegisterUserAsync(string username, string password)
    {
        string salt = Convert.ToBase64String(GenerateSalt());
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

    public static string HashPassword(string password, string salt)
    {
        byte[] saltBytes = Convert.FromBase64String(salt);
        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
        byte[] combined = new byte[saltBytes.Length + passwordBytes.Length];

        Buffer.BlockCopy(saltBytes, 0, combined, 0, saltBytes.Length);
        Buffer.BlockCopy(passwordBytes, 0, combined, saltBytes.Length, passwordBytes.Length);

        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(combined);
            return Convert.ToBase64String(hashedBytes);
        }
    }
}
