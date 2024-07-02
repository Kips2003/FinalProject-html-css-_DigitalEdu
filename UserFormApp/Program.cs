using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Text;

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

app.MapPost("/submit", async context =>
{
    var form = context.Request.Form;
    var fullname = form["fullname"];
    var phone = form["phone"];
    var email = form["email"];
    var password = form["password"];

    var filePath = "UserData.txt";
    var data = new StringBuilder();
    data.AppendLine($"Full Name: {fullname}");
    data.AppendLine($"Phone Number: {phone}");
    data.AppendLine($"Email: {email}");
    data.AppendLine($"Password: {password}");

    await File.WriteAllTextAsync(filePath, data.ToString());

    context.Response.Redirect("http://127.0.0.1:5500/index.html");
});

app.MapFallbackToFile("index.html");

app.Run();
