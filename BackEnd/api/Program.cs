using api;
using api.Middleware;
using infraestructure.Repositories;
using service;
using infraestructure;


var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.AddSqLiteDataSource();

// Add services to the container.
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddNpgsqlDataSource(Utilities.ProperlyFormattedConectionString, dataSourceBuilder => dataSourceBuilder.EnableParameterLogging());
}

if (builder.Environment.IsProduction())
{
    builder.Services.AddNpgsqlDataSource(Utilities.ProperlyFormattedConectionString);
}


builder.Services.AddSingleton<OrderRepository>();
builder.Services.AddSingleton<OrderService>();
builder.Services.AddSingleton<UserRepository>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<ItemRepository>();
builder.Services.AddSingleton<ItemService>();
builder.Services.AddSingleton<AuthenticationService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddJwtService();
builder.Services.AddSwaggerGenWithBearerJWT();
builder.Services.AddSwaggerGen();
builder.Services.AddSpaStaticFiles(conf => conf.RootPath = "../frontend/www/");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseCors(options =>
{
    options.SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
        
});

app.UseSecurityHeaders();

app.UseSpaStaticFiles();
app.UseSpa(conf =>
{
  conf.Options.SourcePath = "../frontend/www/";
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<JwtBearerHandler>();

app.Run();
