CREATE TABLE Clients (
    ClientID INT PRIMARY KEY IDENTITY(1,1),
    Nom NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    MotDePasse NVARCHAR(255) NOT NULL,
    AdresseLivraison NVARCHAR(MAX) NOT NULL,
    JWT NVARCHAR(500) 
);
GO

-- Table des commandes
CREATE TABLE Commandes (
    CommandeID INT PRIMARY KEY IDENTITY(1,1),
    ClientID INT,
    Produits NVARCHAR(MAX) NOT NULL,
    Quantite INT NOT NULL,
    PrixTotal DECIMAL(10, 2) NOT NULL,
    AdresseLivraison NVARCHAR(MAX) NOT NULL,
    Statut NVARCHAR(50) NOT NULL,
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID)
);
GO