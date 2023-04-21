FROM mcr.microsoft.com/dotnet/aspnet:6.0
COPY ./bin/Release/net6.0/publish/linux-x64 /app/

# Run section
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:5443
EXPOSE 5443
ENTRYPOINT ["dotnet", "DockerW.dll"]