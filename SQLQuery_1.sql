SELECT *
FROM Vehicles;

SELECT *
FROM Manufacturers;

SELECT *
FROM Categories;

-- each manufacturer and number of cars
SELECT M.Name, COUNT(*)
FROM Vehicles AS V
INNER JOIN Manufacturers AS M
    ON V.ManufacturerId = M.ID
GROUP BY M.Name;

-- average number of cars in manufacturer
SELECT ROUND(AVG(CAST(Count AS FLOAT)), 2) as avg_cars_count_in_manufacturer
FROM (
SELECT M.Name, COUNT(*) as Count
FROM Vehicles AS V
INNER JOIN Manufacturers AS M
    ON V.ManufacturerId = M.ID
GROUP BY M.Name
) AS cars_per_manufacturer

-- CTE
WITH CTE_CARS_PER_MANUFACTURER AS
(
SELECT M.Name, COUNT(*) as Count
FROM Vehicles AS V
INNER JOIN Manufacturers AS M
    ON V.ManufacturerId = M.ID
GROUP BY M.Name
)
SELECT ROUND(AVG(CAST(Count AS FLOAT)), 2) as avg_cars_count_in_manufacturer
FROM CTE_CARS_PER_MANUFACTURER;

