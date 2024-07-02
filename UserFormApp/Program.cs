using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Use CORS
app.UseCors();

var users = new List<User>();

app.MapPost("/register", async context =>
{
    var form = context.Request.Form;
    var fullname = form["fullname"];
    var phone = form["phone"];
    var email = form["email"];
    var password = form["password"];

    users.Add(new User { FullName = fullname, Phone = phone, Email = email, Password = password });

    var data = JsonSerializer.Serialize(users);
    await File.WriteAllTextAsync("UserData.txt", data);

    context.Response.ContentType = "application/json";
    context.Response.Redirect("http://127.0.0.1:5500/index.html");
});

app.MapPost("/login", async context =>
{
    var form = context.Request.Form;
    var email = form["email"];
    var password = form["password"];

    var user = users.FirstOrDefault(u => u.Email == email && u.Password == password);

    if (user != null)
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new { message = "Login successful!" });
    }
    else
    {
        context.Response.StatusCode = 401; // Unauthorized
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new { message = "Invalid email or password" });
    }
});

app.MapFallbackToFile("index.html");

app.Run();

public class User
{
    public string FullName { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
