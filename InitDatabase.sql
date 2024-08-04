Create Database CreditWorks_RonenRossin
Go

Use CreditWorks_RonenRossin
Go

Create table Manufacturers (
	ID int primary key identity,
	Name nvarchar(128)
)
Go

Insert into Manufacturers values ('Mazda')
Insert into Manufacturers values ('Mercedes')
Insert into Manufacturers values ('Honda')
Insert into Manufacturers values ('Ferrari')
Insert into Manufacturers values ('Toyota')
Go

Create table Categories (
	ID int primary key identity,
	Name nvarchar(128),
	MinCategoryWeightGrams int,
	Icon nvarchar(128)
)
Go

Insert into Categories values ('Light', 0, 'Light')
Insert into Categories values ('Medium', 500000, 'Medium')
Insert into Categories values ('Heavy', 2500000, 'Heavy')
Go

Create table Vehicles (
	ID int primary key identity,
	OwnerName nvarchar(128),
	ManufacturerId int FOREIGN KEY REFERENCES Manufacturers(ID),
	Year int,
	WeightInGrams int
)
Go