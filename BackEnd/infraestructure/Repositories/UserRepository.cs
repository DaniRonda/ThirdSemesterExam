using Dapper;
using infraestructure.DataModels;
using Npgsql;

namespace infraestructure.Repositories;

public class UserRepository

{  private NpgsqlDataSource _dataSource;

    public UserRepository(NpgsqlDataSource datasource)
    {
        _dataSource = datasource;
    }

    public IEnumerable<UserQuery> GetUser()
    {
        string sql = $@"
SELECT user_id as {nameof(UserQuery.UserId)},
       user_name as {nameof(UserQuery.Username)},
        password_hash as {nameof(UserQuery.PasswordHash)},
        password_salt as {nameof(UserQuery.PasswordSalt)},
        user_role as {nameof(UserQuery.Role)}
FROM public.users;
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<UserQuery>(sql);
        }
    }
    public User CreateUser(string username, string passwordHash, string passwordSalt, string role)
    {
        var sql = $@"
INSERT INTO public.Users (Username, PasswordHash, PasswordSalt, Role) 
VALUES (@user_name, @password_hash, @password_salt, @password_role)
RETURNING user_id as {nameof(UserQuery.UserId)},
       user_name as {nameof(UserQuery.Username)},
       password_hash as {nameof(UserQuery.PasswordHash)},
        password_salt as {nameof(UserQuery.PasswordSalt)},
        user_role as {nameof(UserQuery.Role)},
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new {username, passwordHash, passwordSalt, role });
        }
    }
    
    
    public bool DeleteUser(int userId)
    {
        var sql = @"DELETE FROM public.Users WHERE UserId = @user_id;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Execute(sql, new { userId }) == 1;
        }
    }
    
    public User UpdateUser(string username, int userId, string passwordHash, string passwordSalt, string role)
    {
        var sql = $@"
UPDATE public.Users SET Username = @user_name, PasswordHash = @password_hash, PasswordSalt= @password_salt, Role = @user_role
WHERE UserId = @UserId
RETURNING user_id as {nameof(UserQuery.UserId)},
       user_name as {nameof(UserQuery.Username)},
       password_hash as {nameof(UserQuery.PasswordHash)},
        password_salt as {nameof(UserQuery.PasswordSalt)},
        user_role as {nameof(UserQuery.Role)}
FROM public.users;";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { username, userId, passwordHash, passwordSalt, role});
        }
    }
    
    public async Task<UserQuery> GetUserByUsernameAsync(string username)
    {
        string sql = $@"
SELECT user_id as {nameof(UserQuery.UserId)},
       user_name as {nameof(UserQuery.Username)},
       password_hash as {nameof(UserQuery.PasswordHash)},
       password_salt as {nameof(UserQuery.PasswordSalt)},
       user_role as {nameof(UserQuery.Role)}
FROM public.users
WHERE user_name = @UserName;
";
        using (var conn = _dataSource.OpenConnection())
        {
            return await conn.QueryFirstOrDefaultAsync<UserQuery>(sql, new { Username = username });
        }
    }

    public User GetUserById(int userId)
    {
        string sql = $@"SELECT user_id as {nameof(User.UserId)},
       user_name as {nameof(User.Username)},
       user_role as {nameof(User.Role)},
       password_hash as {nameof(User.PasswordHash)},
       password_salt as {nameof(User.PasswordSalt)}
FROM public.users
WHERE user_id = @userId;
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { userId});
        }
    }
}
