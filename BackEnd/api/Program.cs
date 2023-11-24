var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.addSpaStaticFiles(conf => conf.RootPAth = "../frontend/www/");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.useSpaStaticFiles();
app.useSpa(conf =>
{
  conf.Options.SourcePath = ".. / frontend / www / ";
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
