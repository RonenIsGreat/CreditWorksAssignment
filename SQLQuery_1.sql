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

-------------------
SELECT *
FROM Vehicles v
JOIN Manufacturers m
    ON v.ManufacturerId = m.ID
WHERE m.Name = 'Toyota';

SELECT *
FROM Vehicles
WHERE WeightInGrams > 5000
ORDER BY Year;

WITH VehicleWithCategory AS (
    SELECT V.ID, MAX(C.MinCategoryWeightGrams) categoryMinWeight
    FROM Categories C
    JOIN Vehicles V
    ON C.MinCategoryWeightGrams <= V.WeightInGrams
    GROUP BY V.ID 
)
SELECT c.Name, MAX(v.WeightInGrams) MaxVehicle
FROM VehicleWithCategory vwc
JOIN Vehicles v
ON vwc.ID = v.ID
JOIN Categories c
ON c.MinCategoryWeightGrams = vwc.categoryMinWeight
GROUP BY c.ID, c.Name;

SELECT v.ID, v.WeightInGrams, c.Name
FROM Vehicles v
JOIN Categories c
  ON v.WeightInGrams >= c.MinCategoryWeightGrams
LEFT JOIN Categories c2
  ON v.WeightInGrams >= c2.MinCategoryWeightGrams
     AND c2.MinCategoryWeightGrams > c.MinCategoryWeightGrams
WHERE c2.ID IS NULL;
